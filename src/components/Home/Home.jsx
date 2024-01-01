import Title from "../Title";
import IngredientLine from "./IngredientLine";
import { useState } from "react";
import { MdExpandCircleDown } from "react-icons/md";
import NutrientCalc from "../NutrientCalc/NutrientCalc";
// import Stabilizers from "./Stabilizers";

function Home() {
  const [displayResults, setDisplayResults] = useState(false);

  const [rowCount, setRowCount] = useState(2);

  const [ingredientLines, setIngredientLines] = useState([]);
  // function addRows() {
  //   return <IngredientLine />;
  // }

  return (
    <div className="text-textColor md:text-2xl lg:text-3xl text-sm font-serif max-h-screen flex items-center flex-col">
      <div className="mt-12 component-div overflow-visible flex-row">
        <Title header="Recipe Builder" />
        <div
          className="grid grid-cols-4 place-items-center text-center"
          id="recipeBuilder"
        >
          <h2>Ingredient</h2>
          <span>
            <h2>Amount to Add in</h2>
            <select className="nute-select">
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </span>
          <h2>Sugar Percentage (Brix)</h2>
          <span>
            <h2>Total Volume</h2>
            <select className="nute-select">
              <option value="gal">Gallons</option>
              <option value="liter">Liters</option>
            </select>
          </span>
          <IngredientLine defaultSugar={79.6} />
          <IngredientLine defaultSugar={79.6} />
          {ingredientLines.map((item, index) => {
            if (index < 9) {
              return item;
            }
          })}
          {rowCount <= 9 ? (
            <h2 className="col-start-1 col-span-4 pt-4">
              Add Another Ingredient Row?
            </h2>
          ) : null}

          <button
            onClick={() => {
              if (rowCount <= 9) {
                setIngredientLines([
                  ...ingredientLines,
                  <IngredientLine key={rowCount} defaultSugar={79.6} />,
                ]);

                setRowCount(rowCount + 1);
              } else {
                setIngredientLines([
                  ...ingredientLines,
                  <p key={-rowCount} className="col-span-4">
                    Cannot Add Any More Lines
                  </p>,
                ]);
              }
            }}
            className={`btn text-2xl text-sidebar hover:text-textColor col-span-4 group w-1/4 flex flex-col  items-center transition-colors my-8`}
          >
            {" "}
            <MdExpandCircleDown className="group-hover:scale-125 " />
          </button>
          <IngredientLine optionValue={"Water"} defaultSugar={"0"} />
          <IngredientLine optionValue={"Juice"} defaultSugar={12} />
          <button
            className="btn col-span-4 mb-4"
            onClick={() => {
              setDisplayResults(!displayResults);
            }}
          >
            Submit
          </button>
        </div>
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
          </div>
        ) : null}
      </div>{" "}
      <div className="">
        <NutrientCalc></NutrientCalc>
      </div>
    </div>
  );
}
export default Home;
