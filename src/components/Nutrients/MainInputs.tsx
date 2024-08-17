import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import lodash from "lodash";
import { FormData } from "./NutrientCalc";
import Title from "../Title";
import FirstLineInputs from "./FirstLineInputs";
import useTargetYan from "../../hooks/useTargetYan";
import useYeastAmount from "../../hooks/yeastAmount";
import getAllYeasts from "../../helpers/getAllYeasts";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";
import Tooltip from "../Tooltips";
export interface YeastType {
  Lalvin: Yeast[];
  Fermentis: Yeast[];
  MangroveJack: Yeast[];
  RedStar: Yeast[];
  Other: Yeast[];
}
export type Yeast = {
  brand: string;
  id: number;
  name: string;
  nitrogen_requirement: string;
  tolerance: number | string;
  low_temp: number;
  high_temp: number;
};

interface MainInputs {
  selected: FormData["selected"];
  inputs: FormData["inputs"];
  outputs: FormData["outputs"];
  maxGpl: FormData["maxGpl"];
}

export default function MainInputs({
  yeasts,
  selected,
  inputs,
  outputs,
  maxGpl,
  setData,
  setYeasts,
  recalc,
  setRecalc,
}: MainInputs & {
  setData: Dispatch<SetStateAction<FormData>>;
  yeasts: YeastType;
  setYeasts: Dispatch<SetStateAction<YeastType>>;
  recalc: boolean;
  setRecalc: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getYeasts() {
      try {
        const allYeasts = await getAllYeasts();
        const Lalvin: [] = await allYeasts.filter(
          (yeast: Yeast) => yeast.brand == "Lalvin"
        );
        const Fermentis = await allYeasts.filter(
          (yeast: Yeast) => yeast.brand == "Fermentis"
        );
        const MangroveJack = await allYeasts.filter(
          (yeast: Yeast) => yeast.brand == "Mangrove Jack"
        );
        const RedStar = allYeasts.filter(
          (yeast: Yeast) => yeast.brand == "Red Star"
        );
        const Other = await allYeasts.filter(
          (yeast: Yeast) => yeast.brand == "Other"
        );

        const data = {
          Lalvin,
          Fermentis,
          MangroveJack,
          RedStar,
          Other,
        };

        setYeasts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getYeasts();
  }, []);
  const { t } = useTranslation();
  const keyArr = Object.keys(maxGpl);
  const handleSelected = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLFormElement;
    setData((prev) => ({
      ...prev,
      selected: { ...prev.selected, [target.name]: target.value },
    }));
  };

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLFormElement;
    setData((prev) => ({
      ...prev,
      inputs: { ...prev.inputs, [target.name]: Number(target.value) },
    }));
  };

  useEffect(() => {
    const yeastDetails = yeasts[selected.yeastBrand].find(
      (yeast: Yeast) => yeast.name === selected.yeastStrain
    );
    setData((prev) => {
      return yeastDetails
        ? {
            ...prev,
            selected: {
              ...prev.selected,
              yeastDetails: { ...yeastDetails },
              n2Requirement: yeastDetails.nitrogen_requirement,
            },
          }
        : prev;
    });
  }, [selected.yeastBrand, selected.yeastStrain]);

  const { target } = useTargetYan(
    selected?.n2Requirement,
    inputs?.sg,
    inputs?.offset
  );

  const { yeastAmount, setYeastAmount } = useYeastAmount(
    inputs?.volume,
    inputs?.sg,
    selected?.volumeUnits,
    outputs.yeastAmount,
    recalc
  );

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      outputs: {
        targetYan: target.target,
        yeastAmount,
      },
    }));
  }, [target, yeastAmount]);

  useEffect(() => {
    setRecalc(true);
  }, [target]);

  return (
    <>
      {!loading ? (
        <div className="flex flex-col items-center justify-center w-11/12 p-2 mt-24 mb-8 text-xs sm:w-9/12 rounded-xl bg-background sm:p-8 aspect-video sm:text-base text-wrap">
          <Title header={t("nutesHeading")} />
          <form
            action=""
            className="grid justify-center grid-cols-5 text-center"
          >
            <label htmlFor="yeastBrand">{t("yeastBrand")}</label>
            <label htmlFor="yeastStrain">{t("yeastStrain")}</label>
            <div>
              <label htmlFor="volume">{t("nuteVolume")}</label>
              <select
                onChange={handleSelected}
                value={selected.volumeUnits}
                name="volumeUnits"
                id="volumeUnits"
                className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
              >
                <option value="gal">{t("GAL")}</option>
                <option value="liter">{t("LIT")}</option>
              </select>
            </div>
            <label
              htmlFor="specificGravity"
              className="flex items-center justify-center gap-1"
            >
              {t("nuteSgLabel")} <Tooltip body={t("tipText.nutrientSg")} />
            </label>
            <label
              htmlFor="offsetPpm"
              className="flex items-center justify-center gap-1"
            >
              {t("offset")}
              <Tooltip body={t("tipText.offsetPpm")} />
            </label>
            <select
              onChange={(e) =>
                setData((prev) => {
                  const target = e.target as HTMLSelectElement;
                  return target.value === "Lalvin" ||
                    target.value === "Fermentis" ||
                    target.value === "MangroveJack" ||
                    target.value === "RedStar" ||
                    target.value === "Other"
                    ? {
                        ...prev,
                        selected: {
                          ...prev.selected,
                          [e.target.name]: e.target.value,
                          yeastStrain: yeasts[target.value][0].name,
                        },
                      }
                    : prev;
                })
              }
              name="yeastBrand"
              id="yeastBrand"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
            >
              {Object.keys(yeasts).map((yeast) => {
                return (
                  <option key={yeast} value={yeast}>
                    {t(`${lodash.camelCase(yeast)}.label`)}
                  </option>
                );
              })}
            </select>
            <select
              value={selected.yeastStrain}
              onChange={handleSelected}
              name="yeastStrain"
              id="yeastStrain"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
            >
              {yeasts[selected.yeastBrand].map((yeast) => (
                <option key={yeast.name} value={yeast.name}>
                  {t(
                    `${lodash.camelCase(
                      selected.yeastBrand
                    )}.yeasts.${lodash.camelCase(yeast.name)}`
                  )}
                </option>
              ))}
            </select>
            <FirstLineInputs inputs={inputs} handleChange={handleChange} />

            <label
              htmlFor="n2Requirement"
              className="flex flex-col items-center justify-center gap-1"
            >
              {t("n2Requirement.label")}
              <Tooltip body={t("tipText.nitrogenRequirements")} />
            </label>
            <label
              htmlFor="schedule"
              className="flex flex-col items-center justify-center gap-1"
            >
              {t("nuteSchedules.label")}
              <Tooltip
                body={t("tipText.preferredSchedule")}
                link="https://meadmaking.wiki/en/process/nutrient_schedules"
              />
            </label>
            <label
              htmlFor="targetYan"
              className="flex flex-col items-center justify-center"
            >
              {t("targetYan")}
              <Tooltip body={t("tipText.yan")} />
            </label>
            <label
              htmlFor="numberOfAdditions"
              className="flex flex-col items-center justify-center"
            >
              {t("numberOfAdditions")}
              <Tooltip body={t("tipText.numberOfAdditions")} />
            </label>
            <label
              htmlFor="yeastAmount"
              className="flex flex-col items-center justify-center"
            >
              {t("yeastAmount")}
              <Tooltip body={t("tipText.yeastAmount")} />
            </label>

            <select
              name="n2Requirement"
              id="n2Requirement"
              value={selected.n2Requirement}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
              onChange={handleSelected}
            >
              <option value="Low">{t("n2Requirement.low")}</option>
              <option value="Medium">{t("n2Requirement.medium")}</option>
              <option value="High">{t("n2Requirement.high")}</option>
              <option value="Very High">{t("n2Requirement.veryHigh")}</option>
            </select>

            <select
              name="schedule"
              id="schedule"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
              value={selected.schedule}
              onChange={handleSelected}
            >
              {maxGpl &&
                keyArr.map((key) => {
                  return (
                    <option key={key} value={key}>
                      {t(`nuteSchedules.${key}`)}
                    </option>
                  );
                })}
            </select>
            <p id="targetYan">{target.targetString}</p>
            <select
              value={inputs?.numberOfAdditions}
              onChange={handleChange}
              name="numberOfAdditions"
              id="numberOfAdditions"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <input
              type="number"
              value={yeastAmount}
              onChange={(e) => {
                setRecalc(false);
                setYeastAmount(Number(e.target.value));
              }}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-11/12 my-2"
              onFocus={(e) => e.target.select()}
            />
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
