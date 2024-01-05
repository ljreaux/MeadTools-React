import Title from "../Title";
import IngredientLine from "./IngredientLine";
import { useEffect, useState } from "react";
import { MdExpandCircleDown } from "react-icons/md";
import NutrientCalc from "../NutrientCalc/NutrientCalc";
import Stabilizers from "./Stabilizers";
import NewLines from "./NewLines";

function Home() {
  const [storedInput, setStoredInput] = useState({
    input1: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input2: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input3: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input4: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input5: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input6: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input7: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input8: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input9: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input10: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input11: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input12: {
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
  });

  const [displayResults, setDisplayResults] = useState(false);

  const [rowCount, setRowCount] = useState(0);
  const [units, setUnits] = useState("lbs");
  const [volUnits, setVolUnits] = useState("gal");

  const [totalVolume, setTotalVolume] = useState(0);
  const [OG, setOG] = useState(1);
  const [FG, setFG] = useState(0.996);
  const [abv, setAbv] = useState(0);
  const [delle, setDelle] = useState(0);

  const [mainCalcVol, setMainCalcVol] = useState(null);
  const [mainCalcSG, setMainCalcSG] = useState(null);
  const [mainCalcOffset, setMainCalcOffset] = useState(0);

  const abvCalc = (OG, FG) => {
    const OE = -668.962 + 1262.45 * OG - 776.43 * OG ** 2 + 182.94 * OG ** 3;
    const AE = -668.962 + 1262.45 * FG - 776.43 * FG ** 2 + 182.94 * FG ** 3;
    const q = 0.22 + 0.001 * OE;
    const RE = (q * OE + AE) / (1 + q);
    const ABW = (OE - RE) / (2.0665 - 0.010665 * OE);
    const ABV = ABW * (FG / 0.794);

    return ABV.toFixed(2);
  };

  const toBrix = (value) => {
    return (
      -668.962 + 1262.45 * value - 776.43 * value ** 2 + 182.94 * value ** 3
    );
  };

  function totalVolumeFunc() {
    const volumeArr = [];
    const volumeTimesSugarArr = [];
    const offsetArr = [];

    for (let key in storedInput) {
      const input = storedInput[`${key}`];
      const toSG =
        1.00001 +
        0.0038661 * input.brix +
        1.3488 * 10 ** -5 * input.brix ** 2 +
        4.3074 * 10 ** -8 * input.brix ** 3;

      volumeArr.push(Number(input.volume));
      volumeTimesSugarArr.push(input.volume * toSG);
      if (input.cat == "fruit") {
        if (units == "lbs") {
          offsetArr.push(Number(input.weight));
        } else {
          offsetArr.push(input.weight * 2.20462);
        }
      }
    }
    let initialVol = 0;
    const addedVol = volumeArr.reduce((acc, cur) => acc + cur, initialVol);

    let initialNum = 0;
    const addedSug = volumeTimesSugarArr.reduce(
      (acc, cur) => acc + cur,
      initialNum
    );

    let initialOs = 0;
    const addedLbs = offsetArr.reduce((acc, cur) => acc + cur, initialOs);

    let volInGal = 0;
    if (volUnits == "gal") {
      volInGal = addedVol;
    } else {
      volInGal = addedVol / 3.785;
    }

    const ppmOs = (addedLbs / volInGal) * 25;

    setMainCalcOffset(ppmOs.toFixed(0));
    setOG(addedSug / addedVol);
    setTotalVolume(addedVol);
    const alcohol = abvCalc(addedSug / addedVol, FG);
    setAbv(alcohol);
    const fgBrix = toBrix(FG);
    const du = fgBrix + 4.5 * alcohol;
    setDelle(du);
  }

  useEffect(() => {
    const alcohol = abvCalc(OG, FG);
    setAbv(alcohol);
    const fgBrix = toBrix(FG);
    const du = fgBrix + 4.5 * alcohol;
    setDelle(du);
  }, [OG, FG]);

  useEffect(() => {
    setMainCalcVol(totalVolume);
    setMainCalcSG((OG - FG + 1).toFixed(3));
  }, [totalVolume, OG, FG]);

  return (
    <div className="text-textColor md:text-2xl lg:text-3xl text-sm font-serif max-h-screen flex items-center flex-col ">
      <div className="mt-12 component-div overflow-visible flex-row">
        <Title header="Recipe Builder" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            totalVolumeFunc();
          }}
          className="grid grid-cols-4 place-items-center text-center"
          id="recipeBuilder"
        >
          <h2>Ingredient</h2>
          <span>
            <h2>Amount to Add in</h2>
            <select
              className="nute-select"
              onChange={(e) => {
                setUnits(e.target.value);
              }}
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </span>
          <h2>Sugar Percentage (Brix)</h2>
          <span>
            <h2>Total Volume</h2>
            <select
              className="nute-select"
              onChange={(e) => {
                setVolUnits(e.target.value);
              }}
            >
              <option value="gal">Gallons</option>
              <option value="liter">Liters</option>
            </select>
          </span>
          <IngredientLine
            volUnits={volUnits}
            units={units}
            defaultSugar={79.6}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input1"
          />
          <IngredientLine
            volUnits={volUnits}
            units={units}
            defaultSugar={79.6}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input2"
          />
          <NewLines
            volUnits={volUnits}
            units={units}
            rowCount={rowCount}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
          />
          {/* {ingredientLines.map((item, index) => {
            if (index < 9) {
              return item;
            }
          })} */}

          {rowCount <= 8 ? (
            <h2 className="col-start-1 col-span-4 pt-4">
              Add Another Ingredient Row?
            </h2>
          ) : (
            <h2 className="col-start-1 col-span-4 pt-4">
              Cannot add any more rows.
            </h2>
          )}
          <button
            onClick={() => {
              setRowCount(rowCount + 1);
            }}
            className={`btn text-2xl text-sidebar hover:text-textColor col-span-4 group w-1/4 flex flex-col  items-center transition-colors my-8`}
            disabled={rowCount >= 9}
          >
            {" "}
            <MdExpandCircleDown className="group-hover:scale-125 " />
          </button>
          <IngredientLine
            volUnits={volUnits}
            units={units}
            optionValue={"Water"}
            defaultSugar={"0"}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input11"
          />
          <IngredientLine
            volUnits={volUnits}
            units={units}
            optionValue={"Juice"}
            defaultSugar={12}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input12"
          />
          <button
            type="submit"
            className="btn col-span-4 mb-4"
            onClick={() => {
              setDisplayResults(true);
            }}
          >
            Submit
          </button>
        </form>
        {displayResults ? (
          <div className="grid grid-cols-4 py-4 text-center place-items-center ">
            <h2>Estimated OG:</h2>
            <h2>Estimated FG:</h2>
            <h2>ABV:</h2>
            <h2>Delle Units:</h2>

            <p>
              {isNaN(OG) || OG > 1.22 ? "Enter a valid input" : OG.toFixed(3)}
            </p>
            <input
              className="nute-input"
              value={FG}
              onChange={(e) => setFG(e.target.value)}
            />
            <p>{`${Number(abv).toFixed(2)}% ABV`}</p>
            <p>{`${Number(delle).toFixed(0)} Delle Units`} </p>
            <span>
              <h1>Total Volume</h1>
              <p>{`${totalVolume.toFixed(3)} ${volUnits}`}</p>
            </span>
          </div>
        ) : null}
      </div>{" "}
      <div className="mb-[5%] h-full w-full ">
        <NutrientCalc
          mainCalcVol={mainCalcVol}
          setMainCalcVol={setMainCalcVol}
          mainCalcSG={mainCalcSG}
          setMainCalcSG={setMainCalcSG}
          mainCalcOffset={mainCalcOffset}
          setMainCalcOffset={setMainCalcOffset}
        ></NutrientCalc>
      </div>
      <div className=" h-full w-full flex items-center flex-col">
        <Stabilizers
          volUnits={volUnits}
          abv={abv}
          totalVolume={totalVolume}
        ></Stabilizers>
      </div>
    </div>
  );
}
export default Home;
