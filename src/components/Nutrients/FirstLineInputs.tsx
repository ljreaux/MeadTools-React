import { FormEvent } from "react";
import { toBrix } from "../../helpers/unitConverters";

export default function FirstLineInputs({
  inputs,
  handleChange,
}: {
  inputs: {
    volume: number;
    sg: number;
    offset: number;
    numberOfAdditions: number;
  };
  handleChange: (e: FormEvent<EventTarget>) => void;
}) {
  return (
    <>
      <input
        type="number"
        id="volume"
        name="volume"
        value={inputs.volume}
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
      <div className="flex ">
        <input
          type="number"
          id="specificGravity"
          name="sg"
          value={inputs.sg}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
        />{" "}
        <p>{Math.round(toBrix(inputs.sg) * 100) / 100} Brix</p>
      </div>
      <input
        type="number"
        id="offsetPpm"
        name="offset"
        value={inputs.offset}
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
    </>
  );
}
