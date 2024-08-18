import { useEffect, useState } from "react";
import Title from "../Title";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Stabilizers({
  abv,
  batchVolume,
  volumeUnits,
  setSorbateSulfite,
}: {
  abv: number;
  batchVolume: number;
  volumeUnits: string;
  setSorbateSulfite: (
    sorbate?: number,
    sulfite?: number,
    campden?: number
  ) => void;
}) {
  const { t } = useTranslation();

  const [adding, setAdding] = useLocalStorage("addingStabilizers", {
    adding: false,
    pH: false,
    pHReading: 3.6,
  });
  const [amounts, setAmounts] = useState({
    sorbate: 0,
    sulfite: 0,
    campden: 0,
  });

  useEffect(() => {
    const { pHReading } = adding;
    const ph = Math.round(pHReading * 10) / 10;
    const vol =
      volumeUnits == "gal" ? batchVolume * 0.003785411784 : batchVolume / 1000;
    const sorbate = ((-abv * 25 + 400) / 0.75) * vol;
    let ppm = 50;
    if (ph <= 2.9) ppm = 11;
    if (ph == 3) ppm = 13;
    if (ph == 3.1) ppm = 16;
    if (ph == 3.2) ppm = 21;
    if (ph == 3.3) ppm = 26;
    if (ph == 3.4) ppm = 32;
    if (ph == 3.5) ppm = 39;
    if (ph == 3.6) ppm = 50;
    if (ph == 3.7) ppm = 63;
    if (ph == 3.8) ppm = 98;
    if (ph >= 3.9) ppm = 123;

    const sulfite =
      volumeUnits == "gal"
        ? (batchVolume * 3.785 * ppm) / 570
        : (batchVolume * ppm) / 570;
    const campden =
      volumeUnits !== "gal"
        ? (ppm / 75) * (batchVolume / 3.785)
        : (ppm / 75) * batchVolume;

    setAmounts({
      sulfite,
      sorbate,
      campden,
    });
    setSorbateSulfite(sorbate, sulfite, campden);
  }, [abv, batchVolume, volumeUnits, adding.pHReading]);

  return (
    <div className="w-11/12 p-8 my-24 sm:w-9/12 rounded-xl bg-background">
      <div className="flex items-center justify-center col-span-2 gap-1">
        {" "}
        <Title header={t("stabilizersHeading")} />
        <Tooltip
          body={t("tipText.stabilizers")}
          link="https://meadmaking.wiki/en/process/stabilization"
        />
      </div>
      <Table>
        <TableHeader>
          <TableHead>
            <span className="grid gap-2">
              {t("adding")}
              <Select
                name="adding"
                value={adding.adding ? "yes" : "no"}
                onValueChange={(val) => {
                  if (val === "no") setSorbateSulfite();

                  setAdding({ ...adding, adding: val === "yes" });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("no")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">{t("no")}</SelectItem>
                  <SelectItem value="yes">{t("yes")}</SelectItem>
                </SelectContent>
              </Select>
            </span>
          </TableHead>

          <TableHead>
            <span className="grid gap-2">
              {t("pH")}
              <Select
                name="phReading"
                value={adding.pH ? "yes" : "no"}
                onValueChange={(val) =>
                  setAdding({
                    ...adding,
                    pH: val === "yes",
                    pHReading: 3.6,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("no")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">{t("no")}</SelectItem>
                  <SelectItem value="yes">{t("yes")}</SelectItem>
                </SelectContent>
              </Select>
            </span>
          </TableHead>
        </TableHeader>

        {adding.adding && (
          <>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Input
                    type="number"
                    disabled={!adding.pH}
                    value={adding.pHReading}
                    onChange={(e) =>
                      setAdding({
                        ...adding,
                        pHReading: e.target.valueAsNumber,
                      })
                    }
                    onFocus={(e) => e.target.select()}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>{t("kSorbate")}</TableCell>
                <TableCell id="k-sorb">{`${
                  amounts.sorbate > 0
                    ? `${Math.round(amounts.sorbate * 10000) / 10000}g`
                    : t("noSorb")
                }`}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>{t("kMeta")}</TableCell>
                <TableCell>
                  {Math.round(amounts.sulfite * 10000) / 10000}g{" "}
                  {t("accountPage.or")}{" "}
                  <span>
                    {Math.round(amounts.campden * 10) / 10} {t("list.campden")}
                    <Tooltip body={t("tipText.campden")} />
                  </span>
                </TableCell>
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
    </div>
  );
}
