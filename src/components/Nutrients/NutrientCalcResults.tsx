import {
  Dispatch,
  SetStateAction,
  FormEvent,
  useState,
  useEffect,
} from "react";
import { FormData } from "./NutrientCalc";
import Title from "../Title";
// import useMaxGpl from "../../helpers/useMaxGpl";
import useYanCalc from "../../hooks/useYanCalc";
import calcSb from "../../helpers/calcSb";
import { toBrix } from "../../helpers/unitConverters";
import useGoFerm from "../../hooks/useGoFerm";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltips";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function NutrientCalcResults({
  gplArr,
  yanContribution,
  inputs,
  selected,
  outputs,
  yanFromSource,
  advanced,
  setGplArr,
  nuteInfo,
  setNuteInfo,
}: {
  gplArr: number[];
  yanContribution: FormData["yanContribution"];
  inputs: FormData["inputs"];
  selected: FormData["selected"];
  outputs: FormData["outputs"];
  yanFromSource: number[] | null;
  advanced: boolean;
  setGplArr: Dispatch<SetStateAction<number[]>>;
  nuteInfo: null | {
    ppmYan: number[];
    totalGrams: number[];
    perAddition: number[];
    totalYan: number;
    remainingYan: number;
    gf: {
      gf: number;
      gfWater: number;
      gfType?: string;
    };
  };
  setNuteInfo: Dispatch<
    SetStateAction<null | {
      ppmYan: number[];
      totalGrams: number[];
      perAddition: number[];
      totalYan: number;
      remainingYan: number;
      gf: {
        gf: number;
        gfWater: number;
        gfType?: string;
      };
    }>
  >;
}) {
  const { t } = useTranslation();
  const [gfType, setGfType] = useState(nuteInfo?.gf.gfType || "Go-Ferm");
  const handleChange = (e: FormEvent, index: number) =>
    setGplArr((prev) => {
      const target = e.target as HTMLInputElement;
      const copy = [...prev];
      copy[index] = Number(target.value);
      return copy;
    });

  const { nutrients, setNutrients } = useYanCalc(
    inputs.volume,
    selected.volumeUnits,
    outputs.targetYan,
    gfType,
    yanContribution,
    gplArr,
    inputs.numberOfAdditions,
    yanFromSource
  );

  const { gf, gfWater } = useGoFerm(gfType, outputs.yeastAmount);
  const parsedGF =
    gfType === "protect"
      ? "Go-Ferm Protect"
      : gfType === "sterol-flash"
      ? "Go-Ferm Sterol Flash"
      : "Go-Ferm";

  useEffect(() => {
    setNuteInfo({ ...nutrients, gf: { gf, gfWater, gfType: parsedGF } });
  }, [nutrients, gf, gfWater]);

  return (
    <div className="flex flex-col items-center justify-center w-11/12 p-8 mt-24 mb-8 sm:w-9/12 rounded-xl bg-background aspect-video">
      <Title header={t("nuteResults.label")} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>{t("nutrients.fermO")}</TableHead>
            <TableHead>{t("nutrients.fermK")}</TableHead>
            <TableHead>{t("nutrients.dap")}</TableHead>

            <TableHead>
              <span className="grid gap-2 py-2">
                <span className="flex items-center gap-1">
                  {t("nutrients.goFerm")} ({t("G")})
                  <Tooltip body={t("tipText.goFerm")} />
                </span>
                <Select
                  name="go-ferm"
                  onValueChange={(val) => {
                    setNuteInfo((prev) => {
                      if (prev)
                        return {
                          ...prev,
                          gf: { ...prev.gf, gfType: val },
                        };
                      else return null;
                    });
                    setGfType(val);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("nuteResults.gfTypes.gf")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Go-Ferm">
                      {t("nuteResults.gfTypes.gf")}
                    </SelectItem>
                    <SelectItem value="protect">
                      {t("nuteResults.gfTypes.gfProtect")}
                    </SelectItem>
                    <SelectItem value="sterol-flash">
                      {t("nuteResults.gfTypes.gfSterol")}
                    </SelectItem>
                    <SelectItem value="none">
                      {t("nuteResults.gfTypes.none")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead>
              {t("nuteResults.sideLabels.maxGpl")}
              <Tooltip body={t("tipText.maxGpl")} />
            </TableHead>
            <TableCell>
              <Input
                type="number"
                name="fermOgpl"
                id="fermOgpl"
                disabled={advanced}
                value={gplArr[0]}
                onChange={(e) => handleChange(e, 0)}
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                name="fermKgpl"
                id="fermKgpl"
                disabled={advanced}
                value={gplArr[1]}
                onChange={(e) => handleChange(e, 1)}
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                name="DapGpl"
                id="DapGpl"
                disabled={advanced}
                value={gplArr[2]}
                onChange={(e) => handleChange(e, 2)}
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell className="text-center">{`${gf}g`}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("nuteResults.sideLabels.ppmYan")}</TableHead>
            <TableCell>
              <Input
                type="number"
                value={nutrients.ppmYan[0]}
                onChange={(e) =>
                  setNutrients((prev) => ({
                    ...prev,
                    ppmYan: [
                      Number(e.target.value),
                      prev.ppmYan[1],
                      prev.ppmYan[2],
                    ],
                  }))
                }
                onFocus={(e) => e.target.select()}
                disabled
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={nutrients.ppmYan[1]}
                onFocus={(e) => e.target.select()}
                disabled
                onChange={(e) =>
                  setNutrients((prev) => ({
                    ...prev,
                    ppmYan: [
                      prev.ppmYan[0],
                      Number(e.target.value),
                      prev.ppmYan[2],
                    ],
                  }))
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={nutrients.ppmYan[2]}
                onFocus={(e) => e.target.select()}
                disabled
                onChange={(e) =>
                  setNutrients((prev) => ({
                    ...prev,
                    ppmYan: [
                      prev.ppmYan[0],
                      prev.ppmYan[1],
                      Number(e.target.value),
                    ],
                  }))
                }
              />
            </TableCell>
            <TableHead className="text-center">
              {t("nuteResults.gfWater")}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>{t("nuteResults.sideLabels.totalGrams")}</TableHead>

            <TableCell>
              <Input
                value={`${
                  Math.round(nutrients.totalGrams[0] * 100) / 100 || 0
                }g`}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell>
              <Input
                value={`${
                  Math.round(nutrients.totalGrams[1] * 100) / 100 || 0
                }g`}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell>
              <Input
                value={`${
                  Math.round(nutrients.totalGrams[2] * 100) / 100 || 0
                }g`}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </TableCell>

            <TableCell className="text-center">{`${gfWater}ml`}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("nuteResults.sideLabels.perAddition")}</TableHead>

            <TableCell>
              <Input
                value={`${
                  Math.round(nutrients.perAddition[0] * 100) / 100 || 0
                }g`}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell>
              <Input
                value={`${
                  Math.round(nutrients.perAddition[1] * 100) / 100 || 0
                }g`}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
            <TableCell>
              <Input
                value={`${
                  Math.round(nutrients.perAddition[2] * 100) / 100 || 0
                }g`}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </TableCell>

            <TableCell className="text-center">
              {t("nuteResults.sb")}
              <Tooltip body={t("tipText.oneThird")} />

              <p>
                {calcSb(inputs.sg)},{" "}
                {Math.round(toBrix(calcSb(inputs.sg)) * 100) / 100}
                {t("BRIX")}
              </p>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>{t("nuteResults.sideLabels.totalYan")}</TableCell>
            <TableCell>
              <p>{`${Math.round(nutrients.totalYan)}${t("PPM")}`}</p>
            </TableCell>
            <TableCell colSpan={2}>
              <span className="flex items-center justify-center gap-1">
                {" "}
                {t("nuteResults.sideLabels.remainingYan")}
                <Tooltip body={t("tipText.remainingYan")} />
              </span>
            </TableCell>
            <TableCell>
              <p>{`${Math.round(nutrients.remainingYan)}${t("PPM")}`}</p>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
