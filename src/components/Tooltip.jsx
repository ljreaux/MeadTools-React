import { FaCircleInfo } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";

export default function Tooltip({ title, body }) {
  const [hidden, setHidden] = useState(true);
  function toggleTooltip() {
    setHidden((prev) => !prev);
  }

  return (
    <div>
      <button className={"relative"} onClick={toggleTooltip}>
        <FaCircleInfo />
      </button>
      <div className={`absolute ${hidden && "hidden"}`}>
        <button onClick={toggleTooltip}>
          <FaWindowClose />
        </button>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
}
