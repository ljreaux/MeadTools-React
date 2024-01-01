import { useState, useEffect } from "react";

function IngredientLine({ optionValue, defaultSugar }) {
  const [ingredients, setIngredients] = useState();
  async function getIngredients() {
    const response = await fetch("src/fermentables.json");
    const json = await response.json();
    setIngredients(json);
  }
  useEffect(() => {
    getIngredients();
  }, []);

  // const [selectedIngredient, setSelectedIngredient] = useState("Honey");
  const [ingredientDetails, setIngredientDetails] = useState();

  function ingredientChange(e) {
    const found = ingredients.ingredients.filter(
      (ingredient) => ingredient.name == e.target.value
    );
    setIngredientDetails(found);
  }

  // function findIngredient() {

  //   console.log(found[0]);
  // }

  return (
    <>
      <select className="my-4 nute-select" onChange={ingredientChange}>
        <option value={optionValue}>{optionValue}</option>
        {ingredients
          ? ingredients.ingredients.map((ingredient) => {
              return (
                <option key={ingredient.name} value={ingredient.name}>
                  {ingredient.name}
                </option>
              );
            })
          : null}
      </select>
      <input className="my-4 nute-input" />
      <input
        className="my-4 nute-input"
        defaultValue={defaultSugar || null}
        value={
          ingredientDetails && ingredientDetails[0]
            ? ingredientDetails[0].sugarContent
            : null
        }
      />
      <input className="my-4 nute-input" />
      {/* <p>{selectedIngredient}</p> */}
    </>
  );
}
export default IngredientLine;
