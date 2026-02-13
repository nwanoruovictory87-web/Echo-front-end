import ChatFriends from "./ChatFriends";
//import ChatContactDiplay from "./ChatContactDisplay";
import { useState, useEffect } from "react";
function NavigationBar() {
  useEffect(() => {
    async function findFriends() {
      const ECHO_Number = "Echo_Number";
      const userData = JSON.parse(localStorage.getItem(ECHO_Number));
      const authorization = userData.authorization;
      const userNumber = userData.number;
      const data = {
        userNumber: userNumber,
        authorization: authorization,
      };
      try {
        const serverUrl = "http://localhost:5000/user/g/u/friends";
        const findFriendsList = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responods = await findFriendsList.json();
        if (responods.status !== 200) return;
        const friendsData = responods.friends;
        const Echo_FriendsList = "Echo_FriendsList";
        localStorage.setItem(Echo_FriendsList, JSON.stringify(friendsData));
      } catch (error) {
        console.log(error);
      }
    }
    findFriends();
  }, []);

  function chat() {
    //*=============== navigation bar ui dom refrence
    const chatBox = document.querySelector(".chat-box");
    const chatText = document.querySelector(".chat-text");
    const groupsBox = document.querySelector(".groups-box");
    const groupsText = document.querySelector(".groups-text");
    const contactBox = document.querySelector(".contact-box");
    const contactText = document.querySelector(".contact-text");
    //*=============== update navigation bar ui
    groupsBox.style.backgroundColor = "transparent";
    groupsText.style.color = "black";
    contactBox.style.backgroundColor = "transparent";
    contactText.style.color = "black";
    //*=============== main ui change
    chatBox.style.backgroundColor = "#2563eb";
    chatText.style.color = "white";
  }
  function groups() {
    //*=============== navigation bar ui dom refrence
    const chatBox = document.querySelector(".chat-box");
    const chatText = document.querySelector(".chat-text");
    const groupsBox = document.querySelector(".groups-box");
    const groupsText = document.querySelector(".groups-text");
    const contactBox = document.querySelector(".contact-box");
    const contactText = document.querySelector(".contact-text");
    //*=============== update navigation bar ui
    chatBox.style.backgroundColor = "transparent";
    chatText.style.color = "black";
    contactBox.style.backgroundColor = "transparent";
    contactText.style.color = "black";
    //*=============== main ui change
    groupsBox.style.backgroundColor = "#2563eb";
    groupsText.style.color = "white";
  }
  function contacts() {
    //*=============== navigation bar ui dom refrence
    const chatBox = document.querySelector(".chat-box");
    const chatText = document.querySelector(".chat-text");
    const groupsBox = document.querySelector(".groups-box");
    const groupsText = document.querySelector(".groups-text");
    const contactBox = document.querySelector(".contact-box");
    const contactText = document.querySelector(".contact-text");
    //*=============== update navigation bar ui
    chatBox.style.backgroundColor = "transparent";
    chatText.style.color = "black";
    groupsBox.style.backgroundColor = "transparent";
    groupsText.style.color = "black";
    //*=============== main ui change
    contactBox.style.backgroundColor = "#2563eb";
    contactText.style.color = "white";
  }
  return (
    <>
      <div className="mt-6 mb-6">
        <div className="ml-5 flex bg-gray-200 mr-5 rounded-full">
          <span
            className="chat-box w-[40%] bg-[#2563eb] rounded-full text-center pl-2 pr-2 pt-1.5 pb-1.5"
            onClick={chat}
          >
            <h5 className="chat-text m-0 text-[16px] text-white font-[Inter] text-center">
              All Chats
            </h5>
          </span>
          <span
            className="groups-box w-[40%] rounded-full text-center pl-2 pr-2 pt-1.5 pb-1.5"
            onClick={groups}
          >
            <h5 className="groups-text m-0 text-[16px] text-black font-[Inter] text-center">
              Groups
            </h5>
          </span>
          <span
            className="contact-box w-[40%] rounded-full text-center pl-2 pr-2 pt-1.5 pb-1.5"
            onClick={contacts}
          >
            <h5 className="contact-text m-0 text-[16px] text-black font-[Inter] text-center">
              Contacts
            </h5>
          </span>
        </div>
      </div>
      <ChatFriends />
    </>
  );
}
export default NavigationBar;
