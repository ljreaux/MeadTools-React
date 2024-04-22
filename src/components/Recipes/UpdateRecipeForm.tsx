import Title from "../Title";
import { RecipeData } from "../../App";
import { FormData } from "../Nutrients/NutrientCalc";
import { API_URL } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PropsType {
  name: string;
  updateName: React.Dispatch<React.SetStateAction<string>>;
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
  yanFromSource: number[] | null;
  advanced: boolean;
}

export default function UpdateRecipeForm(props: PropsType) {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { t } = useTranslation();
  const { name, updateName } = props;
  return (
    <form
      className="w-11/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 mb-8 mt-24 aspect-video gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        function updateRecipe(
          recipe: Omit<PropsType, "updateName">,
          id: string
        ) {
          fetch(`${API_URL}recipes/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(recipe),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              navigate(`/account`);
            })
            .catch((err) => {
              console.log(err);
              alert("There was an error updating your recipe");
            });
        }

        const { updateName, ...rest } = props;

        recipeId &&
          updateRecipe(
            {
              ...rest,
              yanContribution: JSON.stringify(props.yanContribution),
              primaryNotes: props.primaryNotes.flat(),
              secondaryNotes: props.secondaryNotes.flat(),
            },
            recipeId
          );
      }}
    >
      <Title header={t("changesForm.login")} />
      <label
        htmlFor="recipeName"
        className="w-full flex justify-center items-center text-center gap-4"
      >
        <p>{t("changesForm.subtitle")}</p>
        <input
          type="text"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4 my-2 disabled:bg-sidebar
      disabled:cursor-not-allowed"
          value={name}
          onChange={(e) => updateName(e.target.value)}
        />
      </label>
      <button className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2">
        {t("changesForm.submit")}
      </button>
    </form>
  );
}
