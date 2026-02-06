import Image from "../../assets/background.jpg";
function Welcome() {
  function singUp() {
    const url = "/sign/up";
    window.location.assign(url);
  }
  return (
    <div className="bg-[#2563eb] h-screen w-screen sm:min-[450px]:bg-purple-500 sm:min-[450px]:flex">
      <img
        src={Image}
        className="w-full h-[410px] image-background sm:min-[450px]:h-full sm:min-[450px]:w-[60%] "
        alt="image"
      ></img>
      <div className="sm:min-[450px]:w-[40%] sm:min-[450px]:flex sm:min-[450px]:justify-center">
        <div className="flex flex-col gap-10 bg-[#2563eb] sm:min-[450px]:w-[400px]">
          <span className="ml-5 mr-5 mt-10 block ">
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
              className="get-started w-full h-16 bg-white rounded-full  text-[20px] font-bold text-gray-700"
              onClick={singUp}
            >
              Get Started
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Welcome;
