import Title from "../Title";
import { RecipeData } from "../../App";
import { FormData } from "../Nutrients/NutrientCalc";
import { API_URL } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
  yanFromSource: number[] | null | string;
  advanced: boolean;
}

export default function UpdateRecipeForm(props: PropsType) {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { t } = useTranslation();
  const { name, updateName } = props;
  const { toast } = useToast();
  return (
    <form
      className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 mt-24 mb-8 rounded-xl bg-background aspect-video max-w-[750px]"
      onSubmit={(e) => {
        e.preventDefault();

        function updateRecipe(
          recipe: Omit<PropsType, "updateName">,
          id: string
        ) {
          fetch(`${API_URL}/recipes/${id}`, {
            method: "PATCH",
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
              toast({
                title: "Error",
                description: "There was an error updating your recipe",
                variant: "destructive",
              });
            });
        }

        const { updateName, ...rest } = props;

        recipeId &&
          updateRecipe(
            {
              ...rest,
              yanContribution: JSON.stringify(props.yanContribution),
              yanFromSource: JSON.stringify(props.yanFromSource),
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
        className="flex items-center justify-center w-full gap-4 text-center"
      >
        <p>{t("changesForm.subtitle")}</p>
        <Input
          type="text"
          value={name}
          onChange={(e) => updateName(e.target.value)}
          className="max-w-56"
        />
      </label>
      <Button variant={"secondary"}>{t("changesForm.submit")}</Button>
    </form>
  );
}
