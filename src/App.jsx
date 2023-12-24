import { useState } from "react";
import "./App.css";
import GravityInput from "./GravityInput.jsx";
import ABVRunButton from "./ABVRunButton.jsx";
import ChangeToBrix from "./ChangeToBrix.jsx";
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

  return (
    <>
      <h1>ABV Calculator</h1>

      <GravityInput
        gravity="og"
        handleGravity={handleOg}
        toBrix={toBrix}
        abvObj={ABVObj}
        readingType="og"
        initial={""}
      />
      <GravityInput
        gravity="fg"
        handleGravity={handleFg}
        toBrix={toBrix}
        abvObj={ABVObj}
        readingType="fg"
        initial={0.996}
      />
      <ABVRunButton runAbvCalc={runAbvCalc} ABVObj={ABVObj} delle={delle} />

      <ChangeToBrix toBrix={toBrix} />
    </>
  );
}

export default App;
