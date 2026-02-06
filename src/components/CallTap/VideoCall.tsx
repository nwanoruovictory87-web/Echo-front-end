import VideoCallTopBar from "./VideoCallTopBar";
import VideoCallEndBar from "./VideoCallEndBar";
import testImage from "../../assets/test/test.jpg";
import VideoCallMe from "./VideoCallMe";
function VideoCall() {
  return (
    <div>
      <img src={testImage} className="w-full h-screen"></img>
      <div className="absolute w-full top-0">
        <VideoCallTopBar />
      </div>
      <div className="absolute bottom-0 right-0 mr-7 mb-36">
        <VideoCallMe />
      </div>
      <div className="fixed w-full bottom-0 mb-8 p-2">
        <VideoCallEndBar />
      </div>
    </div>
  );
}
export default VideoCall;
