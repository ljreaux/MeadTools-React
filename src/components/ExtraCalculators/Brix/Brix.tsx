import { useState } from "react";
import Title from "../../Title";
import useBrixUnitsChange from "../../../hooks/useBrixUnitsChange";
import { toBrix, toSG } from "../../../helpers/unitConverters";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

export interface Brix {
  value: number;
  unit: "SG" | "Brix";
}

export default function Brix() {
  const { t } = useTranslation();

  const [brixObj, setBrixObj] = useState<Brix>({
    value: 1,
    unit: "SG",
  });

  const handleUnitChange = (val: string) => {
    const unit = val;
    if (unit === "SG" || unit === "Brix")
      setBrixObj((prev) => ({ ...prev, unit: unit }));
  };

  useBrixUnitsChange({
    stateObj: brixObj,
    setterFunction: setBrixObj,
    propertyToChange: "value",
  });

  const displayString =
    brixObj.unit === "SG"
      ? `${Math.round(toBrix(brixObj.value) * 100) / 100} ${t("BRIX")}`
      : Math.round(toSG(brixObj.value) * 1000) / 1000;

  return (
    <div className="flex flex-col items-center justify-center w-11/12 gap-2 p-8 my-8 sm:w-1/2 rounded-xl bg-background ">
      <Title header={t("brixHeading")} />
      <label className="mx-2 my-2 text-center" htmlFor="gravity">
        {t("gravityLabel")}
      </label>
      <Input
        className="max-w-96"
        type="number"
        id="gravity"
        value={brixObj.value}
        onChange={(e) =>
          setBrixObj((prev) => ({ ...prev, value: Number(e.target.value) }))
        }
        onFocus={(e) => e.target.select()}
      />
      <p>{brixObj.unit === "Brix" ? t(brixObj.unit.toUpperCase()) : null}</p>
      <Select
        name="units"
        value={brixObj.unit}
        onValueChange={handleUnitChange}
      >
        <SelectTrigger className="max-w-96">
          <SelectValue placeholder={t("SG")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SG">{t("SG")}</SelectItem>
          <SelectItem value="Brix">{t("BRIX")}</SelectItem>
        </SelectContent>
      </Select>
      <p>{displayString}</p>
    </div>
  );
}
