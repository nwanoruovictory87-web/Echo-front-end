import { useEffect } from "react";
import "./fonts/css/all.css";
import ChatTap from "./components/ChatTap/ChatTap";
import ChatAddContact from "./components/ChatTap/ChatAddContact";
import MassageTap from "./components/MassageTap/MassageTap";
import Welcome from "./components/SignIn_SignUp/Welcome";
import SignUp from "./components/SignIn_SignUp/SingUp";
import Login from "./components/SignIn_SignUp/Login";
import VideoCall from "./components/CallTap/VideoCall";
import AudioCall from "./components/CallTap/AudioCall";
import SingUpNumber from "./components/SignIn_SignUp/SingUpNumber";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  useEffect(() => {
    const head = document.querySelector("head");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./fonts/css/all.css";
    link.type = "text/css";
    head?.appendChild(link);
  }, []);
  //
  const router = createBrowserRouter([
    { path: "/", element: <Welcome /> },
    { path: "/login", element: <Login /> },
    { path: "/sign/up", element: <SignUp /> },
    { path: "/sign/up/number", element: <SingUpNumber /> },
    { path: "/chat", element: <ChatTap /> },
    { path: "/chat/add/contact", element: <ChatAddContact /> },
    { path: "/massage", element: <MassageTap /> },
    { path: "/video/call", element: <VideoCall /> },
    { path: "/audio/call", element: <AudioCall /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
