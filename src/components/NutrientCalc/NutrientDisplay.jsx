import { useState } from "react";

function NutrientDisplay({
  targetYAN,
  gplInput,
  setGplInput,
  ppmYanO,
  // checkFermOPPM,
  ppmYanK,
  ppmYanDap,
  addedYan,
  // checkFermKPPM,
  gplToAdd,
}) {
  return (
    <div className="component-div">
      <div
        className="my-2 grid grid-cols-5 text-center justify-items-center"
        id="nuteDisplay"
      >
        <h2 className="my-2 col-start-2">Fermaid O</h2>
        <h2 className="my-2">Fermaid K</h2>
        <h2 className="my-2">DAP</h2>
        <span className="my-2">
          <h2>Go Ferm (g)</h2>
          <select className=" nute-select" id="go-ferm-type">
            <option value="go-ferm">Go-Ferm</option>
            <option value="go-ferm-protect">Go-Ferm Protect</option>
            <option value="go-ferm-sterol">Go-Ferm Sterol Flash</option>
          </select>
        </span>
        <h2 className="my-2">Max g/L</h2>
        <input
          id="fermogpl"
          className="my-2 nute-input"
          value={gplInput[0]}
          onChange={(e) => {
            setGplInput([Number(e.target.value), gplInput[1], gplInput[2]]);
            // checkFermOPPM();
            // checkFermKPPM();
          }}
        />
        <input
          id="fermkgpl"
          className="my-2 nute-input"
          value={gplInput[1]}
          onChange={(e) => {
            setGplInput([gplInput[0], Number(e.target.value), gplInput[2]]);
            // checkFermOPPM();
            // checkFermKPPM();
          }}
        />
        <input
          id="dapgpl"
          className="my-2 nute-input"
          value={gplInput[2]}
          onChange={(e) => {
            setGplInput([gplInput[0], gplInput[1], Number(e.target.value)]);
            checkFermOPPM();
            // checkFermKPPM();
          }}
        />
        <p className="my-2 text-base">0g</p>
        <h2 className="my-2">g/L to add</h2>
        <p className="my-2 text-base">{gplToAdd[0]}</p>
        <p className="my-2 text-base">{gplToAdd[1]}</p>
        <p className="my-2 text-base">{gplToAdd[2]}</p>
        <h2 className="my-2">Water for Go-Ferm</h2>
        <h2 className="my-2">PPM YAN</h2>
        <p className="my-2 text-base">
          {ppmYanO >= 0 ? ppmYanO.toFixed(2) : 0}
        </p>
        <p className="my-2 text-base">
          {ppmYanK >= 0 ? ppmYanK.toFixed(2) : 0}
        </p>
        <p className="my-2 text-base">
          {ppmYanDap >= 0 ? ppmYanDap.toFixed(2) : 0}
        </p>
        <p className="my-2 text-base">0ml</p>
        <h2 className="my-2">Total Grams</h2>
        <p className="my-2 text-base">0</p>
        <p className="my-2 text-base">0</p>
        <p className="my-2 text-base">0</p>
        <h2 className="my-2 col-start-2">Total YAN</h2>
        <h2 className="my-2 col-start-4 col-span-2">Remaining YAN</h2>
        <p className="my-2 text-base col-start-2">{targetYAN + " PPM"}</p>
        <p className="my-2 text-base col-start-4 col-span-2">
          {addedYan[0] + addedYan[1] + addedYan[2] >= targetYAN
            ? "O PPM"
            : `${targetYAN - (addedYan[0] + addedYan[1] + addedYan[2])} PPM`}
        </p>
        <h2 className="my-2 col-span-3">Amount per Addition</h2>
        <h2 className="my-2 col-start-4 col-span-2">1/3 Sugar Break</h2>
        <p className="my-2 text-base col-start-1">0g Ferm O</p>
        <p className="my-2 text-base">0g Ferm K</p>
        <p className="my-2 text-base">0g DAP</p>
        <p className="my-2 text-base col-start-4 col-span-2">1.060</p>
      </div>
    </div>
  );
}
export default NutrientDisplay;
