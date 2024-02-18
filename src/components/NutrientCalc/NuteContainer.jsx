import { useState } from "react";
import NutrientCalc from "./NutrientCalc";

// this container exists to remove errors caused by not having input from mainCalc
export default function NuteContainer() {
  const [preferred, setPreferred] = useState("TBE (All Three)");
  const [dummyVol, setDummyVol] = useState(1);
  const [dummySG, setDummySG] = useState(1);
  const [dummyOffset, setDummyOffset] = useState(0);
  const [dummyUnits, setDummyUnits] = useState("gal");
  const [dummyYeastInfo, setDummyYeastInfo] = useState({});
  const [displayMainResults, setDisplayMainResults] = useState(false);
  const [dummyNuteInfo, setDummyNuteInfo] = useState(1);
  const [dummySugar, setDummySugar] = useState(1);
  const [dummyYeast, setDummyYeast] = useState([
    {
      name: "18-2007",
      "Nitrogen Requirement": "Low",
      "ABV Tolerance": 15,
      LowTemp: 50,
      HighTemp: 90,
    },
  ]);
  const [remainingYan, setRemainingYan] = useState(0);
  const [gfType, setGFType] = useState("go-ferm");
  const [goFermGrams, setGoFermGrams] = useState(0);
  const [goFermWater, setGoFermWater] = useState(0);
  const [dummyYeastBrand, setDummyYeastBrand] = useState(0);
  const [dummySchedule, setDummySchedule] = useState(
    JSON.parse(sessionStorage.getItem("nuteSchedule")) || "tbe"
  );
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
      mainCalcYeastInfo={dummyYeast}
      setMainCalcYeastInfo={setDummyYeastInfo}
      setMainCalcYeastBrand={setDummyYeastBrand}
      setMainCalcSugarBreak={setDummySugar}
      displayMainResults={displayMainResults}
      setMainCalcNuteInfo={setDummyNuteInfo}
      remainingYan={remainingYan}
      setRemainingYan={setRemainingYan}
      gfType={gfType}
      setGFType={setGFType}
      goFermGrams={goFermGrams}
      setGoFermGrams={setGoFermGrams}
      goFermWater={goFermWater}
      setGoFermWater={setGoFermWater}
      setPreferred={setPreferred}
      preferredSchedule={dummySchedule}
      setPreferredSchedule={setDummySchedule}
    ></NutrientCalc>
  );
}
