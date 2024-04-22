import { API_URL } from "../main";

export default async function getAllIngredients() {
  const result = await fetch(`${API_URL}/ingredients`);
  const ingredients = await result.json();
  return ingredients;
}
