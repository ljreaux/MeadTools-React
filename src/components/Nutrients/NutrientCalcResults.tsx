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

export default function NutrientCalcResults({
  gplArr,
  yanContribution,
  inputs,
  selected,
  outputs,
  yanFromSource,
  advanced,
  setGplArr,
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
      };
    }>
  >;
}) {
  const { t } = useTranslation();
  const [gfType, setGfType] = useState("Go-Ferm");
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

  useEffect(() => {
    setNuteInfo({ ...nutrients, gf: { gf, gfWater } });
  }, [nutrients, gf, gfWater]);

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 mb-8 mt-24 aspect-video">
      <Title header={t("nuteResults.label")} />
      <form
        action=""
        className="grid grid-cols-5 justify-center items-center text-center"
      >
        <h2 className="col-start-2">{t("nutrients.fermO")}</h2>
        <h2>{t("nutrients.fermK")}</h2>
        <h2>{t("nutrients.dap")}</h2>

        <label className="mt-[2.5em]">
          Go Ferm (g)
          <select
            name="go-ferm"
            id="go-ferm"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            onChange={(e) => setGfType(e.target.value)}
          >
            <option value="Go-Ferm">{t("nuteResults.gfTypes.gf")}</option>
            <option value="protect">
              {t("nuteResults.gfTypes.gfProtect")}
            </option>
            <option value="sterol-flash">
              {t("nuteResults.gfTypes.gfSterol")}
            </option>
            <option value="none">{t("nuteResults.gfTypes.none")}</option>
          </select>
        </label>

        <label className="my-[.25rem] col-start-1" htmlFor="maxGpl">
          {t("nuteResults.sideLabels.maxGpl")}
        </label>
        <div className="col-span-3 grid grid-cols-3" id="maxGpl">
          <input
            type="number"
            name="fermOgpl"
            id="fermOgpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
            disabled={advanced}
            value={gplArr[0]}
            onChange={(e) => handleChange(e, 0)}
            onFocus={(e) => e.target.select()}
          />
          <input
            type="number"
            name="fermKgpl"
            id="fermKgpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
            disabled={advanced}
            value={gplArr[1]}
            onChange={(e) => handleChange(e, 1)}
            onFocus={(e) => e.target.select()}
          />
          <input
            type="number"
            name="DapGpl"
            id="DapGpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
            disabled={advanced}
            value={gplArr[2]}
            onChange={(e) => handleChange(e, 2)}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <p>{`${gf}g`}</p>

        <label className="my-[.25rem]" htmlFor="ppmYan">
          {t("nuteResults.sideLabels.ppmYan")}
        </label>
        <div className="col-span-3 grid grid-cols-3" id="ppmYan">
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
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
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
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
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
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
        </div>
        <label className="my-[.25rem]" htmlFor="goFermWater">
          {t("nuteResults.gfWater")}
        </label>
        <label className="my-[.25rem]" htmlFor="totalGrams">
          {t("nuteResults.sideLabels.totalGrams")}
        </label>
        <div className="col-span-3 grid grid-cols-3" id="totalGrams">
          {nutrients.totalGrams.map((grams, index) => (
            <input
              key={index}
              value={`${Math.round(grams * 100) / 100}g`}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              disabled
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <p>{`${gfWater}ml`}</p>

        <label className="my-[.25rem]" htmlFor="perAddition">
          {t("nuteResults.sideLabels.perAddition")}
        </label>
        <div className="col-span-3 grid grid-cols-3" id="perAddition">
          {nutrients.perAddition.map((grams, index) => (
            <input
              key={index}
              value={`${Math.round(grams * 100) / 100}g`}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              disabled
            />
          ))}
        </div>
        <label className="my-[.25rem]" htmlFor="oneThird">
          {t("nuteResults.sb")}
        </label>
        <p className="col-start-5">
          {calcSb(inputs.sg)},{" "}
          {Math.round(toBrix(calcSb(inputs.sg)) * 100) / 100}
          {t("BRIX")}
        </p>
        <label htmlFor="totalYan" className="col-span-3 my-[.25rem]">
          {t("nuteResults.sideLabels.totalYan")}
          <p>{`${Math.round(nutrients.totalYan)}${t("PPM")}`}</p>
        </label>
        <label htmlFor="remainingYan" className="col-span-2 my-[.25rem]">
          {t("nuteResults.sideLabels.remainingYan")}
          <p>{`${Math.round(nutrients.remainingYan)}${t("PPM")}`}</p>
        </label>
      </form>
    </div>
  );
}
