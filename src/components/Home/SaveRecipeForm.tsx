import { useState } from "react";
import Title from "../Title";
import { RecipeData } from "../../App";
import { FormData } from "../Nutrients/NutrientCalc";
import { API_URL } from "../../main";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PropsType {
  primaryNotes: string[][] | string[];
  secondaryNotes: string[][] | string[];
  recipeData: RecipeData;
  nutrientData: FormData;
  nuteInfo: null | {
    ppmYan: number[];
    totalGrams: number[];
    perAddition: number[];
    totalYan: number;
    remainingYan: number;
    gf: {
      gf: number;
      gfWater: number;
    };
  };
  yanContribution: number[] | string;
  yanFromSource: number[] | null | string;
  advanced: boolean;
}

export default function SaveRecipeForm(props: PropsType) {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const { t } = useTranslation();
  return (
    <form
      className="w-11/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 mb-8 mt-24 aspect-video gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        function createRecipe(recipe: PropsType & { name: string }) {
          fetch(`${API_URL}/recipes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(recipe),
          })
            .then((res) => res.json())
            .then(() => {
              navigate(`/account`);
            })
            .catch((err) => {
              console.log(err);
              alert("There was an error creating your recipe");
            });
        }

        createRecipe({
          name: recipeName,
          ...props,
          yanContribution: JSON.stringify(props.yanContribution),
          yanFromSource: JSON.stringify(props.yanFromSource),
          primaryNotes: props.primaryNotes.flat(),
          secondaryNotes: props.secondaryNotes.flat(),
        });
        setRecipeName("");
      }}
    >
      <Title header={t("recipeForm.title")} />
      <label
        htmlFor="recipeName"
        className="w-full flex justify-center items-center text-center gap-4"
      >
        <p>{t("recipeForm.subtitle")}</p>
        <input
          type="text"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4 my-2 disabled:bg-sidebar
      disabled:cursor-not-allowed"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </label>
      <button className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2">
        {t("recipeForm.submit")}
      </button>
    </form>
  );
}
