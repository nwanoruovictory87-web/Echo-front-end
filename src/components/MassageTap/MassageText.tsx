//*=============== echo types
type EchoNumber = {
  number?: string | null;
};
type ChatType = [ChatData];
type ChatData = {
  date: string;
  from: string;
  massage: string;
  time: string;
  type: string;
  url?: string | undefined;
};

//*=============== get user number
const ECHO_Number = "Echo_Number";
const userValue: EchoNumber = JSON.parse(localStorage.getItem(ECHO_Number));
const userNumber = userValue ? userValue.number : null;

function MassageText(props: { body: ChatType }) {
  const chat: ChatType = props.body;
  return (
    <div className="flex flex-col gap-[10px]">
      {chat &&
        chat.map((e: ChatData, i: number) => {
          const image = e.url;
          if (e.from !== userNumber && e.type === "text") {
            return (
              <span
                className="block w-fit max-w-[300px] h-fit bg-[#f1f1f1] p-[12px] pl-[15px] pr-[15px] rounded-bl-[30px] rounded-e-3xl overflow-hidden text-box-right"
                key={i}
              >
                <h5 className="text-[#242222c5] text-xl font-[Inter] break-words">
                  {e.massage}
                </h5>
                <h5 className="text-[#242222c5] text-sm font-[Inter] pt-2 mb-[-5px]">
                  {e.time}
                </h5>
              </span>
            );
          } else if (e.type === "image") {
            if (e.from === userNumber) {
              return (
                <span
                  className="ml-auto block w-fit h-38 max-w-[300px] max-h-38 overflow-hidden text-image rounded-xl p-0.5 bg-blue-500"
                  key={i}
                >
                  <img
                    src={image}
                    className="w-[300px] h-38 rounded-xl"
                    alt="image"
                  ></img>
                  <h5 className="text-[#f9f9f9] text-sm font-[Inter] pt-1.5 pl-1.5">
                    {e.time}
                  </h5>
                </span>
              );
            } else if (e.from !== userNumber) {
              return (
                <span
                  className="block w-fit h-38 max-w-[300px] max-h-38 overflow-hidden text-image rounded-xl p-0.5 bg-[#f1f1f1]"
                  key={i}
                >
                  <img
                    src={image}
                    className="w-[300px] h-38 rounded-xl"
                    alt="image"
                  ></img>
                  <h5 className="text-[#242222c5] text-sm font-[Inter] pt-1.5 pl-1.5">
                    {e.time}
                  </h5>
                </span>
              );
            }
          } else if (e.type === "mixed") {
            if (e.from === userNumber) {
              return (
                <>
                  <span
                    className="ml-auto block w-fit h-38 max-w-[300px] max-h-38 overflow-hidden text-image rounded-xl p-0.5 bg-blue-500"
                    key={i}
                  >
                    <img
                      src={image}
                      className="w-[300px] h-38 rounded-xl"
                      alt="image"
                    ></img>
                    <h5 className="text-[#f9f9f9] text-sm font-[Inter] pt-1.5 pl-1.5">
                      {e.time}
                    </h5>
                  </span>
                  <span
                    className="ml-auto block w-fit max-w-[300px] h-fit bg-blue-500 p-[12px] pl-[15px] pr-[15px] rounded-br-[30px] rounded-s-3xl overflow-hidden text-box-left"
                    key={i + 0.5}
                  >
                    <h5 className="text-[#f9f9f9] text-xl font-[Inter] break-words">
                      {e.massage}
                    </h5>
                    <h5 className="text-[#f9f9f9] text-sm font-[Inter] pt-2 mb-[-5px]">
                      {e.time}
                    </h5>
                  </span>
                </>
              );
            } else {
              return (
                <>
                  <span
                    className="block w-fit h-38 max-w-[300px] max-h-38 overflow-hidden text-image rounded-xl p-0.5 bg-[#f1f1f1]"
                    key={i}
                  >
                    <img
                      src={image}
                      className="w-[300px] h-38 rounded-xl"
                      alt="image"
                    ></img>
                    <h5 className="text-[#242222c5] text-sm font-[Inter] pt-1.5 pl-1.5">
                      {e.time}
                    </h5>
                  </span>
                  <span
                    className="block w-fit max-w-[300px] h-fit bg-[#f1f1f1] p-[12px] pl-[15px] pr-[15px] rounded-bl-[30px] rounded-e-3xl overflow-hidden text-box-right"
                    key={i + 0.5}
                  >
                    <h5 className="text-[#242222c5] text-xl font-[Inter] break-words">
                      {e.massage}
                    </h5>
                    <h5 className="text-[#242222c5] text-sm font-[Inter] pt-2 mb-[-5px]">
                      {e.time}
                    </h5>
                  </span>
                </>
              );
            }
          } else if (e.from === userNumber) {
            if (e.type === "text") {
              return (
                <span
                  className="ml-auto block w-fit max-w-[300px] h-fit bg-blue-500 p-[12px] pl-[15px] pr-[15px] rounded-br-[30px] rounded-s-3xl overflow-hidden text-box-left"
                  key={i}
                >
                  <h5 className="text-[#f9f9f9] text-xl font-[Inter] break-words">
                    {e.massage}
                  </h5>
                  <h5 className="text-[#f9f9f9] text-sm font-[Inter] pt-2 mb-[-5px]">
                    {e.time}
                  </h5>
                </span>
              );
            }
          }
        })}
    </div>
  );
}
export default MassageText;
