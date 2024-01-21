// refactor with more components later
import Title from "../Title";
import NutrientDisplay from "./NutrientDisplay";
import RevealButton from "./RevealButton";
import { useState, useEffect } from "react";
import yeasts from "/src/yeast.json";
import Tooltip from "../Tooltip";
import { toolTipBody } from "../tooltipsBody";

function NutrientCalc({
  mainCalcVol,
  setMainCalcVol,
  mainCalcSG,
  setMainCalcSG,
  mainCalcOffset,
  mainCalcUnits,
  setMainCalcOffset,
  setMainCalcUnits,
  mainCalcYeastInfo,
  setMainCalcYeastInfo,
  mainCalcYeastBrand,
  setMainCalcYeastBrand,
  setMainCalcSugarBreak,
  displayMainResults,
  setMainCalcNuteInfo,
  remainingYan,
  setRemainingYan,
  gfType,
  setGFType,
  goFermGrams,
  setGoFermGrams,
  goFermWater,
  setGoFermWater,
  setPreferred,
  preferredSchedule,
  setPreferredSchedule,
}) {
  // object contains values for all nutrient regimens
  const maxGpl = {
    tbe: [0.45, 0.5, 0.96],
    tosna: [2.5, 0, 0],
    justK: [0, 3, 0],
    dap: [0, 0, 1.5],
    oAndkLow: [0.6, 0.81, 0],
    oAndkMed: [0.9, 0.81, 0],
    oAndkHigh: [1.1, 1, 0],
    oAndDap: [1, 0, 0.96],
    kAndDap: [0, 1, 0.96],
  };

  // state objects for all needed inputs
  const [gplInput, setGplInput] = useState([...maxGpl.tbe]);
  const [gplToAdd, setGplToAdd] = useState([...gplInput]);
  const [targetYAN, setTargetYAN] = useState(0);
  const [ppmYanO, setPpmYanO] = useState(0);
  const [ppmYanK, setPpmYanK] = useState(0);
  const [ppmYanDap, setPpmYanDap] = useState(0);
  const [addedYan, setAddedYan] = useState([ppmYanO, ppmYanK, ppmYanDap]);
  const [multiplier, setMultiplier] = useState(4);

  function runToAddGpl() {
    const totalPPMO = targetYAN;
    const maxGplO = gplInput[0];
    const target = totalPPMO / (40 * multiplier);
    let extra;
    let toAddFermO;
    if (target >= maxGplO) {
      toAddFermO = maxGplO.toFixed(2);
      if (toAddFermO < 0) {
        toAddFermO = 0;
      }
      extra = totalPPMO - maxGplO * 40 * multiplier;
    } else {
      toAddFermO = target.toFixed(2);
      if (toAddFermO < 0) {
        toAddFermO = 0;
      }
      extra = totalPPMO - target * 40 * multiplier;
    }

    const totalPPMK = extra;
    const maxGplK = gplInput[1];
    const targetK = totalPPMK / 100;
    let toAddFermK;
    if (targetK >= maxGplK) {
      toAddFermK = maxGplK.toFixed(2);
      if (toAddFermK < 0) {
        toAddFermK = 0;
      }
      extra = totalPPMK - maxGplK * 100;
    } else {
      toAddFermK = targetK.toFixed(2);
      if (toAddFermK < 0) {
        toAddFermK = 0;
      }
      extra = totalPPMK - targetK * 100;
    }

    const totalPPMDAP = extra;
    const maxGplDAP = gplInput[2];
    const targetDap = totalPPMDAP / 210;
    let toAddDAP;
    if (targetDap >= maxGplDAP) {
      toAddDAP = maxGplDAP.toFixed(2);
      if (toAddDAP < 0) {
        toAddDAP = 0;
      }
      extra = totalPPMDAP - maxGplDAP * 210;
    } else {
      toAddDAP = targetDap.toFixed(2);
      if (toAddDAP < 0) {
        toAddDAP = 0;
      }
      extra = totalPPMDAP - targetDap * 210;
    }

    setGplToAdd([toAddFermO, toAddFermK, toAddDAP]);
    const toAddOPPM = toAddFermO * 160;
    const toAddKPPM = toAddFermK * 100;
    const toAddDapPPM = toAddDAP * 210;
    setAddedYan([toAddOPPM, toAddKPPM, toAddDapPPM]);
  }

  const ogBrix = (OG) => {
    return -668.962 + 1262.45 * OG - 776.43 * OG ** 2 + 182.94 * OG ** 3;
  };

  // display states
  const [displayBrix, setDisplayBrix] = useState("0");
  const [yeastNames, setYeastNames] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(
    JSON.parse(sessionStorage.getItem("yeastBrand")) || "Lalvin"
  );
  const selectedBrandObj = selectedBrand[0];
  const [selectedYeast, setSelectedYeast] = useState(
    JSON.parse(sessionStorage.getItem("yeastInfo")) || [
      {
        brand: "Lalvin",
        name: "18-2007",
        "Nitrogen Requirement": "Low",
        "ABV Tolerance": 15,
        LowTemp: 50,
        HighTemp: 90,
      },
    ]
  );
  const selectedYeastObj = selectedYeast[0];
  const yeastObj = yeastNames;

  // gets yeasts from json data
  useEffect(() => {
    function getYeasts() {
      try {
        const response = JSON.parse(JSON.stringify(yeasts));
        const data = response;
        setYeastNames(data);
      } catch (error) {
        console.error(error);
      }
    }

    getYeasts();
  }, []);

  // state for display button
  const [displayResults, setDisplayResults] = useState(false);

  const [nuteInfo, setNuteInfo] = useState([
    selectedYeastObj,
    {
      units: "gal",
      vol: 1,
      sg: 1.1,
      offset: 0,
    },
  ]);
  const nuteInfoObj = nuteInfo[1];
  useEffect(() => {
    setNuteInfo([
      selectedYeastObj,
      {
        units: mainCalcUnits,
        vol: mainCalcVol,
        sg: mainCalcSG,
        offset: mainCalcOffset,
      },
    ]);
    setDisplayBrix(Number(ogBrix(mainCalcSG)).toFixed(2));
  }, [mainCalcSG, mainCalcVol]);

  const setVol = (e) => {
    setNuteInfo([
      selectedYeastObj,
      {
        units: nuteInfoObj.units,
        vol: e.target.value,
        sg: nuteInfoObj.sg,
        offset: nuteInfoObj.offset,
      },
    ]);
    setMainCalcVol(e.target.value);
  };
  const setUnits = (e) => {
    setNuteInfo([
      selectedYeastObj,
      {
        units: e.target.value,
        vol: nuteInfoObj.vol,
        sg: nuteInfoObj.sg,
        offset: nuteInfoObj.offset,
      },
    ]);
    setMainCalcUnits(e.target.value);
  };
  const setSg = (e) => {
    setNuteInfo([
      selectedYeastObj,
      {
        units: nuteInfoObj.units,
        vol: nuteInfoObj.vol,
        sg: e.target.value,
        offset: nuteInfoObj.offset,
      },
    ]);

    setDisplayBrix(ogBrix(e.target.value).toFixed(2));
    setMainCalcSG(e.target.value);
  };
  const setOffset = (e) => {
    setNuteInfo([
      selectedYeastObj,
      {
        units: nuteInfoObj.units,
        vol: nuteInfoObj.vol,
        sg: nuteInfoObj.sg,
        offset: e.target.value,
      },
    ]);
    setMainCalcOffset(e.target.value);
  };

  const [yeastAmount, setYeastAmount] = useState(0);
  function determineYeastAmount() {
    let multiplier = 1;
    const volume = nuteInfoObj.vol;
    const SG = nuteInfoObj.sg;
    if (nuteInfoObj.units != "gal") {
      multiplier /= 3.785;
    }
    if (SG > 1.125) {
      multiplier *= 4;
    } else if (SG > 1.1 && SG < 1.125) {
      multiplier *= 3;
    } else {
      multiplier *= 2;
    }
    setYeastAmount((volume * multiplier).toFixed(2));
  }

  function calcPPM() {
    let multiplier = 1;
    const nitroRequirement = selectedYeastObj["Nitrogen Requirement"];

    // determines yeast nitrogen requirement and sets multiplier
    nitroRequirement == "Low"
      ? (multiplier *= 0.75)
      : nitroRequirement == "Medium"
      ? (multiplier *= 0.9)
      : nitroRequirement == "High"
      ? (multiplier *= 1.25)
      : (multiplier *= 1.8);
    const gpl = displayBrix * nuteInfoObj.sg * 10;
    let targetYan = gpl * multiplier;
    const offsetPPM = nuteInfoObj.offset;
    targetYan = targetYan - offsetPPM;
    const roundedYan = targetYan.toFixed(0);

    setTargetYAN(roundedYan);
  }

  useEffect(() => {
    calcPPM();
    determineYeastAmount();
  }, [nuteInfo, multiplier]);
  useEffect(() => {
    runToAddGpl();
  }, [targetYAN, gplInput, multiplier]);
  useEffect(
    () => {
      calcTotalGrams();
    },
    [gplToAdd, nuteInfo],
    multiplier
  );

  const [gramsToAdd, setGramsToAdd] = useState([]);
  function calcTotalGrams() {
    const volUnits = nuteInfoObj.units;
    let vol = nuteInfoObj.vol;

    if (volUnits === "gal") {
      vol *= 3.78541;
    }

    const gramsArr = gplToAdd.map((item) => {
      return (item * vol).toFixed(2);
    });
    setGramsToAdd([...gramsArr]);
  }

  const [additions, setAdditions] = useState(
    JSON.parse(sessionStorage.getItem("numOfAdditions")) || 1
  );
  const [amountPerAddition, setAmountPerAddition] = useState([...gramsToAdd]);
  useEffect(() => {
    const perAdd = gramsToAdd.map((gram) => {
      return gram / additions;
    });
    setAmountPerAddition([...perAdd]);
  }, [additions, gramsToAdd]);

  const [oneThirdBreak, setOneThirdBreak] = useState(0);
  useEffect(() => {
    const WorkingOg = nuteInfoObj.sg - 1;
    const oneThird = 1 + (WorkingOg * 2) / 3;
    setOneThirdBreak(oneThird.toFixed(3));
  }, [nuteInfo]);

  useEffect(() => {
    setNuteInfo([
      selectedYeastObj,
      {
        units: mainCalcUnits,
        vol: nuteInfoObj.vol,
        sg: nuteInfoObj.sg,
        offset: nuteInfoObj.offset,
      },
    ]);
  }, [mainCalcUnits]);

  useEffect(() => {
    setMainCalcYeastInfo(selectedYeast);
    setMainCalcYeastBrand(selectedBrand);
  }, [selectedYeast, selectedBrand]);

  useEffect(() => {
    setMainCalcSugarBreak(oneThirdBreak);
  }, [oneThirdBreak]);

  useEffect(() => {
    setMainCalcYeastInfo({ ...mainCalcYeastInfo, yeastAmount: yeastAmount });
  }, [yeastAmount]);

  useEffect(() => {
    setMainCalcNuteInfo({
      totalGrams: [...gramsToAdd],
      perAdd: [...amountPerAddition],
      addNum: additions,
    });
  }, [gramsToAdd, amountPerAddition, additions]);

  return (
    <div className="flex flex-col items-center font-serif text-textColor md:text-2xl lg:text-3xl text-xs mb-[2rem]">
      <div className="component-div flex-row mt-12 mb-4">
        <Title header="Nutrient Calculator" />
        <div
          className="grid grid-cols-5 justify-items-center text-center"
          id="nuteTable"
        >
          <h2 className="my-2">Yeast Brand</h2>
          <h2 className="my-2">Strain</h2>
          <span className="my-2">
            <h2>Volume</h2>
            <select
              disabled={displayMainResults}
              onChange={setUnits}
              className="input w-11/12 my-2"
              value={mainCalcUnits}
            >
              <option value="gal">Gallons</option>
              <option value="liter">Liters</option>
            </select>
          </span>
          <div className="flex items-baseline justify-center my-2">
            <h2>Specific Gravity</h2>
            <Tooltip body={toolTipBody.nutrientSg} />
          </div>
          <div className="flex items-baseline justify-center my-2">
            <h2>Offset PPM</h2>
            <Tooltip body={toolTipBody.offsetPpm} />
          </div>

          <select
            value={selectedBrand}
            className="input w-11/12 my-2"
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedYeast([yeastObj[e.target.value][0]]);
            }}
          >
            {Object.keys(yeastObj).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            value={selectedYeast[0].name}
            className="input w-11/12 my-2"
            onChange={(e) => {
              setSelectedYeast(
                yeastObj[selectedBrand].filter((item) => {
                  return item.name == e.target.value;
                })
              );
              setNuteInfo([...nuteInfo]);
            }}
          >
            {yeastObj[selectedBrand]?.map((item) => {
              return (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <input
            step="0.1"
            onFocus={(e) => e.target.select()}
            required
            type="number"
            className="input w-2/4 my-2"
            id="volume"
            value={mainCalcVol}
            onChange={setVol}
          />
          <span className="flex space-x-[.25rem] ">
            <input
              step="0.001"
              onFocus={(e) => e.target.select()}
              required
              type="number"
              id="specificGravity"
              value={mainCalcSG}
              className="input w-[3.25rem] my-2 "
              onChange={setSg}
            />
            <p className="my-2 lg:text-base md:text-sm text-[.75em]">
              {displayBrix + " Brix"}
            </p>
          </span>
          <input
            step="5"
            onFocus={(e) => e.target.select()}
            required
            type="number"
            id="offsetPPM"
            className="input w-2/4 my-2"
            onChange={setOffset}
            value={mainCalcOffset}
          />

          <div className="flex items-baseline justify-center my-2">
            <h2>Nitrogen Requirement </h2>{" "}
            <Tooltip body={toolTipBody.nitrogenRequirements} />
          </div>
          <div className="flex items-baseline justify-center my-2">
            <h2>Preferred Schedule</h2>
            <Tooltip body={toolTipBody.preferredSchedule} />
          </div>
          <div className="flex items-baseline justify-center my-2">
            <h2>Target YAN</h2>
            <Tooltip body={toolTipBody.yan} />
          </div>
          <div className="flex items-baseline justify-center my-2">
            <h2>Number of Additions</h2>
            <Tooltip body={toolTipBody.numberOfAdditions} />
          </div>
          <div className="flex items-baseline justify-center my-2">
            <h2>Yeast Amount (g)</h2>
            <Tooltip body={toolTipBody.yeastAmount} />
          </div>

          <p className="lg:text-base md:text-sm text-xs my-2">
            {selectedYeastObj["Nitrogen Requirement"]}
          </p>
          <select
            className="input w-11/12 my-2 "
            id="nuteSchedule"
            value={preferredSchedule}
            onChange={(e) => {
              for (let key in maxGpl) {
                if (key == e.target.value) {
                  setGplInput(...[maxGpl[key]]);
                } else if (
                  Number(nuteInfoObj.sg) <= 1.08 &&
                  key == "oAndkLow" &&
                  key.includes(e.target.value)
                ) {
                  setGplInput(...[maxGpl[key]]);
                } else if (
                  Number(nuteInfoObj.sg) > 1.08 &&
                  Number(nuteInfoObj.sg) <= 1.11 &&
                  key == "oAndkMed" &&
                  key.includes(e.target.value)
                ) {
                  setGplInput(...[maxGpl[key]]);
                } else if (
                  Number(nuteInfoObj.sg) > 1.11 &&
                  key == "oAndkHigh" &&
                  key.includes(e.target.value)
                ) {
                  setGplInput(...[maxGpl[key]]);
                }
              }
              setPreferred(e.target.selectedOptions[0].innerText);
              setPreferredSchedule(e.target.value);
            }}
          >
            <option value="tbe">TBE (All Three)</option>
            <option value="tosna">TOSNA (Fermaid O Only)</option>
            <option value="justK">Fermaid K Only</option>
            <option value="dap">DAP Only</option>
            <option value="oAndk">Fermaid O & K</option>
            <option value="oAndDap">Fermaid O & DAP</option>
            <option value="kAndDap">Fermaid K & DAP</option>
          </select>
          <p className="lg:text-base md:text-sm text-[.75em] my-2">
            {targetYAN + " PPM"}
          </p>
          <select
            value={additions}
            className="input w-11/12 my-2 "
            onChange={(e) => {
              setAdditions(e.target.value);
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <input
            step="0.1"
            onFocus={(e) => e.target.select()}
            required
            type="number"
            value={yeastAmount ? yeastAmount : ""}
            className="input w-2/4 my-2"
            onChange={(e) => {
              setYeastAmount(e.target.value);
            }}
          />
          <p className="col-span-5 text-center mt-8 -mb-4">
            {!displayResults ? "Show More" : "Show Less"}
          </p>
          <RevealButton
            setDisplayResults={setDisplayResults}
            displayResults={displayResults}
            // calcPPM={calcPPM}
            span={"start-1 col-span-5"}
          />
        </div>
      </div>
      {displayResults ? (
        <NutrientDisplay
          targetYAN={targetYAN}
          gplInput={gplInput}
          setGplInput={setGplInput}
          ppmYanO={ppmYanO}
          ppmYanK={ppmYanK}
          ppmYanDap={ppmYanDap}
          addedYan={addedYan}
          gplToAdd={gplToAdd}
          gramsToAdd={gramsToAdd}
          amountPerAddition={amountPerAddition}
          setMultiplier={setMultiplier}
          yeastAmount={yeastAmount}
          oneThirdBreak={oneThirdBreak}
          remainingYan={remainingYan}
          setRemainingYan={setRemainingYan}
          gfType={gfType}
          setGFType={setGFType}
          goFermGrams={goFermGrams}
          setGoFermGrams={setGoFermGrams}
          goFermWater={goFermWater}
          setGoFermWater={setGoFermWater}
          Tooltip={Tooltip}
          toolTipBody={toolTipBody}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default NutrientCalc;
