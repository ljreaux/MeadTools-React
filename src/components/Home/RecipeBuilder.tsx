import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RecipeData } from "../../App";
import Title from "../Title";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import Ingredient from "./Ingredient";
import { toBrix, toSG } from "../../helpers/unitConverters";
import useBlend from "../../hooks/useBlend";
import useAbv from "../../hooks/useAbv";
import { Ingredient as IngredientType } from "../../App";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";
import { List } from "../../App";
import Tooltip from "../Tooltips";

export default function RecipeBuilder({
  ingredients,
  ingredientsList,
  FG,
  units,
  setRecipeData,
  setIngredientsList,
  setBlendFG,
  setSecondaryVolume,
}: RecipeData & {
  setRecipeData: Dispatch<SetStateAction<RecipeData>>;
  ingredientsList: List;
  setIngredientsList: Dispatch<SetStateAction<List>>;
  setBlendFG: Dispatch<SetStateAction<number[]>>;
  setSecondaryVolume: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useTranslation();
  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => setFirstMount(false), []);

  const totalBlended = ingredients.map((ingredient) => {
    return [toSG(ingredient.brix), ingredient.details[1]];
  });
  const withOutSecondary: number[][] = [];
  const justSecondary: number[][] = [];
  const offsetArr: number[] = [];
  ingredients.forEach((ingredient) => {
    if (!ingredient.secondary) {
      withOutSecondary.push([toSG(ingredient.brix), ingredient.details[1]]);
      if (ingredient.category === "fruit")
        offsetArr.push(ingredient.details[0] * 50);
    } else {
      justSecondary.push([toSG(ingredient.brix), ingredient.details[1]]);
    }
  });

  const { blend, runBlendingFunction } = useBlend(totalBlended);
  const {
    blend: noSecondaryBlend,
    runBlendingFunction: secondaryBlendFunction,
  } = useBlend(withOutSecondary);
  const secondaryBlend = useBlend(justSecondary);

  function runBlends() {
    runBlendingFunction();
    secondaryBlendFunction();
    secondaryBlend.runBlendingFunction();
  }
  const blendFG =
    Math.round(
      ((noSecondaryBlend.totalVolume * FG +
        secondaryBlend.blend.totalVolume * secondaryBlend.blend.blendedValue) /
        blend.totalVolume) *
        1000
    ) / 1000 || FG;
  function setIngredients(ingredientList: List) {
    setIngredientsList(ingredientList);
  }
  function setIndividual(index: number, ingredient: Partial<IngredientType>) {
    setRecipeData((prev) => {
      const newIngredient = prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, ...ingredient } : ing
      );

      return {
        ...prev,
        ingredients: newIngredient,
      };
    });
  }

  function addIngredientLine() {
    setRecipeData((prev) => {
      return {
        ...prev,
        ingredients: [
          ...prev.ingredients,
          {
            name: "honey",
            brix: 79.6,
            details: [0, 0],
            secondary: false,
            category: "sugar",
          },
        ],
      };
    });
    runBlends();
  }

  function removeLine(index: number) {
    setRecipeData((prev) => {
      return {
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      };
    });
    runBlends();
  }

  function setChecked(index: number) {
    setRecipeData((prev) => {
      return {
        ...prev,
        ingredients: prev.ingredients.map((ingred, i) => {
          if (i === index) {
            return {
              ...ingred,
              secondary: !ingred.secondary,
            };
          } else {
            return ingred;
          }
        }),
      };
    });
    runBlends();
  }

  function calculateABV({ ABV, delle }: { ABV: number; delle: number }) {
    if (blend.blendedValue > noSecondaryBlend.blendedValue) {
      const numerator = ABV * noSecondaryBlend.totalVolume;
      const denominator = blend.totalVolume;
      ABV = numerator / denominator;
      delle = toBrix(FG) + 4.5 * ABV;
    }
    setRecipeData((prev) => ({
      ...prev,
      ABV,
    }));
    return { ABV, delle };
  }

  const ABVOBJ = useAbv({ OG: blend.blendedValue, FG: blendFG });

  const [{ ABV, delle }, setABVDelle] = useState({ ABV: 0, delle: 0 });

  useEffect(() => {
    setABVDelle(calculateABV(ABVOBJ));
  }, [ABVOBJ.ABV]);

  useEffect(() => {
    const multiplier = units.weight === "kg" ? 0.453592 : 2.20462;
    if (!firstMount)
      setRecipeData((prev) => {
        return {
          ...prev,
          ingredients: prev.ingredients.map((ing) => ({
            ...ing,
            details: [
              Math.round(ing.details[0] * multiplier * 1000) / 1000,
              ing.details[1],
            ],
          })),
        };
      });
  }, [units.weight]);

  useEffect(() => {
    const multiplier = units.volume === "liter" ? 3.78541 : 0.264172;
    if (!firstMount)
      setRecipeData((prev) => {
        return {
          ...prev,
          ingredients: prev.ingredients.map((ing) => ({
            ...ing,
            details: [
              ing.details[0],
              Math.round(ing.details[1] * multiplier * 1000) / 1000,
            ],
          })),
        };
      });
    runBlends();
  }, [units.volume]);

  useEffect(() => {
    if (!firstMount) {
      setRecipeData((prev) => {
        return {
          ...prev,
          OG: noSecondaryBlend.blendedValue,
          FG: 0.996,
          offset: offsetArr.reduce((prev, curr) => {
            return curr / noSecondaryBlend.totalVolume + prev;
          }, 0),
          volume: noSecondaryBlend.totalVolume,
        };
      });
      setSecondaryVolume(blend.totalVolume);
    }
  }, [blend.blendedValue, noSecondaryBlend.blendedValue]);

  useEffect(() => {
    setBlendFG([blend.blendedValue, blendFG]);
  }, [FG, blend.blendedValue, noSecondaryBlend.blendedValue]);

  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <form
        className={`w-11/12 sm:w-9/12 flex flex-col items-center justify-center text-center rounded-xl bg-sidebar p-2 sm:p-8 my-24 aspect-video text-xs sm:text-base ${
          loading ? "hidden" : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          runBlendingFunction();
          secondaryBlendFunction();
        }}
      >
        <Title header={t("recipeBuilder.homeHeading")} />
        <div className="grid grid-cols-5 gap-4 w-[97%]">
          <label
            htmlFor="ingredients"
            className="flex items-center justify-center gap-1"
          >
            {t("recipeBuilder.labels.ingredients")}
            <Tooltip body={t("tipText.volumeLines")} />
          </label>
          <label htmlFor="weight">
            {t("recipeBuilder.labels.weight")}
            <select
              name="weightUnits"
              id="weightUnits"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={units.weight}
              onChange={(e) => {
                setRecipeData((prev) => {
                  return e.target.value === "lbs" || e.target.value === "kg"
                    ? {
                        ...prev,
                        units: {
                          ...prev.units,
                          weight: e.target.value,
                        },
                      }
                    : prev;
                });
              }}
            >
              <option value="lbs">{t("LBS")}</option>
              <option value="kg">{t("KG")}</option>
            </select>
          </label>
          <label
            htmlFor="brix"
            className="flex items-center justify-center gap-1"
          >
            {t("recipeBuilder.labels.brix")}{" "}
            <Tooltip body={t("tipText.brix")} />
          </label>
          <label htmlFor="volume">
            {t("recipeBuilder.labels.volume")}
            <select
              name="volumeUnits"
              id="volumeUnits"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={units.volume}
              onChange={(e) => {
                setRecipeData((prev) => {
                  return e.target.value === "gal" || e.target.value === "liter"
                    ? {
                        ...prev,
                        units: {
                          ...prev.units,
                          volume: e.target.value,
                        },
                      }
                    : prev;
                });
              }}
            >
              <option value="gal">{t("GAL")}</option>
              <option value="liter">{t("LIT")}</option>
            </select>
          </label>
          <label htmlFor="secondary">
            {t("recipeBuilder.labels.secondary")}
          </label>
        </div>
        {ingredients.map((ingredient, i) => (
          <Ingredient
            ingredient={ingredient}
            index={i}
            ingredientsList={ingredientsList}
            setIngredients={setIngredients}
            setIndividual={setIndividual}
            removeLine={removeLine}
            filterTerm={i <= 1 ? ["water", "juice"] : null}
            units={units}
            setChecked={setChecked}
            key={i + ingredient.name}
            setLoading={setLoading}
          />
        ))}
        {ingredients.length < 9 && (
          <button onClick={addIngredientLine} type="button">
            {t("recipeBuilder.addNew")}
          </button>
        )}
        <div className="flex items-center justify-center col-span-5 gap-4 px-2 py-1 my-4 text-lg border-2 border-solid border-textColor hover:bg-sidebar hover:border-background md:text-lg disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl sm:gap-8 group">
          <button
            type="button"
            className={`group w-fit text-sidebar hover:text-textColor transition-colors disabled:cursor-not-allowed`}
            disabled={ingredients.length > 9}
            onClick={addIngredientLine}
          >
            <FaPlusSquare className="group-hover:scale-125 group-hover:text-textColor " />
          </button>
          <button
            type="button"
            className={`group w-fit text-sidebar hover:text-textColor transition-colors disabled:cursor-not-allowed`}
            disabled={ingredients.length <= 4}
            onClick={() => removeLine(ingredients.length - 1)}
          >
            <FaMinusSquare className="group-hover:scale-125 group-hover:text-textColor" />
          </button>
        </div>
        <button
          className="px-2 py-1 border-2 border-solid border-textColor hover:bg-sidebar hover:border-background md:text-lg disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl"
          type="submit"
        >
          {t("recipeBuilder.submit")}
        </button>{" "}
        {blend.blendedValue > 0 && (
          <div className="grid items-center justify-center w-full grid-cols-5 mt-4 text-center">
            <label htmlFor="estOG">
              {t("recipeBuilder.resultsLabels.estOG")}
            </label>

            <label
              htmlFor="estFG"
              className="flex flex-col items-center justify-center"
            >
              {t("recipeBuilder.resultsLabels.estFG")}
              <Tooltip body={t("tipText.estimatedFg")} />
            </label>
            <label htmlFor="backFG" className="flex justify-center item-center">
              {t("recipeBuilder.resultsLabels.backFG")}
            </label>
            <label htmlFor="abv">{t("recipeBuilder.resultsLabels.abv")}</label>
            <label htmlFor="delle" className="flex items-center justify-center">
              {t("recipeBuilder.resultsLabels.delle")}
              <Tooltip
                body={t("tipText.delleUnits")}
                link="https://meadmaking.wiki/en/process/stabilization#via-yeast-alcohol-tolerance"
              />
            </label>
            <p id="estOG">
              {Math.round(noSecondaryBlend.blendedValue * 1000) / 1000}
            </p>

            <input
              type="number"
              value={FG}
              step={0.001}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              onChange={(e) => {
                setRecipeData((prev) => {
                  return {
                    ...prev,
                    FG: Number(e.target.value),
                  };
                });
              }}
              onFocus={(e) => e.target.select()}
            />
            <p id="backFG">{blendFG}</p>
            <p>
              {Math.round(ABV * 100) / 100}
              {t("recipeBuilder.percent")}
            </p>
            <p>
              {Math.round(delle)} {t("DU")}
            </p>
            <label
              htmlFor="totalVolume"
              className="flex justify-center item-center"
            >
              {t("recipeBuilder.resultsLabels.totalPrimary")}
              <Tooltip body={t("tipText.totalVolume")} />
            </label>
            <p id="totalVolume">
              {Math.round(noSecondaryBlend.totalVolume * 1000) / 1000}{" "}
              {units.volume}
            </p>

            <label
              htmlFor="totalSecondaryVolume"
              className="flex justify-center col-start-4 item-center"
            >
              {t("recipeBuilder.resultsLabels.totalSecondary")}
              <Tooltip body={t("tipText.totalSecondary")} />
            </label>
            <p id="totalVolume">
              {Math.round(blend.totalVolume * 1000) / 1000} {units.volume}
            </p>
          </div>
        )}
      </form>
    </>
  );
}
