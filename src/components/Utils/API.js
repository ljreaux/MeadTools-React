const API_URL = "http://localhost:3000/api";

export async function getAllIngredients() {
  const response = await fetch(`${API_URL}/ingredients`);
  const data = await response.json();
  return data;
}
