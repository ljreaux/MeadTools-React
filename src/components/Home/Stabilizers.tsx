import { useEffect, useState } from "react";
import Title from "../Title";
import { useTranslation } from "react-i18next";

export default function Stabilizers({
  abv,
  batchVolume,
  volumeUnits,
  setSorbateSulfite,
}: {
  abv: number;
  batchVolume: number;
  volumeUnits: string;
  setSorbateSulfite: (sorbate?: number, sulfite?: number) => void;
}) {
  const { t } = useTranslation();
  const [adding, setAdding] = useState({
    adding: false,
    pH: false,
    pHReading: 3.6,
  });
  const [amounts, setAmounts] = useState({
    sorbate: 0,
    sulfite: 0,
  });

  useEffect(() => {
    const { pHReading } = adding;
    const ph = Math.round(pHReading * 10) / 10;
    const vol =
      volumeUnits == "gal" ? batchVolume * 0.003785411784 : batchVolume / 1000;
    const sorbate = ((-abv * 25 + 400) / 0.75) * vol;
    console.log(abv, volumeUnits, batchVolume, vol, sorbate);
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

    setAmounts({
      sulfite,
      sorbate,
    });
    setSorbateSulfite(sorbate, sulfite);
  }, [abv, batchVolume, volumeUnits, adding.pHReading]);

  return (
    <div className="grid grid-cols-2 w-11/12 sm:w-9/12 items-center justify-center rounded-xl bg-sidebar p-8 my-24">
      <div className="col-span-2 flex justify-center items-center">
        {" "}
        <Title header={t("stabilizersHeading")} />
      </div>
      <div>
        <label htmlFor="adding">{t("adding")}</label>
        <select
          name="adding"
          id="adding"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
          value={adding.adding ? "yes" : "no"}
          onChange={(e) => {
            if (e.target.value === "no") setSorbateSulfite();

            setAdding({ ...adding, adding: e.target.value === "yes" });
          }}
        >
          <option value="no">{t("no")}</option>
          <option value="yes">{t("yes")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="phReading">{t("pH")}</label>
        <select
          name="phReading"
          id="phReading"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
          value={adding.pH ? "yes" : "no"}
          onChange={(e) =>
            setAdding({
              ...adding,
              pH: e.target.value === "yes",
              pHReading: 3.6,
            })
          }
        >
          <option value="no">{t("no")}</option>
          <option value="yes">{t("yes")}</option>
        </select>
      </div>
      {adding.adding && (
        <>
          <div className="flex gap-4">
            <label htmlFor="k-sorb">{t("kSorbate")}</label>
            <p id="k-sorb">{`${
              amounts.sorbate > 0
                ? `${Math.round(amounts.sorbate * 10000) / 10000}g`
                : t("noSorb")
            }`}</p>
          </div>
          <input
            type="number"
            disabled={!adding.pH}
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
            value={adding.pHReading}
            onChange={(e) =>
              setAdding({ ...adding, pHReading: e.target.valueAsNumber })
            }
            onFocus={(e) => e.target.select()}
          />
          <div className="col-span-2 flex gap-4">
            <label htmlFor="k-meta">{t("kSulfite")}</label>
            <p id="k-meta">{Math.round(amounts.sulfite * 10000) / 10000}g</p>
          </div>
        </>
      )}
    </div>
  );
}
