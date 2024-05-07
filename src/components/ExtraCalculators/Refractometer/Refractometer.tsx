import { useState, FormEvent, useEffect } from "react";
import { toBrix, toSG } from "../../../helpers/unitConverters";
import Title from "../../Title";
import useAbv from "../../../hooks/useAbv";
import refracCalc from "../../../helpers/refracCalc";
import AbvLine from "../../AbvLine";
import { useTranslation } from "react-i18next";

export default function Refractometer() {
  const { t } = useTranslation();
  const [refrac, setRefrac] = useState({
    cf: 1,
    og: 1.1,
    units: "SG",
    fgInBrix: 8.5,
    fgInSg: Math.round(toSG(8.5) * 100) / 100,
    calcBrix: 0,
    calcSg: Math.round(toSG(0) * 100) / 100,
  });

  const og = refrac.units === "SG" ? refrac.og : toSG(refrac.og);

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setRefrac((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleUnitChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const unit = target.value;
    setRefrac((prev) => ({ ...prev, units: unit }));
  };

  const abv = useAbv({ OG: og, FG: refrac.calcSg });

  useEffect(() => {
    const { cf: corFac, og, fgInBrix: fgBr, units } = refrac;

    let actualFg = refracCalc(og, fgBr, corFac);
    if (units == "SG") actualFg = refracCalc(toBrix(og), fgBr, corFac);

    setRefrac((prev) => ({
      ...prev,
      calcSg: actualFg,
      calcBrix: toBrix(actualFg),
    }));
  }, [refrac.cf, refrac.og, refrac.fgInBrix, refrac.units]);

  return (
    <form className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header={t("refractometerHeading")} />
      <label htmlFor="cf">{t("correctionFactor")} </label>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        name="cf"
        id="cf"
        value={refrac.cf}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
      <label htmlFor="og">{t("ogLabel")} </label>
      <select
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        name="units"
        id="units"
        onChange={handleUnitChange}
      >
        <option value="SG">{t("SG")}</option>
        <option value="Brix">{t("BRIX")}</option>
      </select>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        name="og"
        id="og"
        value={refrac.og}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
      <label htmlFor="fg">{t("fgInBrix")} </label>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        name="fgInBrix"
        id="fg"
        value={refrac.fgInBrix}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
      <p>{Math.round(refrac.calcSg * 1000) / 1000}</p>
      <p>
        {Math.round(refrac.calcBrix * 100) / 100} {t("BRIX")}
      </p>
      <AbvLine {...abv} />
    </form>
  );
}
