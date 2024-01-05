import { useState, useEffect } from "react";

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
}) {
  const [gfType, setGFType] = useState("go-ferm");
  const [goFermGrams, setGoFermGrams] = useState(0);
  const [goFermWater, setGoFermWater] = useState(0);
  useEffect(() => {
    goFerm();
  }, [gfType, yeastAmount]);
  function goFerm() {
    let multiplier = 0;
    let waterMultiplier = 20;
    if (gfType != "none") {
      multiplier = 1.25;
    } else {
      waterMultiplier *= 0;
    }
    if (gfType == "go-ferm-sterol") {
      waterMultiplier /= 2;
    }
    const goFerm = yeastAmount * multiplier;
    setGoFermGrams(goFerm);
    setGoFermWater(goFerm * waterMultiplier);
  }
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
          <select
            className=" nute-select"
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
        <h2 className="my-2">Max g/L</h2>
        <input
          type="number"
          id="fermogpl"
          className="my-2 nute-input"
          value={gplInput[0]}
          onChange={(e) => {
            setGplInput([Number(e.target.value), gplInput[1], gplInput[2]]);
          }}
        />
        <input
          type="number"
          id="fermkgpl"
          className="my-2 nute-input"
          value={gplInput[1]}
          onChange={(e) => {
            setGplInput([gplInput[0], Number(e.target.value), gplInput[2]]);
          }}
        />
        <input
          type="number"
          id="dapgpl"
          className="my-2 nute-input"
          value={gplInput[2]}
          onChange={(e) => {
            setGplInput([gplInput[0], gplInput[1], Number(e.target.value)]);
          }}
        />
        <p className="my-2 text-base">{Number(goFermGrams).toFixed(2) + "g"}</p>
        <h2 className="my-2">g/L to add</h2>
        {gplToAdd.map((gpl) => {
          {
            return <p className="my-2 text-base">{gpl}</p>;
          }
        })}
        <h2 className="my-2">Water for Go-Ferm</h2>
        <h2 className="my-2">PPM YAN</h2>
        {addedYan.map((yan, i) => {
          return (
            <p key={yan + i} className="my-2 text-base">
              {yan >= 0 ? yan.toFixed(2) : 0}
            </p>
          );
        })}
        <p className="my-2 text-base">{goFermWater.toFixed(2) + "ml"}</p>
        <h2 className="my-2">Total Grams</h2>
        {gramsToAdd.map((gram, i) => {
          {
            return (
              <p key={gram + i} className="my-2 text-base">
                {gram + "g"}
              </p>
            );
          }
        })}{" "}
        <h2 className="my-2">1/3 Sugar Break</h2>
        <h2 className="my-2 col-start-1">Amount per Addition</h2>
        {amountPerAddition.map((gram, i) => {
          {
            return (
              <p key={gram + i} className="my-2 text-base">
                {gram.toFixed(2) + "g"}
              </p>
            );
          }
        })}
        <p className="my-2 text-base">{oneThirdBreak}</p>{" "}
        <h2 className="my-2 col-start-2">Total YAN</h2>
        <h2 className="my-2 col-start-4 col-span-2">Remaining YAN</h2>
        <p className="my-2 text-base col-start-2">{targetYAN + " PPM"}</p>
        <p className="my-2 text-base col-start-4 col-span-2">
          {addedYan[0] + addedYan[1] + addedYan[2] >= targetYAN
            ? "O PPM"
            : `${(
                targetYAN -
                (addedYan[0] + addedYan[1] + addedYan[2])
              ).toFixed(2)} PPM`}
        </p>
      </div>
    </div>
  );
}
export default NutrientDisplay;
