import { RecipeData } from "../../App";
import useLocalStorage from "../../hooks/useLocalStorage";
import { FormData } from "../Nutrients/NutrientCalc";
import { initialIngredients } from "./initialIngredients";
import { initialData } from "../Nutrients/initialData";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useToast } from "../ui/use-toast";
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
  const { toast } = useToast();
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

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="flex-1 w-full">
          <Button variant={"secondary"} className="flex-1 w-full">
            {t("recipeBuilder.reset")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={() => {
                resetRecipe();
                toast({
                  title: "Recipe Reset",
                  description: `Recipe has been reset.`,
                });
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
