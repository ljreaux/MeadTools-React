export default function IngredientOptions({
  ingredientChange,
  optionValue,
  ingredients,
}) {
  return (
    <select
      className="input w-11/12 my-2 "
      onChange={ingredientChange}
      value={optionValue}
    >
      {ingredients
        ? ingredients.map((ingredient) => {
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
