import { useState, FormEvent } from "react";
import useBlend from "../../../hooks/useBlend";
import { NumArray } from "../../../hooks/useBlend";
import Title from "../../Title";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export default function BlendingCalc() {
  const { t } = useTranslation();
  const [inputValues, setInputValues] = useState<NumArray>([
    [0, 0],
    [0, 0],
  ]);

  function handleChange(e: FormEvent<EventTarget>, [index1, index2]: number[]) {
    const target = e.target as HTMLInputElement;
    setInputValues((prev) => {
      const newArr = [...prev];
      newArr[index1][index2] = Number(target.value);
      return newArr;
    });
  }

  const { blend, runBlendingFunction } = useBlend(inputValues);

  return (
    <form
      className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 my-8 sm:w-1/2 rounded-xl bg-background"
      onSubmit={(e) => {
        e.preventDefault();
        runBlendingFunction();
      }}
    >
      <Title header={t("blendingHeading")} />
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>{t("valOne")}</TableHead>
            <TableCell>
              <Input
                type="number"
                id="valueOne"
                value={inputValues[0][0]}
                onChange={(e) => handleChange(e, [0, 0])}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
            <TableHead>{t("volOne")}</TableHead>
            <TableCell>
              <Input
                type="number"
                id="volumeOne"
                value={inputValues[0][1]}
                onChange={(e) => handleChange(e, [0, 1])}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("valTwo")}</TableHead>
            <TableCell>
              <Input
                type="number"
                id="valueTwo"
                value={inputValues[1][0]}
                onChange={(e) => handleChange(e, [1, 0])}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
            <TableCell>{t("volTwo")}</TableCell>
            <TableCell>
              <Input
                type="number"
                id="volumeTwo"
                value={inputValues[1][1]}
                onChange={(e) => handleChange(e, [1, 1])}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
          </TableRow>

          <TableCell colSpan={4}>
            <span className="flex items-center justify-center">
              <Button type="submit" variant={"secondary"}>
                Submit
              </Button>
            </span>
          </TableCell>
        </TableBody>
        <TableFooter>
          <TableCell>{t("totalVol")}</TableCell>
          <TableCell>
            <Input type="number" disabled value={blend.totalVolume} />
          </TableCell>
          <TableCell>{t("blendedVal")}</TableCell>
          <TableCell>
            <Input
              id="blendedVal"
              type="number"
              disabled
              value={Math.round(blend.blendedValue * 10 ** 4) / 10 ** 4}
            />
          </TableCell>
        </TableFooter>
      </Table>
    </form>
  );
}
