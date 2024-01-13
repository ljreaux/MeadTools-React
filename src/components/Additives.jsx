import AdditiveLine from "./AdditiveLine";
import { useState } from "react";
import NewAddLines from "./NewAddLines";
import { FaPlusSquare } from "react-icons/fa";

export default function Additives({ setExtraIngredients, inputNum }) {
  const [addRowCount, setAddRowCount] = useState(0);
  return (
    <div className="component-div">
      <form className="w-full grid grid-cols-3 gap-x-4 items-center justify-center text-center">
        <h1 className="col-span-3 py-4">
          Additives and Additional Ingredients
        </h1>
        <h3>Additional </h3>
        <h3>Amount</h3>
        <h3>Units</h3>
        <AdditiveLine
          inputNum={"input1"}
          setExtraIngredients={setExtraIngredients}
        />
        <NewAddLines
          addRowCount={addRowCount}
          setExtraIngredients={setExtraIngredients}
          inputNum={inputNum}
        />
        <div className="col-span-3 w-full flex items-center justify-center text-center">
          <button
            type="button"
            onClick={() => {
              setAddRowCount(addRowCount + 1);
            }}
            className={`btn group w-1/4 flex flex-col items-center text-2xl text-sidebar hover:text-textColor my-8 transition-colors`}
            // disabled when 10 rows are reached
            disabled={addRowCount >= 4}
          >
            <FaPlusSquare className="group-hover:scale-125" />
          </button>
        </div>
      </form>
    </div>
  );
}
