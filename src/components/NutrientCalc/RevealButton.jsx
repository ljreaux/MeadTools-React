import { MdExpandCircleDown } from "react-icons/md";
function RevealButton({ setDisplayResults, displayResults, span }) {
  return (
    <button
      onClick={() => setDisplayResults(!displayResults)}
      className={`btn text-2xl text-sidebar hover:text-textColor col-${span} group w-1/4 flex flex-col  items-center transition-colors my-8`}
    >
      {" "}
      <MdExpandCircleDown className="group-hover:scale-125 " />
    </button>
  );
}
export default RevealButton;
