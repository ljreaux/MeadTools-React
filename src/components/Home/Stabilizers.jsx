import { useEffect, useState } from "react";

import Sorbate from "./Sorbate";

function Stabilizers({ volUnits, abv, totalVolume }) {
  // hides stabilizers
  const [using, setUsing] = useState(false);

  // allows user to put in pH reading and handles change
  const [ph, setPh] = useState(false);
  const [phInput, setPhInput] = useState(3.6);
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

  return (
    <div className="component-div my-4 mb-12">
      <div className="grid grid-cols-4 place-items-center text-center">
        <span className="col-start-1 col-span-2">
          <h2 className="py-6 mx-2">Are you adding stabilizers?</h2>
          <select
            className="input w-11/12"
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
            <Sorbate volUnits={volUnits} abv={abv} totalVolume={totalVolume} />
            {ph && (
              <input
                className="input w-2/4 col-span-2"
                value={phInput}
                onChange={(e) => setPhInput(e.target.value)}
              />
            )}
            <h2 className="py-6 mx-2">Potassium Metabisulfite:</h2>
            <p className="py-4">
              {volUnits == "gal"
                ? `${((totalVolume * 3.785 * phReading) / 570).toFixed(3)}g`
                : `${((totalVolume * phReading) / 570).toFixed(3)}g`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Stabilizers;
