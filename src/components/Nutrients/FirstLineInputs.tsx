import { FormEvent } from "react";
import { toBrix } from "../../helpers/unitConverters";
import { TableCell } from "../ui/table";
import { Input } from "../ui/input";

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
      <TableCell>
        <Input
          type="number"
          id="volume"
          name="volume"
          value={inputs.volume}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
        />
      </TableCell>
      <TableCell className="flex gap-4">
        <Input
          type="number"
          id="specificGravity"
          name="sg"
          value={inputs.sg}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          step={0.001}
        />{" "}
        <p className="text-center">
          {Math.round(toBrix(inputs.sg) * 100) / 100} Brix
        </p>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          id="offsetPpm"
          name="offset"
          value={inputs.offset}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
        />
      </TableCell>
    </>
  );
}
