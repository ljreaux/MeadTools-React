import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";

import Title from "../Title";
import IngredientLine from "./IngredientLine";
import NewLines from "./NewLines";
import { FaPlusSquare } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { MdPictureAsPdf } from "react-icons/md";
import NutrientCalc from "../NutrientCalc/NutrientCalc";
import Stabilizers from "./Stabilizers";
import PDF from "../PDF";
import Additives from "../Additives";

function Home() {
  const [preferred, setPreferred] = useState("TBE (All Three)");
  const [gfType, setGFType] = useState("go-ferm");
  const [goFermGrams, setGoFermGrams] = useState(0);
  const [goFermWater, setGoFermWater] = useState(0);
  const [remainingYan, setRemainingYan] = useState(0);
  const [mainCalcNuteInfo, setMainCalcNuteInfo] = useState({
    totalGrams: [0, 0, 0],
    perAdd: [0, 0, 0],
    addNum: 1,
  });
  // stores input from all ingredient lines for final calcs
  const [storedInput, setStoredInput] = useState({
    input1: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input2: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input3: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input4: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input5: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input6: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input7: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input8: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input9: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input10: {
      name: "Honey",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input11: {
      name: "Water",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
    input12: {
      name: "Water",
      weight: 0,
      brix: 79.6,
      volume: 0,
      cat: "sugar",
    },
  });

  const [extraIngredients, setExtraIngredients] = useState({
    input1: {
      name: "",
      amount: 0,
      units: "g",
    },
    input2: {
      name: "",
      amount: 0,
      units: "g",
    },
    input3: {
      name: "",
      amount: 0,
      units: "g",
    },
    input4: {
      name: "",
      amount: 0,
      units: "g",
    },
    input5: {
      name: "",
      amount: 0,
      units: "g",
    },
  });

  //  used to reveal new ingredient lines
  const [displayMainResults, setDisplayMainResults] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [units, setUnits] = useState("lbs");
  const [volUnits, setVolUnits] = useState("gal");

  // final calculation data
  const [totalVolume, setTotalVolume] = useState(0);
  const [OG, setOG] = useState(1);
  const [FG, setFG] = useState(0.996);
  const [abv, setAbv] = useState(0);
  const [delle, setDelle] = useState(0);
  const [sorbAmount, setSorbAmount] = useState("");
  const [sulfiteAmount, setSulfiteAmount] = useState("");

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

  // nutrient calc data
  const [mainCalcVol, setMainCalcVol] = useState(0);
  const [mainCalcSG, setMainCalcSG] = useState(0);
  const [mainCalcOffset, setMainCalcOffset] = useState(0);
  const [mainCalcUnits, setMainCalcUnits] = useState("gal");
  const [mainCalcSugarBreak, setMainCalcSugarBreak] = useState(1);
  const [mainCalcYeastInfo, setMainCalcYeastInfo] = useState([
    {
      name: "18-2007",
      "Nitrogen Requirement": "Low",
      "ABV Tolerance": 15,
      LowTemp: 50,
      HighTemp: 90,
    },
  ]);

  // onSubmit function
  function totalVolumeFunc() {
    // arrays used for gravity calculation
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
      // calculating amount of fruit for offset
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

    // checks units for offset of 25ppm per lb per gallon
    let volInGal = 0;
    if (volUnits == "gal") {
      volInGal = addedVol;
    } else {
      volInGal = addedVol / 3.785;
    }

    const ppmOs = (addedLbs / volInGal) * 25;

    // sets state for all calculations
    setMainCalcOffset(ppmOs.toFixed(0));
    setOG(addedSug / addedVol);
    setTotalVolume(addedVol);
    const alcohol = abvCalc(addedSug / addedVol, FG);
    setAbv(alcohol);
    const fgBrix = toBrix(FG);
    const du = fgBrix + 4.5 * alcohol;
    setDelle(du);
  }

  // calculates abv when data changes
  useEffect(() => {
    const alcohol = abvCalc(OG, FG);
    setAbv(alcohol);
    const fgBrix = toBrix(FG);
    const du = fgBrix + 4.5 * alcohol;
    setDelle(du);
  }, [OG, FG]);

  // changes data in nutrient calc based of ingredient calc
  useEffect(() => {
    setMainCalcVol(totalVolume);
    setMainCalcSG((OG - FG + 1).toFixed(3));
  }, [totalVolume, OG, FG]);

  const componentRef = useRef();

  return (
    <div className="max-h-screen flex items-center flex-col font-serif md:text-2xl lg:text-3xl text-textColor text-sm">
      <div className="component-div flex-row mt-12 ">
        <Title header="Recipe Builder" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            totalVolumeFunc();
          }}
          className="grid grid-cols-4 place-items-center text-center"
          id="recipeBuilder"
        >
          <h2>Ingredients</h2>
          <span>
            <h2>Weight</h2>
            <select
              className="input w-11/12"
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
            <h2>Volume</h2>
            <select
              className="input w-11/12"
              onChange={(e) => {
                setVolUnits(e.target.value);
                setMainCalcUnits(e.target.value);
              }}
            >
              <option value="gal">Gallons</option>
              <option value="liter">Liters</option>
            </select>
          </span>{" "}
          <IngredientLine
            volUnits={volUnits}
            units={units}
            optionValue={"liquid"}
            defaultSugar={"0"}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input11"
            initialIngredient={"Water"}
          />
          <IngredientLine
            volUnits={volUnits}
            units={units}
            optionValue={"liquid"}
            defaultSugar={"0"}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input12"
            initialIngredient={"Water"}
          />
          <div className="col-span-5 w-11/12 h-fit border-dotted border-b-[1px] border-textColor my-2"></div>
          <IngredientLine
            volUnits={volUnits}
            units={units}
            defaultSugar={79.6}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input1"
            initialIngredient={"Honey"}
          />
          <IngredientLine
            volUnits={volUnits}
            units={units}
            defaultSugar={79.6}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
            inputNum="input2"
            initialIngredient={"Honey"}
          />
          {/* new lines added when button is pushed */}
          <NewLines
            volUnits={volUnits}
            units={units}
            rowCount={rowCount}
            storedInput={storedInput}
            setStoredInput={setStoredInput}
          />
          {/* checks row count and displays when max rows is reached */}
          {rowCount <= 8 ? (
            <h2 className="col-start-1 col-span-4 pt-4">
              Add Another Ingredient Row?
            </h2>
          ) : (
            <h2 className="col-start-1 col-span-4 pt-4">
              Cannot add any more rows.
            </h2>
          )}
          <div className="btn bg-background rounded-2xl px-2 py-[.25rem] col-span-4 items-center flex justify-center gap-8 my-8 w-1/4 group">
            <button
              type="button"
              onClick={() => {
                setRowCount(rowCount + 1);
              }}
              className={`group w-fit text-2xl text-sidebar hover:text-textColor transition-colors`}
              // disabled when 10 rows are reached
              disabled={rowCount >= 9}
            >
              <FaPlusSquare className="group-hover:scale-125 group-hover:text-textColor disabled:cursor-not-allowed" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (rowCount > 0) setRowCount(rowCount - 1);
              }}
              className={`group w-fit text-2xl text-sidebar hover:text-textColor transition-colors disabled:cursor-not-allowed`}
              // disabled when 10 rows are reached
              disabled={rowCount <= 0}
            >
              <FaMinusSquare className="group-hover:scale-125 group-hover:text-textColor" />
            </button>
          </div>
          <button
            type="submit"
            className="btn col-span-4 mb-4"
            onClick={() => {
              setDisplayMainResults(true);
            }}
          >
            Submit
          </button>
        </form>
        {displayMainResults ? (
          <div className="grid grid-cols-4 place-items-center text-center py-4">
            <h2>Estimated OG:</h2>
            <h2>Estimated FG:</h2>
            <h2>ABV:</h2>
            <h2>Delle Units:</h2>

            <p>
              {isNaN(OG) || OG > 1.22 ? "Enter a valid input" : OG.toFixed(3)}
            </p>
            <input
              step="0.001"
              type="number"
              required
              className="input w-2/4"
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
      </div>
      <div className="w-full h-full mb-[5%]">
        <NutrientCalc
          mainCalcVol={mainCalcVol}
          setMainCalcVol={setMainCalcVol}
          mainCalcSG={mainCalcSG}
          setMainCalcSG={setMainCalcSG}
          mainCalcOffset={mainCalcOffset}
          setMainCalcOffset={setMainCalcOffset}
          mainCalcUnits={mainCalcUnits}
          setMainCalcUnits={setMainCalcUnits}
          mainCalcYeastInfo={mainCalcYeastInfo}
          setMainCalcYeastInfo={setMainCalcYeastInfo}
          setMainCalcSugarBreak={setMainCalcSugarBreak}
          displayMainResults={displayMainResults}
          setMainCalcNuteInfo={setMainCalcNuteInfo}
          remainingYan={remainingYan}
          setRemainingYan={setRemainingYan}
          gfType={gfType}
          setGFType={setGFType}
          goFermGrams={goFermGrams}
          setGoFermGrams={setGoFermGrams}
          goFermWater={goFermWater}
          setGoFermWater={setGoFermWater}
          setPreferred={setPreferred}
        ></NutrientCalc>
      </div>
      <div className="w-full h-full flex flex-col items-center">
        <Stabilizers
          volUnits={volUnits}
          abv={abv}
          totalVolume={totalVolume}
          sorbAmount={sorbAmount}
          setSorbAmount={setSorbAmount}
          sulfiteAmount={sulfiteAmount}
          setSulfiteAmount={setSulfiteAmount}
        ></Stabilizers>
        <Additives
          extraIngredients={extraIngredients}
          setExtraIngredients={setExtraIngredients}
        ></Additives>
        <div className="flex flex-col justify-center">
          <ReactToPrint
            trigger={() => (
              <button className="btn my-[6rem] hover:border-textColor flex flex-col text-center justify-center items-center">
                Get Recipe <MdPictureAsPdf />
              </button>
            )}
            content={() => componentRef.current}
          />
          <div className="hidden">
            <PDF
              ref={componentRef}
              totalVolume={totalVolume}
              volUnits={volUnits}
              units={units}
              OG={OG}
              FG={FG}
              abv={abv}
              delle={delle}
              OGBrix={toBrix(OG)}
              FGBrix={toBrix(FG)}
              yeastObj={mainCalcYeastInfo}
              mainCalcSugarBreak={mainCalcSugarBreak}
              sorbAmount={sorbAmount}
              sulfiteAmount={sulfiteAmount}
              mainCalcNuteInfo={mainCalcNuteInfo}
              remainingYan={remainingYan}
              gfType={gfType}
              goFermGrams={goFermGrams}
              goFermWater={goFermWater}
              preferred={preferred}
              storedInput={storedInput}
              extraIngredients={extraIngredients}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
