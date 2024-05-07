import { useState, FormEvent } from "react";
import Trials from "./Trials.tsx";
import useUnitChange from "../../../hooks/useUnitChange.ts";
import Title from "../../Title.tsx";
import { useTranslation } from "react-i18next";

export interface BatchDetails {
  batchSize: number;
  sampleSize: number;
  stockSolutionConcentration: number;
  units: "gallon" | "liter";
}

export default function BenchTrials() {
  const { t } = useTranslation();
  const [batchDetails, setBatchDetails] = useState<BatchDetails>({
    batchSize: 1,
    sampleSize: 50,
    stockSolutionConcentration: 10,
    units: "gallon",
  });

  function handleBatchDetails(
    e: FormEvent<EventTarget>,
    key: keyof BatchDetails
  ): void {
    const target = e.target as HTMLInputElement;
    const value = key == "units" ? target.value : Number(target.value);
    setBatchDetails({
      ...batchDetails,
      [key]: value,
    });
  }
  const unitChangeParams = {
    stateObj: batchDetails,
    setterFunction: setBatchDetails,
  };
  useUnitChange({ ...unitChangeParams, propertyToChange: "batchSize" });
  return (
    <form className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar sm:p-8 p-2 my-24 aspect-video">
      <Title header={t("benchTrialsHeading")} />
      <div className="grid grid-cols-2 items-center justify-center my-4 w-full">
        <label htmlFor="batchSize">{t("batchSize")}</label>
        <input
          id="batchSize"
          type="number"
          value={batchDetails.batchSize}
          onChange={(e) => handleBatchDetails(e, "batchSize")}
          onFocus={(e) => e.target.select()}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background "
        />
        <label htmlFor="trialBatchUnits">{t("UNITS")}:</label>
        <select
          name="trialBatchUnits"
          id="trialBatchUnits"
          value={batchDetails.units}
          onChange={(e) => handleBatchDetails(e, "units")}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background "
        >
          <option value="gallon">{t("GAL")}</option>
          <option value="liter">{t("LIT")}</option>
        </select>
        <label htmlFor="sampleSize">{t("sampleSize")}</label>
        <input
          id="sampleSize"
          type="number"
          value={batchDetails.sampleSize}
          onChange={(e) => handleBatchDetails(e, "sampleSize")}
          onFocus={(e) => e.target.select()}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background "
        />
        <label htmlFor="concentration">{t("stockSolutionConcentration")}</label>
        <input
          id="concentration"
          type="number"
          value={batchDetails.stockSolutionConcentration}
          onChange={(e) => handleBatchDetails(e, "stockSolutionConcentration")}
          onFocus={(e) => e.target.select()}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background "
        />
        <Trials batchDetails={batchDetails} />
      </div>
    </form>
  );
}
