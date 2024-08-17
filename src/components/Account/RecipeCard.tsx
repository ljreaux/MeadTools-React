import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../../helpers/getAllYeasts";
import { useToast } from "../ui/use-toast";
import RecipeTogglePrivate from "../ui/RecipeTogglePrivate";

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
        <button
          onClick={() => token && navigate(`/recipes/${recipe.id}`)}
          className="px-2 py-1 border-2 border-solid border-foreground hover:bg-background hover:border-background md:text-lg disabled:bg-background disabled:hover:border-foreground disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl"
        >
          {t("accountPage.viewRecipe")}
        </button>
        <button
          onClick={() => token && navigate(`/recipes/${recipe.id}?pdf=true`)}
          className="px-2 py-1 border-2 border-solid border-foreground hover:bg-background hover:border-background md:text-lg disabled:bg-background disabled:hover:border-foreground disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl"
        >
          {t("PDF.title")}
        </button>
      </div>
      <button
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
        className="bg-red-500 px-2 py-1 border-2 border-solid border-foreground hover:bg-background hover:border-background md:text-lg disabled:bg-background disabled:hover:border-foreground disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl"
      >
        {t("accountPage.deleteRecipe")}
      </button>
    </div>
  );
}
