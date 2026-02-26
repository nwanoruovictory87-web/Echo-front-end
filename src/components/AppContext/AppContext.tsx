import { createContext, useState, useContext } from "react";
//*=============== object type
type FriendListOfArrayObject = {
  _id?: string;
  __v?: number;
  friendNumber?: string;
  friendName?: string;
  friendMassages?: object[];
};
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
const UserDataContext = createContext(null);
//
export const UserDataProvider = ({ children }) => {
  const [userFriendList, setUserFriendList] = useState<
    FriendListOfArrayObject[]
  >([]);
  const [friendChat, setFriendChat] = useState();
  const [userData, setUserData] = useState<UserData>();
  //
  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        userFriendList,
        setUserFriendList,
        friendChat,
        setFriendChat,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
export const userAppContext = () => useContext(UserDataContext);
