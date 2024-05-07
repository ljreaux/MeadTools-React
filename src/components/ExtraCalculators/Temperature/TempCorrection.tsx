import { FormEvent, useState } from "react";
import {
  toFahrenheit,
  temperatureCorrection,
} from "../../../helpers/temperature";
import { toBrix } from "../../../helpers/unitConverters";
import Title from "../../Title";
import { useTranslation } from "react-i18next";

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
    <form className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header={t("tempCorrectionHeading")} />
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="measured">{t("measuredSG")} </label>
        <input
          type="number"
          id="measured"
          value={tempObj.measured}
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        />
        <p>
          {Math.round(toBrix(tempObj.measured) * 100) / 100} {t("Brix")}
        </p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="curTemp">{t("curTemp")} </label>
        <input
          type="number"
          id="curTemp"
          value={tempObj.curTemp}
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        />
        <select
          name="deg"
          id="tempUnits"
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        >
          <option value="F">{t("FAR")}</option>
          <option value="C">{t("CEL")}</option>
        </select>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="calTemp">{t("calTemp")} </label>
        <input
          type="number"
          id="calTemp"
          value={tempObj.calTemp}
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        />
      </div>
      <p className="text-2xl my-4 text-center">
        {Math.round(result * 1000) / 1000}, {Math.round(resultBrix * 100) / 100}{" "}
        {t("Brix")}
      </p>
    </form>
  );
}
