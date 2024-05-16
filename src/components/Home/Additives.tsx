import Title from "../Title";
import { Additive } from "../../App";
import lodash from "lodash";
import { useTranslation } from "react-i18next";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import Tooltip from "../Tooltips";

export default function Additives({
  additives,
  editAdditives,
  addAdditive,
  deleteAdditive,
  volumeUnits,
  batchVolume,
}: {
  additives: Additive[];
  editAdditives: (obj: Additive, index: number) => void;
  addAdditive: () => void;
  deleteAdditive: (index: number) => void;
  volumeUnits: string;
  batchVolume: number;
}) {
  const { t } = useTranslation();
  const additiveDosage = [
    {
      name: t(lodash.camelCase("FT Rouge")),
      dosage: 1.3,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Opti-Red")}`),
      dosage: 1,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("FT Blanc Soft")}`),
      dosage: 0.2,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Opti-White")}`),
      dosage: 1.9,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Tannin Complex")}`),
      dosage: 0.2,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Tannin Riche Extra")}`),
      dosage: 0.2,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Bentonite")}`),
      dosage: 6,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Chitosan")}`),
      dosage: 1.5,
      unit: "ml",
    },
    {
      name: t(`list.${lodash.camelCase("Kieselsol")}`),
      dosage: 1,
      unit: "ml",
    },
    {
      name: t(`list.${lodash.camelCase("Sparkolloid")}`),
      dosage: 0.6,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Pectic Enzyme")}`),
      dosage: 0.4,
      unit: "tsp",
    },
    {
      name: t(`list.${lodash.camelCase("Lallzyme EX-V")}`),
      dosage: 0.075,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Lallzyme EX")}`),
      dosage: 0.1,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Lallzyme C-Max")}`),
      dosage: 0.06,
      unit: "g",
    },
    {
      name: t(`list.${lodash.camelCase("Oak Chips")}`),
      dosage: 0.25,
      unit: "oz",
    },
    {
      name: t(`list.${lodash.camelCase("Oak Spirals")}`),
      dosage: 1,
      unit: "units",
    },
    {
      name: t(`list.${lodash.camelCase("Oak Cubes")}`),
      dosage: 0.5,
      unit: "oz",
    },
  ];

  return (
    <div className="grid grid-cols-4 w-11/12 sm:w-9/12 items-center justify-center rounded-xl bg-sidebar p-8 my-24">
      <div className="col-span-4 flex justify-center gap-1 items-center">
        <Title header={t("additivesHeading")} />
        <Tooltip body={t("tipText.additives")} />
      </div>
      <datalist id="additives">
        <option
          value={t(`list.${lodash.camelCase("Red Wine Tannin")}`)}
        ></option>
        <option value={t(`list.${lodash.camelCase("FT Rouge")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Opti-Red")}`)}></option>
        <option value={t(`list.${lodash.camelCase("FT Blanc Soft")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Opti-White")}`)}></option>
        <option
          value={t(`list.${lodash.camelCase("Tannin Complex")}`)}
        ></option>
        <option
          value={t(`list.${lodash.camelCase("Tannin Riche Extra")}`)}
        ></option>
        <option value={t(`list.${lodash.camelCase("Citric Acid")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Malic Acid")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Tartaric Acid")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Bentonite")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Chitosan")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Kieselsol")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Sparkolloid")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Pectic Enzyme")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Lallzyme EX-V")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Lallzyme EX")}`)}></option>
        <option
          value={t(`list.${lodash.camelCase("Lallzyme C-Max")}`)}
        ></option>
        <option value={t(`list.${lodash.camelCase("Oak Chips")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Oak Spirals")}`)}></option>
        <option value={t(`list.${lodash.camelCase("Oak Cubes")}`)}></option>
        <option
          value={t(`list.${lodash.camelCase("Potassium Carbonate")}`)}
        ></option>
      </datalist>
      {additives.map((additive, i) => {
        return (
          <div key={i + additive.name} className="col-span-4 flex">
            <input
              type="text"
              list="additives"
              id="additionalIngredients"
              value={additive.name}
              onChange={(e) => {
                const multiplier = volumeUnits === "liter" ? 0.264172 : 1;
                const details = additiveDosage.find(
                  (additive) => additive.name === e.target.value
                );
                if (details) {
                  editAdditives(
                    {
                      name: details.name,
                      amount:
                        Math.round(
                          details.dosage * multiplier * batchVolume * 1000
                        ) / 1000,
                      unit: details.unit,
                    },
                    i
                  );
                } else {
                  editAdditives({ ...additive, name: e.target.value }, i);
                }
              }}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              onFocus={(e) => e.target.select()}
            />
            <input
              type="number"
              value={additive.amount}
              onChange={(e) => {
                editAdditives(
                  { ...additive, amount: Number(e.target.value) },
                  i
                );
              }}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              onFocus={(e) => e.target.select()}
            />
            <select
              name="additiveUnits"
              id="additiveUnits"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              value={additive.unit}
              onChange={(e) => {
                editAdditives({ ...additive, unit: e.target.value }, i);
              }}
            >
              <option value="g">{t("G")}</option>
              <option value="mg">{t("MG")}</option>
              <option value="kg">{t("KG")}</option>
              <option value="oz">{t("OZ")}</option>
              <option value="lbs">{t("LBS")}</option>
              <option value="ml">{t("ML")}</option>
              <option value="liters">{t("LIT").toLowerCase()}</option>
              <option value="fl oz">{t("FLOZ")}</option>
              <option value="quarts">{t("QUARTS")}</option>
              <option value="gal">{t("GALS")}</option>
              <option value="tsp">{t("TSP")}</option>
              <option value="tbsp">{t("TBSP")}</option>
              <option value="units">{t("UNITS")}</option>
            </select>
            {additives.length > 1 && i !== 0 && (
              <button className="ml-4" onClick={() => deleteAdditive(i)}>
                <FaMinusSquare />
              </button>
            )}
          </div>
        );
      })}

      <div className="col-span-4 flex justify-center">
        <button
          className="bg-background rounded-2xl border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4 flex justify-center items-center"
          type="button"
          onClick={addAdditive}
          disabled={additives.length >= 10}
        >
          <FaPlusSquare />
        </button>
      </div>
    </div>
  );
}
