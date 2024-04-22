import { FormEvent, useState } from "react";
import Title from "../../Title";
import { useTranslation } from "react-i18next";

export default function Sulfite() {
  const { t } = useTranslation();

  const [sulfite, setSulfite] = useState({
    batchSize: 1,
    units: "gallons",
    ppm: 50,
  });
  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setSulfite((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  const sulfiteAmount =
    sulfite.units === "gallons"
      ? (sulfite.batchSize * 3.785 * sulfite.ppm) / 570
      : (sulfite.batchSize * sulfite.ppm) / 570;

  return (
    <div>
      <Title header={t("sulfiteHeading")} />
      <div className="flex w-full justify-center gap-4 my-4">
        <label htmlFor="batchSize">{t("batchSize")} </label>
        <input
          type="number"
          id="batchSize"
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
          value={sulfite.batchSize}
        />
        <select
          name="units"
          id="units"
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        >
          <option value="gallons">Gallons</option>
          <option value="liters">Liters</option>
        </select>
      </div>
      <div className="flex w-full justify-center gap-4 my-4">
        <label htmlFor="ppm">{t("desiredPpm")} </label>
        <input
          type="number"
          name="ppm"
          id="ppm"
          onChange={handleChange}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
          value={sulfite.ppm}
        />
      </div>
      <p className="text-2xl my-4 text-center">
        {Math.round(sulfiteAmount * 1000) / 1000}g {t("kMeta")}
      </p>
    </div>
  );
}
