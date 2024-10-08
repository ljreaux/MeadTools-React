import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { linkBrew } from "@/helpers/iSpindel";
import { getUserInfo } from "@/helpers/Login";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function LinkBrew() {
  const { token, brews } = useiSpindelContext();
  const { brewId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [brew, setBrew] = useState(brews.find((brew) => brew.id === brewId));

  useEffect(() => {
    if (token)
      (async () => {
        const user = await getUserInfo(token);
        if (user) {
          setUserRecipes(user.recipes);
        } else {
          toast({
            title: "Account Error",
            description: "Please Login Again",
            variant: "destructive",
          });
        }
      })();
  }, [token]);

  return (
    <div>
      <h2>Link Brew to Recipe</h2>
      <div>
        {userRecipes.map((rec) => {
          const isCurrentRecipe = rec.id === brew?.recipe_id;
          return (
            <div key={rec.id}>
              <p>{rec.name}</p>
              <Button
                onClick={() => token && navigate(`/recipes/${rec.id}`)}
                variant={"secondary"}
              >
                {t("accountPage.viewRecipe")}
              </Button>

              <Button
                onClick={() =>
                  linkBrew(token, rec.id, brewId)
                    .then((res) => setBrew(res))
                    .catch((err) => console.error(err))
                }
                disabled={isCurrentRecipe}
              >
                Link Brew to Recipe
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LinkBrew;
