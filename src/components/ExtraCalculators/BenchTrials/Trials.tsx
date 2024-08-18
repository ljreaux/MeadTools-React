import { Input } from "@/components/ui/input";
import { BatchDetails } from "./BenchTrials";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type StockVolume = number[];

interface Props {
  batchDetails: BatchDetails;
}

export default function Trials({ batchDetails }: Props) {
  const { t } = useTranslation();
  const labels = [
    t("solutionVolume"),
    t("adjunctAmount"),
    t("adjunctConcentration"),
    t(`${batchDetails.units}ScaledAdjunct`),
    t("scaledBatch"),
  ];
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
    <Table className="my-10">
      <TableHeader>
        <TableRow>
          {labels.map((label) => {
            return (
              <TableHead key={label} className="text-center">
                {t(label)}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>

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
          <TableRow key={i}>
            <TableCell>
              <Input
                id={`stockVolume ${i + 1}`}
                type="number"
                value={solution}
                onChange={(e) => handleStockVolume(e, i)}
                onFocus={(e) => e.target.select()}
                step={0.01}
              />
            </TableCell>
            <TableCell>
              <Input
                id={`adjunctAmount ${i + 1}`}
                type="number"
                value={sample}
                readOnly
                disabled
              />
            </TableCell>
            <TableCell>
              <Input
                id={`adjunctInSample ${i + 1}`}
                type="number"
                value={scaler * 1000000}
                readOnly
                disabled
              />
            </TableCell>
            <TableCell>
              <Input
                id={`scaledAdjunct ${i + 1}`}
                type="number"
                value={scaledAdjunct}
                readOnly
                disabled
              />
            </TableCell>
            <TableCell>
              <Input
                id={`batchAmount ${i + 1}`}
                type="number"
                value={scaledBatch}
                readOnly
                disabled
              />
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}
