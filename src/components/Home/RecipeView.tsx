import { RecipeData } from "@/App";
import { FormData } from "../Nutrients/NutrientCalc";
import { useTranslation } from "react-i18next";
import { toBrix } from "@/helpers/unitConverters";
import calcSb from "@/helpers/calcSb";
import useAbv from "@/hooks/useAbv";

import lodash from "lodash";
function RecipeView({
  ingredients,
  units,
  volume,
  OG,
  FG,
  ABV,
  selected,
  inputs,
  outputs,
  nuteInfo,
  sorbate,
  sulfite,
  campden,
  additives,
  primaryNotes,
  secondaryNotes,
  recipeName,
  adding,
}: Partial<RecipeData> &
  Partial<FormData> & {
    nuteInfo: null | {
      ppmYan: number[];
      totalGrams: number[];
      perAddition: number[];
      totalYan: number;
      remainingYan: number;
      gf: {
        gf: number;
        gfWater: number;
        gfType?: string;
      };
    };
  } & {
    primaryNotes: string[][];
    secondaryNotes: string[][];
    recipeName?: string;
    adding: boolean;
  }) {
  const { t } = useTranslation();
  const isMetric = units?.weight === "kg" || units?.volume === "liter";
  function toC(num?: number) {
    if (!num) return "";
    return isMetric ? Math.round((num - 32) * (5 / 9)) : num;
  }
  const lowTemp = toC(selected?.yeastDetails.low_temp);
  const highTemp = toC(selected?.yeastDetails.high_temp);
  const tempString = `${t("PDF.tempRange")} ${lowTemp}-${highTemp}°${
    isMetric ? "C" : "F"
  }`;
  const ABVOBJ = OG && FG ? { OG, FG } : { OG: 1, FG: 1 };
  const { delle } = useAbv(ABVOBJ);

  const primary = ingredients?.filter(
    (item) => !item.secondary && item.details[0] > 0
  );
  const secondary =
    ingredients?.filter((item) => item.secondary && item.details[0] > 0) || [];
  const filteredAdditives =
    additives?.filter((item) => {
      return item.amount > 0 && item.name.length > 0;
    }) || [];

  const secondaryNotesExist =
    secondaryNotes.length > 0 &&
    (secondaryNotes[0][0].length > 0 || secondaryNotes[0][1].length > 0);

  const showPageTwo =
    secondary.length > 0 || secondaryNotesExist || filteredAdditives.length > 0;

  return (
    <div className="pdf-page">
      <div className="page-one">
        <header>
          <img src="/pdf-logo.png" />

          <h1>{recipeName ? recipeName : t("PDF.pageTitle")}</h1>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                <td>{t("PDF.totalVolume")}</td>
                <td> {t("PDF.yeast")}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>
                    {volume} {units && units.volume}
                  </p>
                  <p>
                    {nuteInfo &&
                      nuteInfo.gf.gf > 0 &&
                      `${nuteInfo.gf.gf}g ${
                        nuteInfo.gf.gfType || "Go-Ferm"
                      } ${t("PDF.with")} ${nuteInfo.gf.gfWater}ml ${t(
                        "water"
                      )}`}
                  </p>
                </td>
                <td>
                  <p>
                    {outputs &&
                      `${Math.round(outputs?.yeastAmount * 100) / 100}g ${t(
                        "PDF.of"
                      )} ${
                        selected?.yeastBrand !== "Other"
                          ? selected?.yeastBrand
                          : ""
                      } ${selected?.yeastDetails.name}`}
                  </p>
                  <p>{tempString}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <td>{t("PDF.estimatedOG")}</td>
                <td>{t("PDF.estimatedFG")}</td>
                <td>{t("PDF.tolerance")}</td>
                <td>{t("PDF.expectedABV")}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{OG !== undefined && Math.round(OG * 1000) / 1000}</p>
                  <p>
                    {OG !== undefined &&
                      `${Math.round(toBrix(OG) * 100) / 100} ${t("BRIX")}`}
                  </p>
                </td>
                <td>
                  <p>{FG && Math.round(FG * 1000) / 1000}</p>
                  <p>
                    {FG && `${Math.round(toBrix(FG) * 100) / 100} ${t("BRIX")}`}
                  </p>
                </td>
                <td>
                  <p>{`${selected?.yeastDetails.tolerance}%`}</p>
                  <p>
                    {OG !== undefined
                      ? `${t("PDF.sugarBreak")} ${
                          Math.round(calcSb(OG) * 1000) / 1000
                        }`
                      : ""}
                  </p>
                </td>
                <td>
                  <p>{ABV && Math.round(ABV * 100) / 100}%</p>
                  <p>
                    {Math.round(delle)} {t("DU")}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <td> {t("PDF.nutrient")}</td>
                <td>{t("PDF.numberOfAdditions")}</td>
                <td> {t("PDF.amount")}</td>
                <td> {t("PDF.total")}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t(`nuteSchedules.${selected?.schedule}`)}</td>
                <td>{inputs?.numberOfAdditions}</td>
                <td>
                  <p>
                    {nuteInfo &&
                      !isNaN(nuteInfo.perAddition[0]) &&
                      `${
                        Math.round(nuteInfo?.perAddition[0] * 100) / 100
                      }g Fermaid O`}
                  </p>
                  <p>
                    {nuteInfo &&
                      !isNaN(nuteInfo.perAddition[1]) &&
                      `${
                        Math.round(nuteInfo?.perAddition[1] * 100) / 100
                      }g Fermaid K`}
                  </p>
                  <p>
                    {nuteInfo &&
                      !isNaN(nuteInfo.perAddition[2]) &&
                      `${
                        Math.round(nuteInfo?.perAddition[2] * 100) / 100
                      }g DAP`}
                  </p>
                </td>
                <td>
                  <p>
                    {nuteInfo &&
                      !isNaN(nuteInfo.totalGrams[0]) &&
                      `${
                        Math.round(nuteInfo?.totalGrams[0] * 100) / 100
                      }g Fermaid O`}
                  </p>
                  <p>
                    {nuteInfo &&
                      !isNaN(nuteInfo.totalGrams[1]) &&
                      `${
                        Math.round(nuteInfo?.totalGrams[1] * 100) / 100
                      }g Fermaid K`}
                  </p>
                  <p>
                    {nuteInfo &&
                      !isNaN(nuteInfo.totalGrams[2]) &&
                      `${Math.round(nuteInfo?.totalGrams[2] * 100) / 100}g DAP`}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                {adding && <td>{t("PDF.stabilizers")}</td>}

                <td>{t("PDF.remaining")}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {adding && (
                  <td>
                    <p>
                      {sulfite &&
                        campden &&
                        `${Math.round(sulfite * 1000) / 1000}g ${t(
                          "PDF.kmeta"
                        )} ${t("accountPage.or")} ${
                          Math.round(campden * 10) / 10
                        } ${t("list.campden")}`}
                    </p>
                    <p>
                      {sorbate &&
                        `${Math.round(sorbate * 1000) / 1000}g ${t(
                          "PDF.ksorb"
                        )}`}
                    </p>
                  </td>
                )}
                <td>
                  {" "}
                  {nuteInfo
                    ? `${Math.round(nuteInfo?.remainingYan)}PPM`
                    : "0PPM"}
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <td>{t("PDF.primary")}</td>
                <td>
                  {t("PDF.weight")} {units && units.weight}
                </td>
                <td>
                  {t("PDF.volume")} {units && units.volume}
                </td>
              </tr>
            </thead>
            <tbody>
              {primary?.map((item, i) => (
                <tr key={item.name + i}>
                  <td>
                    {i + 1}. {t(`${lodash.camelCase(item.name)}`)}
                  </td>
                  <td>{item.details[0]}</td>
                  <td>{item.details[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section style={{ pageBreakAfter: "always" }}>
          {primaryNotes.length > 0 && primaryNotes[0][0].length > 0 && (
            <table>
              <thead>
                <tr>
                  <td>{t("PDF.primaryNotes")}</td>
                  <td> {t("PDF.details")}</td>
                </tr>
              </thead>
              <tbody>
                {primaryNotes.map((note, i) => {
                  return (
                    <tr key={"primary note #" + i}>
                      <td>
                        {i + 1}. {note[0]}
                      </td>
                      <td>{note[1]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
      {showPageTwo && (
        <div className="page-two">
          <div className="img-container">
            <img src="/pdf-logo.png" />
          </div>
          <section className="secondary-section">
            {secondary?.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <td>{t("PDF.secondary")}</td>
                    <td>
                      {t("PDF.weight")} {units && units.weight}
                    </td>
                    <td>
                      {t("PDF.volume")} {units && units.volume}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {secondary?.map((item, i) => (
                    <tr key={item.name + i}>
                      <td>
                        {i + 1}. {t(`${lodash.camelCase(item.name)}`)}
                      </td>
                      <td>{item.details[0]}</td>
                      <td>{item.details[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
          {filteredAdditives.length > 0 && (
            <section>
              <table>
                <thead>
                  <tr>
                    <td>Additives</td>

                    <td>Amount</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdditives?.map((item, i) => (
                    <tr key={"additive " + i}>
                      <td>
                        {i + 1}. {item.name}
                      </td>
                      <td>
                        {`${item.amount} ${
                          item.unit !== "units" ? item.unit : ""
                        }`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          {secondaryNotesExist && (
            <table>
              <thead>
                <tr>
                  <td>{t("PDF.secondaryNotes")}</td>
                  <td> {t("PDF.details")}</td>
                </tr>
              </thead>
              <tbody>
                {secondaryNotes.map((note, i) => {
                  return (
                    <tr key={"secondary note #" + i}>
                      <td>
                        {i + 1}. {note[0]}
                      </td>
                      <td>{note[1]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeView;
