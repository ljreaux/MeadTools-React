export default function IngredientOptions({
  ingredientChange,
  optionValue,
  ingredients,
}) {
  return (
    <select className="input w-11/12 my-4 " onChange={ingredientChange}>
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
  );
}
