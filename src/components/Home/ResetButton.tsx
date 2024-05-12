import { RecipeData } from "../../App";
import useLocalStorage from "../../hooks/useLocalStorage";
import { FormData } from "../Nutrients/NutrientCalc";
import { initialIngredients } from "./initialIngredients";
import { initialData } from "../Nutrients/initialData";
import { useTranslation } from "react-i18next";
export default function ResetButton({
  setRecipeData,
  setData,
  recipeData,
  setPrimaryNotes,
  setSecondaryNotes,
}: {
  setRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  recipeData: RecipeData;
  setPrimaryNotes: React.Dispatch<React.SetStateAction<string[][]>>;
  setSecondaryNotes: React.Dispatch<React.SetStateAction<string[][]>>;
}) {
  const { t } = useTranslation();
  const [isMetric] = useLocalStorage("metric", false);
  const resetRecipe = () => {
    setRecipeData({
      ingredients: initialIngredients,
      OG: 0,
      volume: 0,
      ABV: 0,
      FG: 0.996,
      offset: 0,
      units: {
        weight: isMetric ? "kg" : "lbs",
        volume: isMetric ? "liter" : "gal",
      },
      additives: [{ name: "", amount: 0, unit: "g" }],
    });
    setData({
      ...initialData,
      inputs: {
        ...initialData.inputs,
        volume: recipeData.volume,
        sg: recipeData.OG - recipeData.FG + 1,
        offset: recipeData.offset,
      },
      selected: {
        ...initialData.selected,
        volumeUnits: recipeData.units.volume,
      },
    });
    setPrimaryNotes([["", ""]]);
    setSecondaryNotes([["", ""]]);
  };
  const handleClick = () => {
    const confirm = window.confirm(t("recipeBuilder.resetConfirmation"));
    confirm && resetRecipe();
  };
  return (
    <button
      className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4 mb-[3rem]"
      onClick={handleClick}
    >
      {t("recipeBuilder.reset")}
    </button>
  );
}
