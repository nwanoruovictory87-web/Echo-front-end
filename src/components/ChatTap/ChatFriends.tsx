import ChatMessage from "./ChatMessage";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { userAppContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";

//*=============== type firendlist
type EchoNumber = {
  number?: string;
};
type EchoFriend = {
  _id?: string;
  __v?: number;
  friendNumber?: string;
  friendName?: string;
  friendMassages?: object[];
};
type Massage = {
  date: string;
  from: string;
  massage: string;
  time: string;
  type: string;
  url?: string | undefined;
};
type FriendListOfArrayObject = [
  {
    _id?: string;
    __v?: number;
    friendNumber?: string;
    friendName?: string;
    friendMassages?: object[];
  },
];
type UserloginData = {
  number: string;
  authorization: string;
  userName: string;
  userImage: string;
};
type UserData = {
  userLoginData: UserloginData;
  userMassageNotificationTon: string;
  userCallRingintone: string;
};
type UserDetails = {
  friendChat: object[] | undefined;
  setFriendChat: void;
  setUserData: void;
  setUserFriendList: void;
  userData: UserData;
  userFriendList: FriendListOfArrayObject;
};
//*=============== connnect io to server
//! remove io server host url to real host
const socket = io("http://localhost:5000");
//*=============== Echo user number
const ECHO_Number = "Echo_Number";
const userValue: EchoNumber = JSON.parse(localStorage.getItem(ECHO_Number));
const userNumber = userValue ? userValue.number : null;

//
function ChatFriends() {
  const userDetails: UserDetails | null = userAppContext();
  const { userData, userFriendList, setFriendChat } = userDetails;
  console.log(userData);
  //*=============== get friends list
  const [friendList, setFriendList] =
    useState<FriendListOfArrayObject[]>(userFriendList);
  const userNumber = userData ? userData.userLoginData.number : null;
  const urlNavigator = useNavigate();
  //*=============== load to massage box
  function massage(e: EchoFriend): void {
    setFriendChat(e);
    const url = "/massage";
    urlNavigator(url, { replace: true });
  }
  //*=============== func to store freind list
  useEffect(() => {
    if (userFriendList) {
      (() => {
        //*=============== call a function to store friends list
        setFriendList(userFriendList);
      })();
    }
  }, [userFriendList]);
  //
  useEffect(() => {
    socket.emit("join-room", userNumber);
  }, []);
  //*=============== get new massage by non saved contact || get new friends massage
  //*=============== reacive new massages
  useEffect(() => {
    const reciveMassage = (massage: Massage) => {
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
    };
    socket.on("recive-massage", reciveMassage);
    return () => {
      socket.off("recive-massage", reciveMassage);
    };
  }, []);

  return (
    <div>
      {friendList &&
        friendList.map((e, i) => {
          return (
            <div
              className="w-[90%] mr-5 ml-5 mt-2 mb-2 flex h-16"
              onClick={() => massage(e)}
              key={i}
            >
              <span className="inline-block w-14 h-14 rounded-full bg-gray-300"></span>
              <ChatMessage body={e} />
            </div>
          );
        })}
    </div>
  );
}
export default ChatFriends;
