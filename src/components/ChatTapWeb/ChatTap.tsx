import TopBar from "./TopBar";
import NavigationBar from "./NavigationBar";
import ChatAdd from "./ChatAdd";
import MassageTapWeb from "../MassageTapWeb/MassageTap";
import ChatAddContact from "./ChatAddContact";

function ChatTap() {
  return (
    <div className="flex massage-web-body min-w-[1000px]">
      <div className="w-[30%] min-w-[300px]">
        <div className="fixed z-10 w-[30%] min-w-[300px]">
          <TopBar />
          <NavigationBar />
          <div className="fixed z-10  bottom-0 ml-[25%]">
            <ChatAdd />
          </div>
        </div>
      </div>
      <div className="w-[40%]   min-w-[340px] ">
        <MassageTapWeb />
      </div>
      <div className="w-[30%] min-w-[300px]">
        <div className="fixed w-[30%] min-w-[300px] z-10">
          <ChatAddContact />
        </div>
      </div>
    </div>
  );
}
export default ChatTap;
