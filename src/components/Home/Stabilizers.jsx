import { useEffect, useState } from "react";

import Sorbate from "./Sorbate";
import Sulfite from "./Sulfite";
import Tooltip from "../Tooltip";
import { toolTipBody } from "../tooltipsBody";

function Stabilizers({
  volUnits,
  abv,
  totalVolume,
  sorbAmount,
  setSorbAmount,
  sulfiteAmount,
  setSulfiteAmount,
}) {
  // hides stabilizers
  const [using, setUsing] = useState(
    JSON.parse(sessionStorage.getItem("usingStabilizers")) || false
  );

  // allows user to put in pH reading and handles change
  const [ph, setPh] = useState(
    JSON.parse(sessionStorage.getItem("takingPh")) || false
  );
  const [phInput, setPhInput] = useState(
    JSON.parse(sessionStorage.getItem("inputPh")) || 3.6
  );
  const [phReading, setPhReading] = useState(50);

  function determinePPM(input) {
    // would love to have a formula instead of fixed values, but these are the values I have. I should probably just find a line of best fit.
    const oneDec = Number(input).toFixed(1);
    let ppm = 50;
    if (oneDec <= 2.9) {
      ppm = 11;
    } else if (oneDec == 3) {
      ppm = 13;
    } else if (oneDec == 3.1) {
      ppm = 16;
    } else if (oneDec == 3.2) {
      ppm = 21;
    } else if (oneDec == 3.3) {
      ppm = 26;
    } else if (oneDec == 3.4) {
      ppm = 32;
    } else if (oneDec == 3.5) {
      ppm = 39;
    } else if (oneDec == 3.6) {
      ppm = 49;
    } else if (oneDec == 3.7) {
      ppm = 63;
    } else if (oneDec == 3.8) {
      ppm = 98;
    } else if (oneDec >= 3.9) {
      ppm = 123;
    }
    setPhReading(ppm);
  }

  useEffect(() => {
    determinePPM(phInput);
  }, [phInput]);

  useEffect(() => {
    sessionStorage.setItem("usingStabilizers", JSON.stringify(using));
    sessionStorage.setItem("takingPh", JSON.stringify(ph));
    sessionStorage.setItem("inputPh", JSON.stringify(phInput));
  }, [using, ph, phInput]);

  return (
    <div className="component-div my-4 mb-12">
      <div className="grid grid-cols-4 place-items-center text-center">
        <span className="col-start-1 col-span-2">
          <div className="flex items-baseline justify-center py-6 mx-2">
            <h2>Are you adding stabilizers? </h2>
            <Tooltip
              body={toolTipBody.stabilizers}
              link={"https://meadmaking.wiki/en/process/stabilization"}
            />
          </div>
          <select
            className="input w-11/12"
            value={using ? "yes" : "no"}
            onChange={() => {
              setUsing(!using);
            }}
          >
            <option value="no">No</option> <option value="yes">Yes</option>
          </select>
        </span>
        <span className="col-start-3 col-span-2">
          <h2 className="py-6 mx-2">Are you taking a pH Reading?</h2>
          <select
            className="input w-11/12"
            value={ph ? "yes" : "no"}
            onChange={() => {
              setPh(!ph);
              setPhReading(50);
            }}
          >
            <option value="no">No</option> <option value="yes">Yes</option>
          </select>
        </span>
        {using && (
          <>
            <h2 className="py-6 mx-2">Potassium Sorbate:</h2>
            <Sorbate
              volUnits={volUnits}
              abv={abv}
              totalVolume={totalVolume}
              sorbAmount={sorbAmount}
              setSorbAmount={setSorbAmount}
            />
            {ph && (
              <input
                step="0.1"
                type="number"
                onFocus={(e) => e.target.select()}
                className="input w-2/4 col-span-2"
                value={phInput}
                onChange={(e) => setPhInput(e.target.value)}
              />
            )}
            <h2 className="py-6 mx-2">Potassium Metabisulfite:</h2>
            <Sulfite
              volUnits={volUnits}
              totalVolume={totalVolume}
              phReading={phReading}
              sulfiteAmount={sulfiteAmount}
              setSulfiteAmount={setSulfiteAmount}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Stabilizers;
