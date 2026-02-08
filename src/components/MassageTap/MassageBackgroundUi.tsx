import MassageVideoChat from "./MassageVideoChat";
import MassageBackButton from "./MassageBackButton";
import MassageText from "./MassageText";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import { Emoji } from "emoji-mart";

//*=============== echo types
type EchoNumber = {
  number?: string;
};

type ChatData = {
  type: string;
  from?: string;
  massage: string;
  url?: string;
  date: string;
  time: string;
};
/*
type EchoFriend = {
  _id?: string;
  __v?: number;
  friendNumber?: string;
  friendName?: string;
  friendMassages?: string[];
};
*/
//*=============== connect socket once on render
const socket = io("http://localhost:5000");

//*=============== get user number
const ECHO_Number = "Echo_Number";
const userValue: EchoNumber = JSON.parse(localStorage.getItem(ECHO_Number));
//*=============== get friend data
const ECHO_Friend = "Friend_Chat";
const friendValue = JSON.parse(localStorage.getItem(ECHO_Friend));
const Echo_FriendsList = "Echo_FriendsList";
const storedFriendList = JSON.parse(localStorage.getItem(Echo_FriendsList));
function MassageBackgroundUi() {
  const [chat, setChat] = useState<object[]>([]);
  const [input, setInput] = useState<string>("");
  const [fileInput, setFileInput] = useState("");
  const [fileView, setFileView] = useState();
  //*=============== connnect to users room
  useEffect(() => {
    const userNumber = userValue.number;
    socket.emit("join-room", userNumber);
  }, []);
  //*=============== get chat history on render once
  useEffect(() => {
    for (let i = 0; i < storedFriendList.length; i++) {
      const massageNumber = friendValue.friendNumber;
      if (massageNumber === storedFriendList[i].friendNumber) {
        const oldMassage = storedFriendList[i].friendMassages;
        (() => {
          setChat(oldMassage);
        })();
      }
    }
  }, []);
  //*=============== scroll to the bottom of chat
  useEffect(() => {
    setTimeout(() => {
      const chatEndScroll = document.querySelector(".chat-end");
      chatEndScroll?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 800);
  }, []);

  function updateLocalChatStorage() {}
  //*=============== get new text masssage
  socket.on("recive-massage", (data) => {
    const from = data.from;
    if (from !== friendValue.friendNumber) return;
    const storedChat: object[] = [...chat, data];
    //*================= update chat
    setChat((c) => (c = storedChat));
    updateLocalChatStorage();
    //*=============== move new massage to top after 300ms
    setTimeout(() => {
      const chatEndScroll = document.querySelector(".chat-end");
      chatEndScroll?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
  });
  //*================= update input onchange
  function storeInput(e): void {
    setInput(e.target.value);
  }
  //*=============== store file input
  function storeFileInput(e) {
    const data = e.target.files[0];
    const cheackType = data.type;
    if (cheackType.split("/")[0] !== "image") return;
    //setFileInput(data);
    //console.log(e.target.files[0]);
    viewFilew(data);
  }
  //*=============== view file & read file
  function viewFilew(e: string) {
    const file = e;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const readerResult = reader.result;
      setFileView(readerResult);
    };
  }
  function focusFileOnClick() {
    const fileElement = document.querySelector(".file-in");
    if (fileElement) return fileElement.click();
  }
  //*================= send text massage funtion
  function sendMassage(): void {
    if (!fileView) {
      if (input.trim() === "") return;
    }
    if (!fileView) {
      if (input.trim() !== "") {
        sendFormatedMassage("text");
      }
    }
    if (fileView) {
      if (input.trim() === "") {
        sendFormatedMassage("image");
      }
    }
    if (fileView) {
      if (input.trim() !== "") {
        sendFormatedMassage("mixed");
      }
    }
  }
  function sendFormatedMassage(massageType: string) {
    const type = massageType;
    //*================= format text massage to user send
    const room = friendValue.friendNumber;
    const date = new Date();
    const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
    const month =
      date.getMonth() + 1 > 10
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    const minite =
      date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
    const amOrPm = Number(hour) < 12 ? "AM" : "PM";
    const data: ChatData = {
      type: type,
      from: userValue.number,
      massage: input,
      url: fileView,
      date: `${day}/${month}/${year}`,
      time: `${hour}:${minite}${amOrPm}`,
    };
    console.log(data);
    setInput("");
    //*=============== update chat
    //*=============== send text massage
    socket.emit("send-massage", data, room);
    const storedChat: object[] = chat.length !== 0 ? [...chat, data] : [data];
    setChat(storedChat);
    //*=============== move new massage to top after 300ms
    setTimeout(() => {
      const chatEndScroll = document.querySelector(".chat-end");
      chatEndScroll?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
    setFileView(undefined);
  }
  return (
    <>
      <div>
        <div className="relative">
          <div className="w-full h-[40.2px] bg-[#f9f9f9] fixed z-10 top-0"></div>
          <span className="block fixed w-screen h-[105.5px] bg-[#2563eb] mt-[40px] z-10"></span>
          <div className="w-[140px] h-[100px] bg-[#f9f9f9] rounded-bl-[85px] fixed z-10 mt-9 right-0">
            <span className="block w-[140px] h-[80px] rounded-bl-[40px] bg-[#f9f9f9]">
              <MassageVideoChat />
            </span>
            <span className="block w-[140px] h-[30px] rounded-tr-[80px] bg-[#2563eb]"></span>
          </div>
          <span className="block fixed w-full h-[30px] bg-[#f9f9f9] right-0 mt-9"></span>
          <span className="block fixed w-[50%] h-[27px] rounded-tl-[60px] rounded-tr-[80px] bg-[#2563eb] right-0 mr-[140.5px] mt-[20px] z-10"></span>
          <span className="block fixed w-[50%] h-[27px] rounded-tl-[60px] rounded-tr-[80px] bg-[#2563eb] left-0 mr-[10px] mt-[20px] z-10"></span>
          <span className="fixed z-10 ">
            <MassageBackButton body={friendValue} />
          </span>
        </div>
        <div className="bg-[#2563eb] absolute w-full min-h-screen max-h-fit rounded-tl-[40px]">
          <div className="mt-40 ml-7 mr-7 w-[87%] h-fit pb-28">
            <MassageText body={chat} />
            <div className="chat-end pb-72 absolute bg-green-600"></div>
          </div>
          <div className="fixed bottom-0 bg-[#2563eb] pt-2 pb-8 w-[98%] pr-12 ">
            <div className="w-full ml-7 mr-7 flex">
              <span className="flex w-full h-14 pl-4 pr-4 pt-1 pb-1  rounded-full bg-[#f9f9f9] items-center">
                <i className="fas fa-microphone text-gray-400 mr-2 text-2xl"></i>
                <i className="fas fa-smile text-gray-400 mr-2 text-2xl"></i>
                <span></span>
                <input
                  className="w-full h-12 pl-2 text-black border-l-2 border-gray-400 massage-in-test"
                  placeholder="Whats on your mind?"
                  value={input}
                  onChange={storeInput}
                ></input>
                <i
                  className="fa-solid fa-paperclip text-gray-400 ml-2 text-2xl"
                  onClick={focusFileOnClick}
                ></i>
                <input
                  className="absolute file-in"
                  type="file"
                  value={fileInput}
                  onChange={storeFileInput}
                ></input>
              </span>
              <span className="ml-3 bg-[#f9f9f9] rounded-full pl-3 pb-3 pr-4">
                <i
                  className="fa-solid fa-paper-plane mt-4  text-[25px] text-[#2563eb]"
                  onClick={sendMassage}
                ></i>
              </span>
              {fileView && (
                <span className="absolute right-28 w-48 h-38 bottom-[88px] rounded-xl">
                  <img src={fileView} className="w-48 h-38 rounded-xl"></img>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MassageBackgroundUi;
