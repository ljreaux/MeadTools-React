import Title from "../Title";
import IngredientLine from "./IngredientLine";
import { useState } from "react";
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
    },
    input2: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input3: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input4: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input5: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input6: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input7: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input8: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input9: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
    input10: {
      weight: 0,
      brix: 79.6,
      volume: 0,
    },
  });

  const [displayResults, setDisplayResults] = useState(false);

  const [rowCount, setRowCount] = useState(0);

  const [ingredientLines, setIngredientLines] = useState([]);
  const [units, setUnits] = useState("lbs");
  const [volUnits, setVolUnits] = useState("gal");

  const [totalVolume, setTotalVolume] = useState(0);

  function totalVolumeFunc(e) {
    const targetArr = [...e.target];

    const filteredArr = targetArr.filter((item) => {
      return item.className.indexOf("vol") != -1;
    });
    const valueArr = filteredArr.map((item) => item.value);
    const initialValue = 0;

    setTotalVolume(
      valueArr
        .reduce((acc, cur) => {
          return Number(acc) + Number(cur);
        }, initialValue)
        .toFixed(3)
    );
  }
  return (
    <div className="text-textColor md:text-2xl lg:text-3xl text-sm font-serif max-h-screen flex items-center flex-col ">
      <div className="mt-12 component-div overflow-visible flex-row">
        <Title header="Recipe Builder" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            totalVolumeFunc(e);
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
              setDisplayResults(!displayResults);
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

            <p>1.1</p>
            <input className="nute-input" />
            <p>12% ABV</p>
            <p>45 Delle Units</p>
            <span>
              <h1>Total Volume</h1>
              <p>{`${totalVolume} ${volUnits}`}</p>
            </span>
          </div>
        ) : null}
      </div>{" "}
      <div className="mb-[5%] h-full w-full ">
        <NutrientCalc></NutrientCalc>
      </div>
      <div className=" h-full w-full flex items-center flex-col">
        <Stabilizers></Stabilizers>
      </div>
    </div>
  );
}
export default Home;
