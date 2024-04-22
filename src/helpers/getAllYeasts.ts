import { API_URL } from "../main";

export default async function getAllYeasts() {
  const result = await fetch(`${API_URL}/yeasts`);
  const yeasts = await result.json();
  return yeasts;
}
