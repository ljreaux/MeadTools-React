import { API_URL } from "../main";

export default async function getAllYeasts() {
  const result = await fetch(`${API_URL}/yeasts`);
  const yeasts = await result.json();
  return yeasts;
}

export const deleteRecipe = async (recipeId: number, token: string | null) => {
  if (token) {
    const result = await fetch(`${API_URL}/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const deleted = await result.json();
    return deleted;
  }
  return { message: "You must be logged in to delete a recipe." };
};
