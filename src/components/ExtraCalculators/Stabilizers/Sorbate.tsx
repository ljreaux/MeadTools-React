import { FormEvent, useState } from "react";
import Title from "../../Title";
import { useTranslation } from "react-i18next";

export default function Sorbate() {
  const { t } = useTranslation();
  const [sorbate, setSorbate] = useState({
    batchSize: 1,
    units: "gallons",
    abv: 12,
  });

  const sorbateAmount =
    sorbate.units === "gallons"
      ? ((-sorbate.abv * 25 + 400) / 0.75) * sorbate.batchSize * 0.003785411784
      : (((-sorbate.abv * 25 + 400) / 0.75) * sorbate.batchSize) / 1000;

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setSorbate((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };
  return (
    <div>
      <Title header={t("sorbateHeading")} />
      <div className="flex w-full justify-center gap-4 my-4">
        <label htmlFor="batchSize">{t("batchSize")} </label>
        <input
          type="number"
          id="batchSize"
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
          value={sorbate.batchSize}
        />
        <select
          name="units"
          id="units"
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        >
          <option value="gallons">{t("GAL")}</option>
          <option value="liters">{t("LIT")}</option>
        </select>
      </div>
      <div className="flex w-full justify-center gap-4">
        <label htmlFor="abv">{t("ABV")}: </label>
        <input
          id="abv"
          type="number"
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
          value={sorbate.abv}
        />
      </div>
      <p className="text-2xl my-4 text-center">
        {Math.round(sorbateAmount * 1000) / 1000}g {t("kSorb")}
      </p>
    </div>
  );
}
