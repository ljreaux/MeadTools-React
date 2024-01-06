import Title from "../Title";
import { useState } from "react";

function RefractCorrect({ toBrix, toSg, abvCalc }) {
  function refracCalc(ogBr, fgBr, corFac) {
    return -0.002349 * (ogBr / corFac) + 0.006276 * (fgBr / corFac) + 1;
  }
  function delle(fg, abv) {
    return toBrix(fg) + 4.5 * abv;
  }
  const [refrac, setRefrac] = useState([
    {
      cf: 1,
      og: 1.1,
      units: "sg",
      fg: 8.5,
    },
  ]);
  const refracObj = refrac[0];
  const checkUnits = () => {
    if (refracObj.units == "brix") {
      return refracCalc(refracObj.og, refracObj.fg, refracObj.cf);
    } else {
      return refracCalc(toBrix(refracObj.og), refracObj.fg, refracObj.cf);
    }
  };
  const checkUnitsAbv = () => {
    if (refracObj.units == "brix") {
      return abvCalc(toSg(refracObj.og), checkUnits().toFixed(3));
    } else {
      return abvCalc(refracObj.og, checkUnits().toFixed(3));
    }
  };
  return (
    <div className="component-div">
      <Title header="Refractometer Correction Calculator" />
      <div className="text-center">
        <label>Correction Factor: </label>
        <input
          className="input"
          defaultValue={1}
          onChange={(e) => {
            setRefrac([
              {
                cf: e.target.value,
                og: refracObj.og,
                units: refracObj.units,
                fg: refracObj.fg,
              },
            ]);
          }}
        />
      </div>
      <div className="text-center">
        <label>Enter OG: </label>
        <input
          className="input w-1/4"
          defaultValue={1.1}
          onChange={(e) => {
            setRefrac([
              {
                cf: refracObj.cf,
                og: e.target.value,
                units: refracObj.units,
                fg: refracObj.fg,
              },
            ]);
          }}
        />
        <select
          className="input w-1/4 hover:cursor-pointer"
          onChange={(e) => {
            setRefrac([
              {
                cf: refracObj.cf,
                og: refracObj.og,
                units: e.target.value,
                fg: refracObj.fg,
              },
            ]);
          }}
        >
          <option value="sg">SG</option>
          <option value="brix">Brix</option>
        </select>

        <p>
          {refracObj.units == "sg"
            ? `${toBrix(refracObj.og).toFixed(2)} Brix`
            : toSg(refracObj.og).toFixed(3)}
        </p>
      </div>
      <div className="text-center">
        <label>Enter FG in Brix: </label>
        <input
          className="input w-1/4"
          defaultValue={8.5}
          onChange={(e) => {
            setRefrac([
              {
                cf: refracObj.cf,
                og: refracObj.og,
                units: refracObj.units,
                fg: e.target.value,
              },
            ]);
          }}
        />
      </div>
      <p className="text-center pt-4">{`${checkUnits().toFixed(3)}, ${toBrix(
        checkUnits()
      ).toFixed(2)} Brix`}</p>
      <p className="pb-4">{`${checkUnitsAbv()}% ABV, ${delle(
        checkUnits(),
        checkUnitsAbv()
      ).toFixed(0)} Delle Units`}</p>
    </div>
  );
}
export default RefractCorrect;
