import testImage from "../../assets/test2/test.jpg";
function VideoCallMe() {
  return (
    <div>
      <img
        src={testImage}
        className="w-40 h-60 border-2 rounded-3xl border-blue-700"
      ></img>
    </div>
  );
}
export default VideoCallMe;
