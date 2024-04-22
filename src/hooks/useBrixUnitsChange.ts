import { useEffect, Dispatch, SetStateAction } from "react";
import { toSG, toBrix } from "../helpers/unitConverters";
import { Brix } from "../components/ExtraCalculators/Brix/Brix";

export default function useBrixUnitsChange({
  stateObj,
  setterFunction,
  propertyToChange,
}: {
  stateObj: Brix;
  setterFunction: Dispatch<SetStateAction<Brix>>;
  propertyToChange: "value" | "unit";
}) {
  useEffect(() => {
    let newState = stateObj[propertyToChange];
    if (stateObj.unit === "SG" && typeof newState === "number") {
      newState = Math.round(toSG(newState) * 1000) / 1000;
    }
    if (stateObj.unit === "Brix" && typeof newState === "number") {
      newState = Math.round(toBrix(newState) * 100) / 100;
    }
    setterFunction((prev) => ({ ...prev, [propertyToChange]: newState }));
  }, [stateObj.unit]);

  return [stateObj, setterFunction];
}
