import { FormEvent, useState } from "react";
import {
  toFahrenheit,
  temperatureCorrection,
} from "../../../helpers/temperature";
import { toBrix } from "../../../helpers/unitConverters";
import Title from "../../Title";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TempCorrection() {
  const { t } = useTranslation();
  const [tempObj, setTempObj] = useState({
    measured: 1.1,
    tempUnits: "F",
    curTemp: 90,
    calTemp: 68,
  });

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setTempObj((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  const result =
    tempObj.tempUnits === "F"
      ? temperatureCorrection(
          tempObj.measured,
          tempObj.curTemp,
          tempObj.calTemp
        )
      : temperatureCorrection(
          tempObj.measured,
          toFahrenheit(tempObj.curTemp),
          toFahrenheit(tempObj.calTemp)
        );
  const resultBrix = toBrix(result);

  return (
    <form className="flex flex-col items-center justify-center w-11/12 p-8 my-40 md:my-8 sm:w-1/2 rounded-xl bg-background">
      <Title header={t("tempCorrectionHeading")} />
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>{t("measuredSG")} </TableHead>
            <TableCell>
              <Input
                type="number"
                id="measured"
                value={tempObj.measured}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {Math.round(toBrix(tempObj.measured) * 100) / 100} {t("Brix")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("curTemp")} </TableHead>
            <TableCell>
              <Input
                type="number"
                id="curTemp"
                value={tempObj.curTemp}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <Select
                name="deg"
                onValueChange={(val) => {
                  setTempObj((prev) => ({ ...prev, tempUnits: val }));
                }}
                value={tempObj.tempUnits}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F">{t("FAR")}</SelectItem>
                  <SelectItem value="C">{t("CEL")}</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("calTemp")} </TableHead>
            <TableCell colSpan={2}>
              <Input
                type="number"
                id="calTemp"
                value={tempObj.calTemp}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <span className="flex items-center justify-center text-lg">
                {Math.round(result * 1000) / 1000},{" "}
                {Math.round(resultBrix * 100) / 100} {t("Brix")}
              </span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </form>
  );
}
