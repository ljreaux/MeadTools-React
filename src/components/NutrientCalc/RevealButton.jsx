import { MdExpandCircleDown } from "react-icons/md";
import { useState } from "react";
function RevealButton({ setDisplayResults, displayResults, span }) {
  const [rotate, setRotate] = useState("");
  return (
    <button
      onClick={() => {
        setDisplayResults(!displayResults);
        rotate == "rotate-180" ? setRotate("") : setRotate("rotate-180");
      }}
      className={`btn text-2xl text-sidebar hover:text-textColor col-${span} group w-1/4 flex flex-col  items-center transition-colors my-8`}
    >
      {" "}
      <MdExpandCircleDown
        className={`group-hover:scale-125 ${rotate} transition-all`}
      />
    </button>
  );
}
export default RevealButton;
