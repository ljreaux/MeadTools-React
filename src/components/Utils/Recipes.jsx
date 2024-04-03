import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecipeById } from "./API";
import { setLocalStorage } from "./API";

export default function Recipes({ token }) {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ name: "" });
  const [ingredients, setIngredients] = useState([]);
  const [inputs, setInputs] = useState({});
  const { recipeId: id } = useParams();
  useEffect(() => {
    getRecipeById(id, token).then((res) => {
      setRecipe(res.recipe);
    });
  }, [id]);
  useEffect(() => {
    if (recipe.ingredients) {
      const storageInputs = JSON.parse(recipe.ingredients);
      setInputs(storageInputs);

      const display = Object.values(storageInputs).filter((line) => {
        return line.weight !== 0 && line.volume !== 0;
      });
      setIngredients(display);
    }
  }, [recipe]);
  function handleClick() {
    setLocalStorage(recipe);
    navigate(`/recipe/${id}`);
  }
  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Ingredients: </h2>
      <div className="grid grid-cols-4">
        <p>Name</p>
        <p>Brix</p>
        <p>Weight</p>
        <p>Volume</p>
        {ingredients?.map((ingredient, i) => {
          return (
            <div
              className="col-span-4 grid grid-cols-4"
              key={ingredient.name + i}
            >
              <p>{ingredient.name}</p>
              <p>{ingredient.brix}</p>
              <p>{ingredient.weight + recipe.units}</p>
              <p>{ingredient.volume + recipe.vol_units}</p>
            </div>
          );
        })}
      </div>
      <button className="btn" onClick={handleClick}>
        View Full Details
      </button>
    </div>
  );
}
