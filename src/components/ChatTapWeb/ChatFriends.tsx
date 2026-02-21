import ChatMessage from "./ChatMessage";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

//*=============== type firendlist
type FriendListOfArrayObject = [
  {
    _id?: string;
    __v?: number;
    friendNumber?: string;
    friendName?: string;
    friendMassages?: string[];
  },
];
type EchoNumber = {
  number?: string;
};
type EchoFriend = {
  _id?: string;
  __v?: number;
  friendNumber?: string;
  friendName?: string;
  friendMassages?: string[];
};
//*=============== connnect io to server
//! remove io server host url to real host
const socket = io("http://localhost:5000");
//*=============== Echo user number
const ECHO_Number = "Echo_Number";
const userValue: EchoNumber = JSON.parse(localStorage.getItem(ECHO_Number));
const userNumber = userValue ? userValue.number : null;

//
function ChatFriends(props) {
  //*=============== get friends list
  const [friendList, setFriendList] = useState<FriendListOfArrayObject>([]);
  const [numberInUse, setNumberInUse] = useState("");
  const [friendDiv, setFriendDiv] = useState();
  //*=============== load to massage box
  function massage(e: EchoFriend): void {
    props.body.ref.current = e;
    props.body.setData();
    setNumberInUse(e.friendNumber);
  }
  //*=============== func to store freind list
  function updateFriendList(e: FriendListOfArrayObject): void {
    setFriendList(e);
  }
  useEffect(() => {
    const Echo_FriendsList = "Echo_FriendsList";
    const stordFriendList: FriendListOfArrayObject = JSON.parse(
      localStorage.getItem(Echo_FriendsList),
    );
    if (stordFriendList) {
      (() => {
        //*=============== call a function to store friends list
        updateFriendList(stordFriendList);
        massage(stordFriendList[0]);
      })();
    }
  }, []);
  //
  useEffect(() => {
    socket.emit("join-room", userNumber);
  }, []);
  //*=============== get new massage by non saved contact || get new friends massage
  //*=============== reacive new massages
  socket.on("recive-massage", (massage) => {
    const senderNumber = massage.from;
    const massageData = massage;
    for (let i = 0; i < friendList.length; i++) {
      const friendsNumber = friendList[i]?.friendNumber;
      if (friendsNumber === senderNumber) return;
      if (i + 1 === friendList.length) {
        const Echo_FriendsList = "Echo_FriendsList";
        const storedFriendList = JSON.parse(
          localStorage.getItem(Echo_FriendsList),
        );
        //*=============== send new contact massage
        const friendData: EchoFriend = {
          friendMassages: [massageData],
          friendName: senderNumber,
          friendNumber: senderNumber,
        };
        const newFriendList = storedFriendList
          ? [...storedFriendList, friendData]
          : [friendData];
        updateFriendList(newFriendList);
      }
    }
  });

  function upDateOnNewFriends() {
    const friendDivs =
      friendList &&
      friendList.map((e, i) => {
        return (
          <div
            className="w-[90%] mr-5 ml-5 mt-2 mb-2 flex h-16"
            onClick={() => massage(e)}
            key={i}
          >
            <span className="inline-block w-14 h-14 rounded-full bg-gray-300"></span>
            <ChatMessage body={e} number={numberInUse} />
          </div>
        );
      });
    setFriendDiv((prev) => (prev = friendDivs));
  }
  useEffect(() => {
    upDateOnNewFriends();
  }, [friendList]);
  return <div>{friendDiv && friendDiv}</div>;
}
export default ChatFriends;
