import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { ingredientTranslations } from "./ingredients";
import { homeCalcTranslations } from "./home";
import { unitsTranslations } from "./units";
import { extraCalcsTranslations } from "./extraCalcs";
import { nutrientCalcTranslations } from "./nutrientCalc";
import { navBarTranslations } from "./navbar";
import { aboutTranslations } from "./about";
import { contactTranslations } from "./contact";
import { yeastTranslations } from "./otherYeasts";
import { stabilizersTranslations } from "./stabilizersAndAdditives";
import { PDFTranslations } from "./PDF";
import { notesTranslations } from "./notes";

const [ingredientsEN, ingredientsDE] = ingredientTranslations;
const [homeCalcEN, homeCalcDE] = homeCalcTranslations;
const [unitsEN, unitsDE] = unitsTranslations;
const [ExtraCalcsEN, ExtraCalcsDE] = extraCalcsTranslations;
const [NutrientCalcEN, NutrientCalcDE] = nutrientCalcTranslations;
const [NavbarEN, NavbarDE] = navBarTranslations;
const [AboutEN, AboutDE] = aboutTranslations;
const [ContactEN, ContactDE] = contactTranslations;
const [otherYeastsEN, otherYeastsDE] = yeastTranslations;
const [stabilizersEN, stabilizersDE] = stabilizersTranslations;
const [PDFEN, PDFDE] = PDFTranslations;
const [notesEN, notesDE] = notesTranslations;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          greeting: "Hello",
          ...ingredientsEN,
          ...homeCalcEN,
          ...unitsEN,
          ...ExtraCalcsEN,
          ...NutrientCalcEN,
          ...NavbarEN,
          ...AboutEN,
          ...ContactEN,
          ...otherYeastsEN,
          ...stabilizersEN,
          ...PDFEN,
          ...notesEN,
        },
      },
      de: {
        translation: {
          greeting: "Hallo",
          ...ingredientsDE,
          ...homeCalcDE,
          ...unitsDE,
          ...ExtraCalcsDE,
          ...NutrientCalcDE,
          ...NavbarDE,
          ...AboutDE,
          ...ContactDE,
          ...otherYeastsDE,
          ...stabilizersDE,
          ...PDFDE,
          ...notesDE
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
