import { useEffect, useState } from "react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import MainInputs, { YeastType } from "./MainInputs";
import { initialData } from "./initialData";
import NutrientCalcResults from "./NutrientCalcResults";
import useMaxGpl from "../../hooks/useMaxGpl";
import AdvancedInputForm from "./AdvancedInputForm";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

interface Selected {
  yeastBrand: keyof YeastType;
  yeastStrain: string;
  yeastDetails: {
    brand?: string;
    id?: number;
    name: string;
    nitrogen_requirement: string;
    tolerance: number | string;
    low_temp: number;
    high_temp: number;
  };
  n2Requirement: string;
  volumeUnits: string;
  schedule: keyof FormData["maxGpl"];
}

interface GplEntries {
  name: string;
  value: number[];
}

export interface FormData {
  maxGpl: {
    tbe: GplEntries;
    tosna: GplEntries;
    justK: GplEntries;
    dap: GplEntries;
    oAndk: {
      name: string;
      value: number[][];
    };
    oAndDap: GplEntries;
    kAndDap: GplEntries;
  };
  selected: Selected;
  inputs: {
    volume: number;
    sg: number;
    offset: number;
    numberOfAdditions: number;
  };
  yanContribution: number[];
  outputs: {
    targetYan: number;
    yeastAmount: number;
  };
}

export default function NutrientCalc() {
  const { t } = useTranslation();
  const [advanced, setAdvanced] = useState(false);
  const [nuteInfo, setNuteInfo] = useState<null | {
    ppmYan: number[];
    totalGrams: number[];
    perAddition: number[];
    totalYan: number;
    remainingYan: number;
    gf: {
      gf: number;
      gfWater: number;
    };
  }>(null);

  useEffect(() => {
    if (advanced) setYanFromSource([0, 0, 0]);
    else setYanFromSource(null);
  }, [advanced]);

  const [yanContribution, setYanContribution] = useState([40, 100, 210]);
  const [yanFromSource, setYanFromSource] = useState<number[] | null>(null);
  const [data, setData] = useState<FormData>({ ...initialData });
  const maxGPL = useMaxGpl(
    data.maxGpl,
    data.selected.schedule,
    data.inputs?.sg
  );
  const [yeasts, setYeasts] = useState<YeastType>({
    Lalvin: [],
    Fermentis: [],
    MangroveJack: [],
    RedStar: [],
    Other: [],
  });
  const [recalc, setRecalc] = useState(true);

  const { currentStepIndex, step, next, back, steps } = useMultiStepForm([
    <>
      <MainInputs
        {...data}
        setData={setData}
        yeasts={yeasts}
        setYeasts={setYeasts}
        recalc={recalc}
        setRecalc={setRecalc}
      />
      <Button
        variant={"secondary"}
        onClick={() => setAdvanced((prev) => !prev)}
        className="w-2/4 md:w-1/4 md:max-w-56"
      >
        {t("buttonLabels.advanced")}
      </Button>
      {advanced && (
        <AdvancedInputForm
          advanced={advanced}
          yanFromSource={yanFromSource}
          setYanFromSource={setYanFromSource}
          yanContribution={yanContribution}
          setYanContribution={setYanContribution}
        />
      )}
    </>,
    <NutrientCalcResults
      {...data}
      {...maxGPL}
      yanFromSource={yanFromSource}
      advanced={advanced}
      setNuteInfo={setNuteInfo}
      nuteInfo={nuteInfo}
    />,
  ]);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8 text-sm sm:text-base">
      {step}
      {currentStepIndex > 0 && (
        <Button
          variant={"secondary"}
          onClick={back}
          className="w-2/4 md:w-1/4 md:max-w-56"
        >
          {t("buttonLabels.back")}
        </Button>
      )}
      {currentStepIndex < steps.length - 1 && (
        <Button
          className="w-2/4 md:w-1/4 md:max-w-56"
          variant={"secondary"}
          onClick={() => {
            setData((prev) => ({
              ...prev,
              yanContribution,
            }));
            next();
          }}
        >
          {t("buttonLabels.next")}
        </Button>
      )}
    </div>
  );
}
