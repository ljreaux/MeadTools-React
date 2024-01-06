import { useState } from "react";
import NutrientCalc from "./NutrientCalc";

export default function NuteContainer() {
  const [dummyVol, setDummyVol] = useState(1);
  const [dummySG, setDummySG] = useState(1);
  const [dummyOffset, setDummyOffset] = useState(0);
  const [dummyUnits, setDummyUnits] = useState("gal");
  const [displayMainResults, setDisplayMainResults] = useState(false);
  return (
    <NutrientCalc
      mainCalcVol={dummyVol}
      setMainCalcVol={setDummyVol}
      mainCalcSG={dummySG}
      setMainCalcSG={setDummySG}
      mainCalcOffset={dummyOffset}
      setMainCalcOffset={setDummyOffset}
      mainCalcUnits={dummyUnits}
      setMainCalcUnits={setDummyUnits}
      displayMainResults={displayMainResults}
    ></NutrientCalc>
  );
}
