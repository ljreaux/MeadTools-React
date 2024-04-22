import { BatchDetails } from "./BenchTrials";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

type StockVolume = number[];

interface Props {
  batchDetails: BatchDetails;
}

export default function Trials({ batchDetails }: Props) {
  const { t } = useTranslation();
  const newStockSolutions = [0.5, 1, 1.5, 2];

  const [stockVolume, setStockVolume] =
    useState<StockVolume>(newStockSolutions);

  function handleStockVolume(e: FormEvent<EventTarget>, index: number): void {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);

    setStockVolume((prev) => {
      return prev.map((_, i) => (i === index ? value : prev[i]));
    });
  }
  const adjunctInSample = (index: number) => {
    return (
      Math.round(
        stockVolume[index] * batchDetails.stockSolutionConcentration * 10 ** 6
      ) /
      10 ** 8
    );
  };

  return (
    <>
      <div className="col-span-2 grid col-setup w-full">
        {stockVolume.map((solution, i) => {
          const sample = adjunctInSample(i);
          const scaler =
            Math.round(
              (sample / (batchDetails.sampleSize + stockVolume[i])) * 10 ** 6
            ) /
            10 ** 6;
          const scaledAdjunct =
            batchDetails.units == "gallon"
              ? Math.round(scaler * 37850000) / 10 ** 4
              : (scaler * 10 ** 4) / 10;
          const scaledBatch =
            Math.round(scaledAdjunct * batchDetails.batchSize * 10 ** 4) /
            10 ** 4;

          return (
            <div key={i} className="grid text-center">
              <label
                className="flex items-center justify-center text-sm p-2 gap-2"
                htmlFor={`stockVolume ${i + 1}`}
              >
                {i === 0 && t("solutionVolume")}
                <input
                  className=" bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-[80%]  disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
                  id={`stockVolume ${i + 1}`}
                  type="number"
                  value={solution}
                  onChange={(e) => handleStockVolume(e, i)}
                  onFocus={(e) => e.target.select()}
                />
              </label>

              <label
                className="flex items-center justify-center text-sm p-2 gap-2"
                htmlFor={`adjunctAmount ${i + 1}`}
              >
                {i === 0 && t("adjunctAmount")}
                <input
                  className=" bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-[80%]  disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
                  id={`adjunctAmount ${i + 1}`}
                  type="number"
                  value={sample}
                  readOnly
                  disabled
                />
              </label>
              <label
                className="flex items-center justify-center text-sm p-2 gap-2"
                htmlFor={`adjunctInSample ${i + 1}`}
              >
                {i === 0 && t("adjunctConcentration")}
                <input
                  className=" bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-[80%]  disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
                  id={`adjunctInSample ${i + 1}`}
                  type="number"
                  value={scaler * 1000000}
                  readOnly
                  disabled
                />
              </label>
              <label
                className="flex items-center justify-center text-sm p-2 gap-2"
                htmlFor="scaledAdjunct"
              >
                {i === 0 && t(`${batchDetails.units}ScaledAdjunct`)}
                <input
                  className=" bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-[80%]  disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
                  id={`scaledAdjunct ${i + 1}`}
                  type="number"
                  value={scaledAdjunct}
                  readOnly
                  disabled
                />
              </label>
              <label
                className="flex items-center justify-center text-sm p-2 gap-2"
                htmlFor={`batchAmount ${i + 1}`}
              >
                {i === 0 && t("scaledBatch")}
                <input
                  className=" bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-[80%]  disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
                  id={`batchAmount ${i + 1}`}
                  type="number"
                  value={scaledBatch}
                  readOnly
                  disabled
                />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
