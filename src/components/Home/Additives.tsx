import Title from "../Title";
import { Additive } from "../../App";
import lodash from "lodash";
import { useTranslation } from "react-i18next";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import Tooltip from "../Tooltips";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

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
      dosage: 6,
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
    <div className="w-11/12 p-8 my-24 sm:w-9/12 rounded-xl bg-background">
      <div className="flex items-center justify-center gap-1">
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
      <Table>
        <TableBody>
          {additives.map((additive, i) => {
            return (
              <TableRow key={`additive ${i}`}>
                <TableCell>
                  <Input
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
                    onFocus={(e) => e.target.select()}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={additive.amount}
                    onChange={(e) => {
                      editAdditives(
                        { ...additive, amount: Number(e.target.value) },
                        i
                      );
                    }}
                    onFocus={(e) => e.target.select()}
                  />
                </TableCell>
                <TableCell className="flex items-center justify-between">
                  <Select
                    name="additiveUnits"
                    value={additive.unit}
                    onValueChange={(val) => {
                      editAdditives({ ...additive, unit: val }, i);
                    }}
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder={t("G")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">{t("G")}</SelectItem>
                      <SelectItem value="mg">{t("MG")}</SelectItem>
                      <SelectItem value="kg">{t("KG")}</SelectItem>
                      <SelectItem value="oz">{t("OZ")}</SelectItem>
                      <SelectItem value="lbs">{t("LBS")}</SelectItem>
                      <SelectItem value="ml">{t("ML")}</SelectItem>
                      <SelectItem value="liters">
                        {t("LIT").toLowerCase()}
                      </SelectItem>
                      <SelectItem value="fl oz">{t("FLOZ")}</SelectItem>
                      <SelectItem value="quarts">{t("QUARTS")}</SelectItem>
                      <SelectItem value="gal">{t("GALS")}</SelectItem>
                      <SelectItem value="tsp">{t("TSP")}</SelectItem>
                      <SelectItem value="tbsp">{t("TBSP")}</SelectItem>
                      <SelectItem value="units">{t("UNITS")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {additives.length > 1 && i !== 0 && (
                    <button onClick={() => deleteAdditive(i)}>
                      <FaMinusSquare />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-center ">
        <button
          className="flex items-center justify-center gap-4 px-8 py-2 my-4 text-lg border border-solid rounded-lg bg-background text-foreground hover:bg-foreground hover:border-background hover:text-background sm:gap-8 group"
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
