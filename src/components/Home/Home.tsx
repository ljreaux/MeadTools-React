import useMultiStepForm from "../../hooks/useMultiStepForm";
import RecipeBuilder from "./RecipeBuilder";
import { Additive, RecipeData } from "../../App";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MainInputs, { YeastType } from "../Nutrients/MainInputs";
import AdvancedInputForm from "../Nutrients/AdvancedInputForm";
import NutrientCalcResults from "../Nutrients/NutrientCalcResults";
import useMaxGpl from "../../hooks/useMaxGpl";
import { initialData } from "../Nutrients/initialData";
import { useTranslation } from "react-i18next";
import { FormData } from "../Nutrients/NutrientCalc";
import Stabilizers from "./Stabilizers";
import Additives from "./Additives";
import MyDocument from "./PDF";
import Loading from "../Loading";
import { List } from "../../App";
import { usePDF } from "@react-pdf/renderer";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import Title from "../Title";
import { Link } from "react-router-dom";
import Notes from "./Notes";
import SaveRecipeForm from "./SaveRecipeForm";

export default function Home({
  recipeData,
  setRecipeData,
  ingredientsList,
  setIngredientsList,
  token,
}: {
  recipeData: RecipeData;
  setRecipeData: Dispatch<SetStateAction<RecipeData>>;
  ingredientsList: List;
  setIngredientsList: Dispatch<SetStateAction<List>>;
  token: string | null;
}) {
  const [primaryNotes, setPrimaryNotes] = useLocalStorage<string[][]>(
    "primaryNotes",
    [["", ""]]
  );
  const [secondaryNotes, setSecondaryNotes] = useLocalStorage<string[][]>(
    "secondaryNotes",
    [["", ""]]
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { t } = useTranslation();
  const [advanced, setAdvanced] = useLocalStorage("advanced", false);
  const [nuteInfo, setNuteInfo] = useLocalStorage<null | {
    ppmYan: number[];
    totalGrams: number[];
    perAddition: number[];
    totalYan: number;
    remainingYan: number;
    gf: {
      gf: number;
      gfWater: number;
    };
  }>("nuteInfo", null);

  useEffect(() => {
    if (advanced) setYanFromSource([0, 0, 0]);
    else setYanFromSource(null);
  }, [advanced]);

  function setSorbateSulfite(sorbate?: number, sulfite?: number): void {
    if (sorbate && sulfite)
      setRecipeData((prev) => ({
        ...prev,
        sorbate,
        sulfite,
      }));
    else
      setRecipeData((prev) => {
        const prevCopy = { ...prev };
        delete prevCopy.sorbate;
        delete prevCopy.sulfite;
        return {
          ...prevCopy,
        };
      });
  }

  function editAdditives(additive: Additive, index: number) {
    setRecipeData((prev) => ({
      ...prev,
      additives: prev.additives.map((prevAdd, i) =>
        i === index ? additive : prevAdd
      ),
    }));
  }

  function addAdditive() {
    setRecipeData((prev) => ({
      ...prev,
      additives: [...prev.additives, { name: "", amount: 0, unit: "g" }],
    }));
  }

  function deleteAdditive(index: number) {
    setRecipeData((prev) => ({
      ...prev,
      additives: prev.additives.filter((_, i) => i !== index),
    }));
  }

  const [yanContribution, setYanContribution] = useLocalStorage(
    "yanContribution",
    [40, 100, 210]
  );
  const [yanFromSource, setYanFromSource] = useLocalStorage<number[] | null>(
    "yanFromSource",
    null
  );
  const [data, setData] = useLocalStorage<FormData>("nutrientData", {
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
  const maxGPL = useMaxGpl(
    data.maxGpl,
    data.selected.schedule,
    data.inputs?.sg
  );

  useEffect(() => {
    setData((prev: FormData) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        volume: recipeData.volume,
        sg: Math.round((recipeData.OG - recipeData.FG + 1) * 1000) / 1000,
        offset: Math.round(recipeData.offset * 100) / 100,
      },
      selected: {
        ...prev.selected,
        volumeUnits: recipeData.units.volume,
      },
    }));
  }, [
    recipeData.volume,
    recipeData.OG,
    recipeData.FG,
    recipeData.offset,
    recipeData.units.volume,
  ]);
  const [yeasts, setYeasts] = useState<YeastType>({
    Lalvin: [],
    Fermentis: [],
    MangroveJack: [],
    RedStar: [],
    Other: [],
  });

  const [instance, setInstance] = usePDF({
    document: (
      <MyDocument
        {...recipeData}
        {...ingredientsList}
        {...data}
        {...yeasts}
        nuteInfo={nuteInfo}
        primaryNotes={primaryNotes}
        secondaryNotes={secondaryNotes}
      />
    ),
  });

  useEffect(() => {
    setInstance(
      <MyDocument
        {...recipeData}
        {...ingredientsList}
        {...data}
        {...yeasts}
        nuteInfo={nuteInfo}
        primaryNotes={primaryNotes}
        secondaryNotes={secondaryNotes}
      />
    );
  }, [recipeData, ingredientsList, data, yeasts, nuteInfo]);

  const { next, back, step, currentStepIndex, steps, goTo } = useMultiStepForm([
    <RecipeBuilder
      {...recipeData}
      setRecipeData={setRecipeData}
      ingredientsList={ingredientsList}
      setIngredientsList={setIngredientsList}
    />,
    <>
      <MainInputs
        {...data}
        setData={setData}
        yeasts={yeasts}
        setYeasts={setYeasts}
      />
      <button
        onClick={() => setAdvanced((prev: boolean) => !prev)}
        className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4"
      >
        {t("buttonLabels.advanced")}
      </button>
      {advanced && (
        <AdvancedInputForm
          advanced={advanced}
          yanFromSource={yanFromSource}
          setYanFromSource={setYanFromSource}
          yanContribution={yanContribution}
          setYanContribution={setYanContribution}
        />
      )}{" "}
    </>,
    <NutrientCalcResults
      {...data}
      {...maxGPL}
      yanFromSource={yanFromSource}
      advanced={advanced}
      setNuteInfo={setNuteInfo}
    />,
    <Stabilizers
      abv={recipeData.ABV}
      batchVolume={recipeData.volume}
      volumeUnits={recipeData.units.volume}
      setSorbateSulfite={setSorbateSulfite}
    />,
    <Additives
      additives={recipeData.additives}
      editAdditives={editAdditives}
      addAdditive={addAdditive}
      deleteAdditive={deleteAdditive}
      volumeUnits={recipeData.units.volume}
      batchVolume={recipeData.volume}
    />,
    <Notes
      primaryNotes={primaryNotes}
      setPrimaryNotes={setPrimaryNotes}
      secondaryNotes={secondaryNotes}
      setSecondaryNotes={setSecondaryNotes}
    />,
    <>
      {instance.loading && <Loading />}
      {!instance.loading && instance.url && (
        <div className="w-11/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 mb-8 mt-24 aspect-video">
          <Title header={t("PDF.title")} />
          <div className="w-[80%] h-[50vh]">
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={instance.url}
                plugins={[
                  // Register plugins
                  defaultLayoutPluginInstance,
                ]}
              />
            </Worker>
          </div>
        </div>
      )}
    </>,
    <>
      {!token ? (
        <Link
          to={"/login"}
          className=" text-textColor font-bold underline hover:text-sidebar transition-all my-4"
        >
          {t("recipeForm.login")}
        </Link>
      ) : (
        <SaveRecipeForm
          recipeData={recipeData}
          nutrientData={data}
          nuteInfo={nuteInfo}
          primaryNotes={primaryNotes}
          secondaryNotes={secondaryNotes}
          yanContribution={yanContribution}
          yanFromSource={yanFromSource}
          advanced={advanced}
        />
      )}
    </>,
  ]);
  return (
    <div className="w-full flex flex-col items-center justify-center mt-12 mb-12">
      {step}
      {currentStepIndex > 0 && (
        <button
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4"
          onClick={back}
        >
          {t("buttonLabels.back")}
        </button>
      )}
      {currentStepIndex < steps.length - 1 && (
        <button
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4 mb-[3rem]"
          onClick={() => {
            setData((prev) => ({
              ...prev,
              yanContribution,
            }));
            next();
          }}
        >
          {t("buttonLabels.next")}
        </button>
      )}
    </div>
  );
}
