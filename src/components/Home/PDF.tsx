import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/full-logo.png";
import { RecipeData } from "../../App";
import { useTranslation } from "react-i18next";
import lodash from "lodash";
import { toBrix } from "../../helpers/unitConverters";
import useAbv from "../../hooks/useAbv.ts";
import { FormData } from "../Nutrients/NutrientCalc";
import calcSb from "../../helpers/calcSb";
import i18n from "../../localization/i18n.ts";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    fontFamily: "Times-Roman",
    fontSize: 12,
    boxSizing: "border-box",
  },
  section: {
    width: "90vw",
  },
  image: {
    maxWidth: "50vw",
    margin: 0,
    padding: 0,
  },
  sectionTwo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tableAlign: {
    textAlign: "center",
    margin: 0,
    padding: 0,
    border: "1px solid black",
  },
});

// Create Document Component
const MyDocument = ({
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
  additives,
  primaryNotes,
  secondaryNotes,
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
      };
    };
  } & {
    primaryNotes: string[][];
    secondaryNotes: string[][];
  }) => {
  const { t } = useTranslation();
  const ABVOBJ = OG && FG ? { OG, FG } : { OG: 1, FG: 1 };
  const { delle } = useAbv(ABVOBJ);
  const primary = ingredients?.filter(
    (item) => !item.secondary && item.details[0] > 0
  );
  const secondary = ingredients?.filter(
    (item) => item.secondary && item.details[0] > 0
  );

  const filteredAdditives = additives?.filter((item) => {
    return item.amount > 0 && item.name.length > 0;
  });
  return (
    <Document title="MeadTools Recipe PDF" language={i18n.language}>
      <Page size="A4" style={styles.page} wrap>
        <View
          fixed
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={logo} style={styles.image} />
          <Text style={{ marginTop: "-8%", paddingBottom: 8, fontSize: 24 }}>
            {t("PDF.pageTitle")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={[styles.section, { flexDirection: "row" }]}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  width: "50%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                  border: "1px solid black",
                }}
              >
                {t("PDF.totalVolume")}
              </Text>
              <Text
                style={{
                  width: "50%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                  border: "1px solid black",
                }}
              >
                {t("PDF.yeast")}
              </Text>
              <Text
                style={{
                  width: "50%",
                  border: "1px solid black",
                  paddingTop: 6,
                }}
              >
                {volume} {units && units.volume}
              </Text>
              <View
                style={{
                  width: "50%",
                  border: "1px solid black",
                  flexWrap: "wrap",
                }}
              >
                <Text>
                  {outputs &&
                    `${Math.round(outputs?.yeastAmount * 100) / 100}g ${t(
                      "PDF.of"
                    )} ${
                      selected?.yeastBrand !== "Other"
                        ? selected?.yeastBrand
                        : ""
                    } ${selected?.yeastDetails.name}`}
                </Text>
                <Text>
                  {`${t("PDF.tempRange")} ${selected?.yeastDetails.low_temp}-${
                    selected?.yeastDetails.high_temp
                  }°F`}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.estimatedOG")}
                </Text>
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.estimatedFG")}
                </Text>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                    flexDirection: "column",
                  }}
                >
                  <Text>
                    {OG !== undefined && Math.round(OG * 1000) / 1000}
                  </Text>
                  <Text>
                    {OG !== undefined &&
                      `${Math.round(toBrix(OG) * 100) / 100} ${t("BRIX")}`}
                  </Text>
                </View>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                    flexDirection: "column",
                  }}
                >
                  <Text>{FG && Math.round(FG * 1000) / 1000}</Text>
                  <Text>
                    {FG && `${Math.round(toBrix(FG) * 100) / 100} ${t("BRIX")}`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.tolerance")}
                </Text>
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.expectedABV")}
                </Text>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                    flexWrap: "wrap",
                  }}
                >
                  <Text>{`${selected?.yeastDetails.tolerance}%`}</Text>
                  <Text>
                    {OG !== undefined
                      ? `${t("PDF.sugarBreak")} ${
                          Math.round(calcSb(OG) * 1000) / 1000
                        }`
                      : ""}
                  </Text>
                </View>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  <Text>{ABV && Math.round(ABV * 100) / 100}%</Text>
                  <Text>
                    {Math.round(delle)} {t("DU")}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.nutrient")}
                </Text>
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.numberOfAdditions")}
                </Text>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                    flexDirection: "column",
                  }}
                >
                  <Text>{t(`nuteSchedules.${selected?.schedule}`)}</Text>
                </View>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                    flexDirection: "column",
                  }}
                >
                  <Text>{inputs?.numberOfAdditions}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.amount")}
                </Text>
                <Text
                  style={{
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  {t("PDF.total")}
                </Text>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  <Text style={{ borderBottom: "1px solid black" }}>
                    {nuteInfo &&
                      !isNaN(nuteInfo.perAddition[0]) &&
                      `${
                        Math.round(nuteInfo?.perAddition[0] * 100) / 100
                      }g Fermaid O`}
                  </Text>
                  <Text style={{ borderBottom: "1px solid black" }}>
                    {nuteInfo &&
                      !isNaN(nuteInfo.perAddition[1]) &&
                      `${
                        Math.round(nuteInfo?.perAddition[1] * 100) / 100
                      }g Fermaid K`}
                  </Text>
                  <Text>
                    {nuteInfo &&
                      !isNaN(nuteInfo.perAddition[2]) &&
                      `${
                        Math.round(nuteInfo?.perAddition[2] * 100) / 100
                      }g DAP`}
                  </Text>
                </View>
                <View
                  style={{
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  <Text style={{ borderBottom: "1px solid black" }}>
                    {nuteInfo &&
                      !isNaN(nuteInfo.totalGrams[0]) &&
                      `${
                        Math.round(nuteInfo?.totalGrams[0] * 100) / 100
                      }g Fermaid O`}
                  </Text>
                  <Text style={{ borderBottom: "1px solid black" }}>
                    {nuteInfo &&
                      !isNaN(nuteInfo.totalGrams[1]) &&
                      `${
                        Math.round(nuteInfo?.totalGrams[1] * 100) / 100
                      }g Fermaid K`}
                  </Text>
                  <Text>
                    {nuteInfo &&
                      !isNaN(nuteInfo.totalGrams[2]) &&
                      `${Math.round(nuteInfo?.totalGrams[2] * 100) / 100}g DAP`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                {sorbate && sulfite && (
                  <Text
                    style={{
                      width: "50%",
                      border: "1px solid black",
                      backgroundColor: "gray",
                      fontFamily: "Times-Bold",
                    }}
                  >
                    {t("PDF.stabilizers")}
                  </Text>
                )}
                <Text
                  style={{
                    width: "50%",
                    border: "1px solid black",
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                  }}
                >
                  {t("PDF.remaining")}
                </Text>
                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    {sulfite &&
                      `${Math.round(sulfite * 1000) / 1000}g ${t("PDF.kmeta")}`}
                  </Text>
                  <Text
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    {sorbate &&
                      `${Math.round(sorbate * 1000) / 1000}g ${t("PDF.ksorb")}`}
                  </Text>
                </View>
                <Text
                  style={{
                    border: "1px solid black",
                    width: "50%",
                    alignItems: "center",
                  }}
                >
                  {nuteInfo
                    ? `${Math.round(nuteInfo?.remainingYan)}PPM`
                    : "0PPM"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionTwo}>
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "50%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                  textAlign: "left",
                  paddingLeft: 10,
                },
              ]}
            >
              {t("PDF.primary")}
            </Text>
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "25%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              {t("PDF.weight")} {units && units.weight}
            </Text>
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "25%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              {t("PDF.volume")} {units && units.volume}
            </Text>
          </View>
          {primary &&
            primary.map((item, i) => (
              <View style={styles.sectionTwo}>
                <Text
                  style={[
                    styles.tableAlign,
                    { width: "50%", textAlign: "left", paddingLeft: 10 },
                  ]}
                >
                  {i + 1}. {t(`${lodash.camelCase(item.name)}`)}
                </Text>
                <Text style={[styles.tableAlign, { width: "25%" }]}>
                  {item.details[0]}
                </Text>
                <Text style={[styles.tableAlign, { width: "25%" }]}>
                  {item.details[1]}
                </Text>
              </View>
            ))}
        </View>
        {primaryNotes.length > 0 && primaryNotes[0][0].length && (
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "75%",
                  textAlign: "left",
                  paddingLeft: 10,
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              {t("PDF.primaryNotes")}
            </Text>
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "25%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              {t("PDF.details")}
            </Text>
            {primaryNotes.map((note, i) => {
              return (
                <>
                  <Text
                    style={[
                      styles.tableAlign,
                      { width: "75%", textAlign: "left", paddingLeft: 10 },
                    ]}
                  >
                    {i + 1}. {note[0]}
                  </Text>
                  <Text style={[styles.tableAlign, { width: "25%" }]}>
                    {note[1]}
                  </Text>
                </>
              );
            })}
          </View>
        )}
        <View style={[styles.section]} break>
          {secondary && secondary.length && (
            <View style={styles.sectionTwo}>
              <Text
                style={[
                  styles.tableAlign,
                  {
                    width: "50%",
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    textAlign: "left",
                    paddingLeft: 10,
                  },
                ]}
              >
                {t("PDF.secondary")}
              </Text>
              <Text
                style={[
                  styles.tableAlign,
                  {
                    width: "25%",
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                  },
                ]}
              >
                {t("PDF.weight")} {units && units.weight}
              </Text>
              <Text
                style={[
                  styles.tableAlign,
                  {
                    width: "25%",
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                  },
                ]}
              >
                {t("PDF.volume")} {units && units.volume}
              </Text>
            </View>
          )}
          {secondary &&
            secondary.map((item, i) => (
              <View style={styles.sectionTwo}>
                <Text
                  style={[
                    styles.tableAlign,
                    { width: "50%", textAlign: "left", paddingLeft: 10 },
                  ]}
                >
                  {i + 1}. {t(`${lodash.camelCase(item.name)}`)}
                </Text>
                <Text style={[styles.tableAlign, { width: "25%" }]}>
                  {item.details[0]}
                </Text>
                <Text style={[styles.tableAlign, { width: "25%" }]}>
                  {item.details[1]}
                </Text>
              </View>
            ))}
          {filteredAdditives && filteredAdditives.length && (
            <View style={[styles.sectionTwo, { marginTop: 12 }]}>
              <Text
                style={[
                  styles.tableAlign,
                  {
                    width: "75%",
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                    textAlign: "left",
                    paddingLeft: 10,
                  },
                ]}
              >
                {t("PDF.additives")}
              </Text>
              <Text
                style={[
                  styles.tableAlign,
                  {
                    width: "25%",
                    backgroundColor: "gray",
                    fontFamily: "Times-Bold",
                  },
                ]}
              >
                {t("PDF.addAmount")}
              </Text>
            </View>
          )}
          {filteredAdditives &&
            filteredAdditives.map((item, i) => (
              <View style={styles.sectionTwo}>
                <Text
                  style={[
                    styles.tableAlign,
                    { width: "75%", textAlign: "left", paddingLeft: 10 },
                  ]}
                >
                  {i + 1}. {t(`list.${lodash.camelCase(item.name)}`)}
                </Text>
                <Text style={[styles.tableAlign, { width: "25%" }]}>
                  {`${item.amount}${item.unit}`}
                </Text>
              </View>
            ))}
        </View>
        {secondaryNotes.length && secondaryNotes[0][0].length && (
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "75%",
                  textAlign: "left",
                  paddingLeft: 10,
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              {t("PDF.secondaryNotes")}
            </Text>
            <Text
              style={[
                styles.tableAlign,
                {
                  width: "25%",
                  backgroundColor: "gray",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              {t("PDF.details")}
            </Text>
            {secondaryNotes.map((note, i) => {
              return (
                <>
                  <Text
                    style={[
                      styles.tableAlign,
                      { width: "75%", textAlign: "left", paddingLeft: 10 },
                    ]}
                  >
                    {i + 1}. {note[0]}
                  </Text>
                  <Text style={[styles.tableAlign, { width: "25%" }]}>
                    {note[1]}
                  </Text>
                </>
              );
            })}
          </View>
        )}
      </Page>
    </Document>
  );
};
export default MyDocument;
