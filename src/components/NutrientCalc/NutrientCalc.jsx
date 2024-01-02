import Title from "../Title";
import NutrientDisplay from "./NutrientDisplay";
import RevealButton from "./RevealButton";
import { useState, useEffect } from "react";

function NutrientCalc() {
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
  const [gplInput, setGplInput] = useState([...maxGpl.tbe]);
  const ogBrix = (OG) => {
    return -668.962 + 1262.45 * OG - 776.43 * OG ** 2 + 182.94 * OG ** 3;
  };
  const [displayBrix, setDisplayBrix] = useState("0");
  const [yeastNames, setYeastNames] = useState([{}]);
  const [selectedBrand, setSelectedBrand] = useState([
    {
      selectedBrand: "Lalvin",
    },
  ]);
  const selectedBrandObj = selectedBrand[0];
  const [selectedYeast, setSelectedYeast] = useState([
    {
      "Nitrogen Requirement": "Low",
    },
  ]);
  const selectedYeastObj = selectedYeast[0];
  const yeastObj = yeastNames[0];
  const yeasts = "/src/yeast.json";
  useEffect(() => {
    getYeasts();
  }, []);

  async function getYeasts() {
    const response = await fetch(yeasts);
    const data = await response.json();

    setYeastNames([data]);
  }

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
    determineYeastAmount();
    calcPPM();
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
    determineYeastAmount();
    calcPPM();
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
    determineYeastAmount();
    setDisplayBrix(ogBrix(e.target.value).toFixed(2));
    calcPPM();
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
    calcPPM();
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
  const [targetYAN, setTargetYAN] = useState(0);
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

  return (
    <div className="text-textColor md:text-2xl lg:text-3xl text-sm font-serif flex items-center flex-col mb-[2rem]">
      <div className="mt-12 mb-4 component-div flex-row">
        <Title header="Nutrient Calculator" />
        <div
          className="grid grid-cols-5 text-center justify-items-center"
          id="nuteTable"
        >
          <h2 className="my-2">Yeast Brand</h2>
          <h2 className="my-2">Strain</h2>
          <span className="my-2">
            <h2>Volume</h2>
            <select onChange={setUnits} className="my-2 nute-select">
              <option value="gal">Gallons</option>
              <option value="liter">Liters</option>
            </select>
          </span>
          <h2 className="my-2">Specific Gravity</h2>
          <h2 className="my-2">Offset PPM</h2>

          <select
            className="my-2 nute-select"
            onChange={(e) => {
              setSelectedBrand([
                {
                  selectedBrand: e.target.value,
                },
              ]);
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
            className="my-2 nute-select"
            onChange={(e) => {
              setSelectedYeast(
                yeastObj[`${selectedBrandObj.selectedBrand}`].filter((item) => {
                  return item.name == e.target.value;
                })
              );
            }}
          >
            {yeastObj[`${selectedBrandObj.selectedBrand}`]?.map((item) => {
              return (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <input className="nute-input my-2" id="volume" onChange={setVol} />
          <span className="flex space-x-2 ">
            <input
              id="specificGravity"
              className="nute-input my-2"
              onChange={setSg}
            />
            <p className="my-2 text-base">{displayBrix + " Brix"}</p>
          </span>
          <input
            id="offsetPPM"
            className="nute-input my-2"
            onChange={setOffset}
            defaultValue={0}
          />

          <h2 className="my-2">Nitrogen Requirement</h2>
          <h2 className="my-2">Preferred Schedule</h2>
          <h2 className="my-2">Target YAN</h2>
          <h2 className="my-2">Number of Additions</h2>
          <h2 className="my-2">Yeast Amount (g)</h2>

          <p className="my-2 text-base">
            {selectedYeastObj["Nitrogen Requirement"]}
          </p>
          <select
            className="my-2 nute-select"
            id="nuteSchedule"
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
          <p className="my-2 text-base">{targetYAN + " PPM"}</p>
          <select className="my-2 nute-select">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <input
            value={yeastAmount ? yeastAmount : ""}
            type="text"
            className="nute-input my-2"
            onChange={(e) => {
              setYeastAmount(e.target.value);
            }}
          />
          <RevealButton
            setDisplayResults={setDisplayResults}
            displayResults={displayResults}
            calcPPM={calcPPM}
            span={"start-1 col-span-5"}
          />
        </div>
      </div>
      {displayResults ? (
        <NutrientDisplay
          targetYAN={targetYAN}
          gplInput={gplInput}
          setGplInput={setGplInput}
        />
      ) : null}
    </div>
  );
}
export default NutrientCalc;
