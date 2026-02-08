import Image from "../../assets/background.jpg";
import SignUp from "./SingupWeb";
import { useRef } from "react";
//*==============
function Welcome() {
  const mobileView = useRef(null);
  const webSingup = useRef(null);
  const webLogin = useRef(null);
  const mobileBackgroundView = useRef(null);
  function singUpMoblie() {
    const url = "/sign/up";
    window.location.assign(url);
  }
  function singUpWeb() {
    mobileBackgroundView
      ? (mobileBackgroundView.current.style.backgroundColor = "#f9f9f9")
      : null;
    mobileView ? (mobileView.current.style.display = "none") : null;
    webSingup ? (webSingup.current.style.display = "block") : null;

    return;
  }
  return (
    <div className="bg-[#2563eb] h-screen w-screen  sm:min-[450px]:flex">
      <img
        src={Image}
        className="w-full h-[410px] image-background sm:min-[450px]:h-full sm:min-[450px]:w-[55%] "
        alt="image"
      ></img>
      <div
        className="sm:min-[450px]:w-[45%] bg-[#2563eb] sm:min-[450px]:flex sm:min-[450px]:justify-center"
        ref={mobileBackgroundView}
      >
        <div className="welcome-content-box sm:min-[450px]:w-[400px] sm:min-[450px]:mt-[10%] sm:min-[450px]:mb-[10%] sm:min-[450px]:rounded-xl">
          <div className="moblie-view flex flex-col gap-10 " ref={mobileView}>
            <span className="ml-5 mr-5 mt-10 block">
              <h2 className="text-5xl font-bold text-white">
                Stay connected with your friends and family
              </h2>
            </span>
            <span className="flex ml-5 mr-5">
              <i className="fa fa-shield text-green-500 text-4xl"></i>
              <h5 className="text-white text-[20px] font-bold">
                Fast and Secure Conversion
              </h5>
            </span>
            <span className="block ml-5 mr-5 pb-7">
              <button
                className="get-started w-full h-16 bg-white rounded-full  text-[20px] font-bold text-gray-700 sm:min-[450px]:hidden "
                onClick={singUpMoblie}
              >
                Get Started
              </button>
              <button
                className="hidden get-started w-full h-16 bg-white rounded-full  text-[20px] font-bold text-gray-700 sm:min-[450px]:block"
                onClick={singUpWeb}
              >
                Get Started
              </button>
            </span>
          </div>
          <div
            className="register-view hidden max-[450px]:hidden"
            ref={webSingup}
          >
            <SignUp />
          </div>
          <div className="login-view hidden" ref={webLogin}></div>
        </div>
      </div>
    </div>
  );
}
export default Welcome;
