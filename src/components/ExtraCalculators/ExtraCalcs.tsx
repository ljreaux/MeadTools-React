import AbvCalculator from "./Abv/AbvCalculator";
import BenchTrials from "./BenchTrials/BenchTrials";
import Brix from "./Brix/Brix";
import EstimatedOG from "./EstimatedOG/EstimatedOG";
import Refractometer from "./Refractometer/Refractometer";
import TempCorrection from "./Temperature/TempCorrection";
import Stabilizers from "./Stabilizers/Stabilizers";
import { Routes, Route } from "react-router-dom";
import BlendingCalc from "./Blending/BlendingCalc";
import ExtraCalcsSideBar from "./Nav/ExtraCalcsSideBar";

export default function ExtraCalcs() {
  return (
    <>
      <ExtraCalcsSideBar />
      <Routes>
        <Route path="/" element={<AbvCalculator />} />
        <Route path="/benchTrials" element={<BenchTrials />} />
        <Route path="/brixCalc" element={<Brix />} />
        <Route path="/estOG" element={<EstimatedOG />} />
        <Route path="/RefractometerCorrection" element={<Refractometer />} />
        <Route path="/tempCorrection" element={<TempCorrection />} />
        <Route path="/stabilizers" element={<Stabilizers />} />
        <Route path="/blending" element={<BlendingCalc />} />
      </Routes>
    </>
  );
}
