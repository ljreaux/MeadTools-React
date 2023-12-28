import { useState } from "react";
import "./App.css";
import AbvCalculator from "./components/AbvCalculator.jsx";
import ChangeToBrix from "./components/ChangeToBrix.jsx";
import EstimatedOG from "./components/EstimatedOG.jsx";
import SulfiteAddition from "./components/SulfiteAddition.jsx";
import SorbateAddition from "./components/SorbateAddition.jsx";
import RefractCorrect from "./components/RefractCorrect.jsx";
import TempCorrection from "./components/TempCorrection.jsx";
import BlendingCalc from "./components/BlendingCalc.jsx";
import ExtraCalcsSideBar from "./components/ExtraCalcsSideBar.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  const [abvArr, setAbvObj] = useState([
    {
      og: null,
      fg: 0.996,
      abv: 0,
    },
  ]);
  const ABVObj = abvArr[0];

  const handleOg = (e) => {
    setAbvObj([
      {
        og: Number(e.target.value),
        fg: 0.996,
        abv: 0,
      },
    ]);
  };
  const handleFg = (e) => {
    setAbvObj([
      {
        og: ABVObj.og,
        fg: Number(e.target.value),
        abv: 0,
      },
    ]);
  };

  const toBrix = (value) => {
    return (
      -668.962 + 1262.45 * value - 776.43 * value ** 2 + 182.94 * value ** 3
    );
  };

  const toSg = (value) => {
    return (
      1.00001 +
      0.0038661 * value +
      1.3488 * 10 ** -5 * value ** 2 +
      4.3074 * 10 ** -8 * value ** 3
    );
  };

  const runAbvCalc = () => {
    const ABV = abvCalc(ABVObj.og, ABVObj.fg);
    setAbvObj([
      {
        og: ABVObj.og,
        fg: ABVObj.fg,
        abv: ABV,
      },
    ]);
  };
  const abvCalc = (OG, FG) => {
    const OE = -668.962 + 1262.45 * OG - 776.43 * OG ** 2 + 182.94 * OG ** 3;
    const AE = -668.962 + 1262.45 * FG - 776.43 * FG ** 2 + 182.94 * FG ** 3;
    const q = 0.22 + 0.001 * OE;
    const RE = (q * OE + AE) / (1 + q);
    const ABW = (OE - RE) / (2.0665 - 0.010665 * OE);
    const ABV = ABW * (FG / 0.794);

    return ABV.toFixed(2);
  };
  function delle() {
    return toBrix(ABVObj.fg) + 4.5 * ABVObj.abv;
  }

  const [estOG, setEstOG] = useState([
    {
      hydroFG: 1,
      refracFG: 1,
      estOG: 0,
    },
  ]);

  const estOGObj = estOG[0];

  const handleHydroFG = (e) => {
    setEstOG([
      {
        hydroFG: e.target.value,
        refracFG: estOGObj.refracFG,
        estOG: estOGObj.estOG,
      },
    ]);
  };

  const handleRefracFG = (e) => {
    setEstOG([
      {
        hydroFG: estOGObj.hydroFG,
        refracFG: e.target.value,
        estOG: estOGObj.estOG,
      },
    ]);
  };

  const handleEstOG = (value) => {
    setEstOG([
      {
        hydroFG: estOGObj.hydroFG,
        refracFG: estOGObj.refracFG,
        estOG: value,
      },
    ]);
  };

  const [temp, setTemp] = useState([
    {
      sg: 1.1,
      curTemp: 90,
      calTemp: 68,
      units: "F",
    },
  ]);

  const tempObj = temp[0];
  const handleTempSg = (e) => {
    setTemp([
      {
        sg: e.target.value,
        curTemp: tempObj.curTemp,
        calTemp: tempObj.calTemp,
        units: tempObj.units,
      },
    ]);
  };
  return (
    <div className="main-div-style">
      <ExtraCalcsSideBar />
      <Routes>
        <Route
          path="/"
          element={
            <AbvCalculator
              toBrix={toBrix}
              handleOg={handleOg}
              ABVObj={ABVObj}
              handleFg={handleFg}
              runAbvCalc={runAbvCalc}
              delle={delle}
            />
          }
        />
        <Route path="/brixCalc" element={<ChangeToBrix toBrix={toBrix} />} />
        <Route
          path="/estOG"
          element={
            <EstimatedOG
              handleGravity={handleRefracFG}
              abvObj={estOGObj}
              handleEstOG={handleEstOG}
              abvCalc={abvCalc}
              toBrix={toBrix}
              handleHydroFG={handleHydroFG}
              estOGObj={estOGObj}
            />
          }
        />
        <Route path="/sulfite" element={<SulfiteAddition />} />
        <Route path="/sorbate" element={<SorbateAddition />} />
        <Route
          path={"/RefractometerCorrection"}
          element={
            <RefractCorrect toBrix={toBrix} toSg={toSg} abvCalc={abvCalc} />
          }
        />
        <Route
          path="/tempCorrection"
          element={
            <TempCorrection
              toBrix={toBrix}
              handleTempSg={handleTempSg}
              tempObj={tempObj}
              setTemp={setTemp}
            />
          }
        />
        <Route path="/blending" element={<BlendingCalc />} />
      </Routes>
    </div>
  );
}

export default App;
