export default function FilteredIngredients({
  ingredientChange,
  ingredients,
  optionValue,
}) {
  return (
    <select
      className="input w-11/12 my-2 "
      onChange={ingredientChange}
      value={optionValue}
    >
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
