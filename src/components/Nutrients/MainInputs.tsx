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
  maxGpl: FormData["maxGpl"];
}

export default function MainInputs({
  yeasts,
  selected,
  inputs,
  maxGpl,
  setData,
  setYeasts,
}: MainInputs & {
  setData: Dispatch<SetStateAction<FormData>>;
  yeasts: YeastType;
  setYeasts: Dispatch<SetStateAction<YeastType>>;
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
    selected?.volumeUnits
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

  return (
    <>
      {!loading ? (
        <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-2 sm:p-8 mt-24 mb-8 aspect-video text-xs sm:text-base text-wrap">
          <Title header={t("nutesHeading")} />
          <form
            action=""
            className="grid grid-cols-5 justify-center text-center"
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
                className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              >
                <option value="gal">{t("GAL")}</option>
                <option value="liter">{t("LIT")}</option>
              </select>
            </div>
            <label htmlFor="specificGravity">{t("nuteSgLabel")}</label>
            <label htmlFor="offsetPpm">{t("offset")}</label>
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
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
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
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
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

            <label htmlFor="n2Requirement">{t("n2Requirement.label")}</label>
            <label htmlFor="schedule">{t("nuteSchedules.label")}</label>
            <label htmlFor="targetYan">{t("targetYan")}</label>
            <label htmlFor="numberOfAdditions">{t("numberOfAdditions")}</label>
            <label htmlFor="yeastAmount">{t("yeastAmount")}</label>

            <select
              name="n2Requirement"
              id="n2Requirement"
              value={selected.n2Requirement}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
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
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
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
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <input
              type="number"
              value={yeastAmount}
              onChange={(e) => setYeastAmount(Number(e.target.value))}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
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
