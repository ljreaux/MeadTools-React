import { useEffect, useState } from "react";
import { FormData } from "../components/Nutrients/NutrientCalc";

export default function useMaxGpl(
  maxGpl: FormData["maxGpl"],
  selected: keyof FormData["maxGpl"],
  og: number = 1.0
) {
  const [gplArr, setGplArr] = useState<number[]>(maxGpl["tbe"].value);

  useEffect(() => {
    if (og <= 1.08) setGplArr([...maxGpl["oAndk"].value[0]]);
    else if (og > 1.08 && og <= 1.11) setGplArr([...maxGpl["oAndk"].value[1]]);
    else setGplArr([...maxGpl["oAndk"].value[2]]);

    if (maxGpl[selected] && selected !== "oAndk") {
      setGplArr(maxGpl[selected].value);
    }
  }, [maxGpl, selected, og]);
  return { gplArr, setGplArr };
}
