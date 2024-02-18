import { useEffect } from "react";
import RemainingYan from "./RemainingYan";

function NutrientDisplay({
  targetYAN,
  gplInput,
  setGplInput,
  gramsToAdd,
  addedYan,
  amountPerAddition,
  gplToAdd,
  setMultiplier,
  yeastAmount,
  oneThirdBreak,
  remainingYan,
  setRemainingYan,
  gfType,
  setGFType,
  goFermGrams,
  setGoFermGrams,
  goFermWater,
  setGoFermWater,
  Tooltip,
  toolTipBody,
}) {
  useEffect(() => {
    goFerm();
  }, [gfType, yeastAmount]);
  function goFerm() {
    let multiplier = 0;
    let waterMultiplier = 20;
    if (gfType == "none") {
      waterMultiplier *= 0;
    }
    if (gfType == "go-ferm" || gfType == "go-ferm-protect") {
      multiplier = 1.25;
    }
    if (gfType == "go-ferm-sterol") {
      multiplier = 1.2;
      waterMultiplier /= 2;
    }
    const goFerm = yeastAmount * multiplier;
    console.log(gfType, yeastAmount, multiplier);
    setGoFermGrams(goFerm);
    setGoFermWater(goFerm * waterMultiplier);
  }
  return (
    <div className="component-div">
      <div
        className="grid grid-cols-5 justify-items-center text-center my-2"
        id="nuteDisplay"
      >
        <h2 className="col-start-2 my-2">Fermaid O</h2>
        <h2 className="my-2">Fermaid K</h2>
        <h2 className="my-2">DAP</h2>
        <span className="my-2">
          <div className="flex items-baseline justify-center">
            <h2>Go Ferm (g)</h2>
            <Tooltip body={toolTipBody.goFerm} />
          </div>
          <select
            className="input w-11/12"
            id="go-ferm-type"
            onChange={(e) => {
              if (e.target.value == "none") {
                setMultiplier(3);
              } else {
                setMultiplier(4);
              }
              setGFType(e.target.value);
            }}
          >
            <option value="go-ferm">Go-Ferm</option>
            <option value="go-ferm-protect">Go-Ferm Protect</option>
            <option value="go-ferm-sterol">Go-Ferm Sterol Flash</option>
            <option value="none">No Go-Ferm</option>
          </select>
        </span>
        <div className="flex items-baseline justify-center my-2">
          <h2 className="my-2">Max g/L</h2>
          <Tooltip body={toolTipBody.maxGpl} />
        </div>
        <input
          step="0.01"
          onFocus={(e) => e.target.select()}
          type="number"
          id="fermogpl"
          className="input w-2/4 my-2"
          value={gplInput[0]}
          onChange={(e) => {
            setGplInput([Number(e.target.value), gplInput[1], gplInput[2]]);
          }}
        />
        <input
          step="0.01"
          onFocus={(e) => e.target.select()}
          type="number"
          id="fermkgpl"
          className="input w-2/4 my-2"
          value={gplInput[1]}
          onChange={(e) => {
            setGplInput([gplInput[0], Number(e.target.value), gplInput[2]]);
          }}
        />
        <input
          step="0.01"
          onFocus={(e) => e.target.select()}
          type="number"
          id="dapgpl"
          className="input w-2/4 my-2"
          value={gplInput[2]}
          onChange={(e) => {
            setGplInput([gplInput[0], gplInput[1], Number(e.target.value)]);
          }}
        />
        <p className="sm:text-base text-[.9em] my-2">
          {Number(goFermGrams).toFixed(2) + "g"}
        </p>
        <h2 className="my-2">g/L to add</h2>
        {gplToAdd.map((gpl, i) => {
          {
            return (
              <p className="sm:text-base text-[.9em] my-2" key={gpl + i}>
                {gpl}
              </p>
            );
          }
        })}
        <h2 className="my-2">Water for Go-Ferm</h2>
        <h2 className="my-2">PPM YAN</h2>
        {addedYan.map((yan, i) => {
          return (
            <p key={yan + i} className="sm:text-base text-[.9em] my-2">
              {yan >= 0 ? yan.toFixed(2) : 0}
            </p>
          );
        })}
        <p className="my-2 sm:text-base text-[.9em]">
          {goFermWater.toFixed(2) + "ml"}
        </p>
        <h2 className="my-2">Total Grams</h2>
        {gramsToAdd.map((gram, i) => {
          {
            return (
              <p key={gram + i} className="sm:text-base text-[.9em] my-2">
                {gram + "g"}
              </p>
            );
          }
        })}
        <div className="flex items-baseline justify-center my-2">
          <h2 className="my-2">1/3 Sugar Break</h2>{" "}
          <Tooltip body={toolTipBody.oneThird} />
        </div>
        <h2 className="sm:text-base text-[.9em] my-2 col-start-1">
          Amount per Addition
        </h2>
        {amountPerAddition.map((gram, i) => {
          {
            return (
              <p key={gram + i} className="sm:text-base text-[.9em] my-2">
                {gram.toFixed(2) + "g"}
              </p>
            );
          }
        })}
        <p className="sm:text-base text-[.9em] my-2">{oneThirdBreak}</p>
        <h2 className="col-start-2 my-2">Total YAN</h2>
        <div className="col-start-4 col-span-2 flex items-baseline justify-center my-2">
          <h2 className=" my-2">Remaining YAN</h2>
          <Tooltip body={toolTipBody.remainingYan} />
        </div>
        <p className="sm:text-base text-[.9em] col-start-2 my-2">
          {targetYAN + "PPM"}
        </p>
        <RemainingYan
          addedYan={addedYan}
          targetYAN={targetYAN}
          setRemainingYan={setRemainingYan}
          remainingYan={remainingYan}
        />
      </div>
    </div>
  );
}

export default NutrientDisplay;
