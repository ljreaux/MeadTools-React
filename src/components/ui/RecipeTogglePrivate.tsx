import { API_URL } from "@/main";
import { Switch } from "./switch";
import { useState } from "react";

function RecipeTogglePrivate({
  recipe,
}: {
  recipe: { id: number; user_id: number; name: string; private: boolean };
}) {
  const [isPrivate, setIsPrivate] = useState(recipe.private);
  async function togglePrivate(recipe: { private: boolean; id: number }) {
    await fetch(`${API_URL}/recipes/${recipe.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...recipe, private: !recipe.private }),
    })
      .then((res) => {
        if (res.ok) setIsPrivate(!isPrivate);
        else throw new Error("Error changing privacy settings");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="grid items-center justify-center gap-2 text-center">
      <p>Private Recipe?</p>
      <Switch
        checked={isPrivate}
        onCheckedChange={() => {
          togglePrivate(recipe);
        }}
      />
    </div>
  );
}

export default RecipeTogglePrivate;
