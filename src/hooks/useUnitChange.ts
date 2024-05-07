import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { BatchDetails } from "../components/ExtraCalculators/BenchTrials/BenchTrials";

export default function useUnitChange({
  stateObj,
  setterFunction,
  propertyToChange,
}: {
  stateObj: BatchDetails;
  setterFunction: Dispatch<SetStateAction<BatchDetails>>;
  propertyToChange: keyof BatchDetails;
}) {
  const [allowChange, setAllowChange] = useState(false);
  useEffect(() => {
    if (allowChange) {
      let newState = stateObj[propertyToChange];
      if (stateObj.units === "gallon" && typeof newState === "number")
        newState /= 3.785;
      if (stateObj.units === "liter" && typeof newState === "number")
        newState *= 3.785;
      setterFunction({ ...stateObj, [propertyToChange]: newState });
    }
    setAllowChange(true);
  }, [stateObj.units]);
  return [stateObj, setterFunction];
}
