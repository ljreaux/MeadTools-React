import { useEffect, useState } from "react";
import { createRecipe } from "../Utils/API";
import { useNavigate } from "react-router-dom";

export default function StoreRecipe({ token, recipe: recipeData, setRecipe }) {
  const [recipeName, setRecipeName] = useState("");

  const navigate = useNavigate();
  const SignInButton = () => {
    return (
      <button
        onClick={() => navigate("/login")}
        className="btn my-[4rem] hover:border-textColor flex flex-col text-center justify-center items-center"
      >
        Sign in To save Recipe
      </button>
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    const recipe = {
      ...recipeData,
      name: recipeName,
    };
    async function createNew() {
      await createRecipe(token, recipe);
      navigate("/account");
    }
    createNew();
  }

  return (
    <div>
      {token ? (
        <form onSubmit={handleSubmit}>
          <h3>Save Your Recipe?</h3>
          <label htmlFor="recipeName"></label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
          <button className="btn my-[4rem] hover:border-textColor flex flex-col text-center justify-center items-center">
            Save Recipe
          </button>
        </form>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
