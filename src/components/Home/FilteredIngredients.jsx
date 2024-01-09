import { useEffect } from "react";
export default function FilteredIngredients({ ingredientChange, ingredients }) {
  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);
  return (
    <select className="input w-11/12 my-4 " onChange={ingredientChange}>
      {ingredients
        ? ingredients.ingredients.map((ingredient) => {
            return ingredient.category == "juice" ||
              ingredient.category == "water" ? (
              <option key={ingredient.name} value={ingredient.name}>
                {ingredient.name}
              </option>
            ) : null;
          })
        : null}
    </select>
  );
}
