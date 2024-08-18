import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../../helpers/getAllYeasts";
import { useToast } from "../ui/use-toast";
import RecipeTogglePrivate from "../ui/RecipeTogglePrivate";
import { Button } from "../ui/button";

export default function RecipeCard({
  recipe,
  token,
  setReload,
}: {
  recipe: { id: number; user_id: number; name: string; private: boolean };
  token: string | null;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();

  return (
    <div className="grid items-center justify-center gap-2">
      <p>{recipe.name}</p>
      <RecipeTogglePrivate recipe={recipe} />
      <div className="flex gap-1">
        <Button
          onClick={() => token && navigate(`/recipes/${recipe.id}`)}
          variant={"secondary"}
        >
          {t("accountPage.viewRecipe")}
        </Button>
        <Button
          onClick={() => token && navigate(`/recipes/${recipe.id}?pdf=true`)}
          variant={"secondary"}
        >
          {t("PDF.title")}
        </Button>
      </div>
      <Button
        onClick={async () => {
          const deleted = await deleteRecipe(recipe.id, token);
          if (
            deleted.message === `${recipe.name} has been successfully deleted.`
          ) {
            toast({ description: deleted.message });
            setReload((prev) => !prev);
          } else
            toast({ description: deleted.message, variant: "destructive" });
        }}
        variant="destructive"
      >
        {t("accountPage.deleteRecipe")}
      </Button>
    </div>
  );
}
