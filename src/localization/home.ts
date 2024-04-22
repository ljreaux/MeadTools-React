const homeCalc = {
  en: {
    recipeBuilder: {
      homeHeading: "Recipe Builder",
      labels: {
        ingredients: "Ingredients",
        weight: "Weight",
        brix: "Sugar Percentage (Brix)",
        volume: "Volume",
        secondary: "Secondary Addition?",
      },
      addNew: "Add new Ingredient",
      resultsLabels: {
        estOG: "Estimated Measured OG:",
        estActualOG: "Estimated OG:",
        estFG: "Estimated FG with Dilution:",
        abv: "ABV:",
        delle: "Delle Units:",
        totalPrimary: "Total Primary Volume:",
        totalSecondary: "Total Actual Volume:",
      },
      submit: "Submit",
      percent: "% ABV",
    },
  },
  de: {
    recipeBuilder: {
      homeHeading: "Rezepterstellung",
      labels: {
        ingredients: "Zutaten",
        weight: "Gewicht",
        brix: "Zuckergehalt (Brix)",
        volume: "Volumen",
        secondary: "In sekundärer Gärung?",
      },
      addNew: "Neue Zutat hinzufügen",
      resultsLabels: {
        estOG: "Geschätzte OG-Messung:",
        estActualOG: "Geschätzte OG:",
        estFG: "Geschätzte FG nach Verdünnung:",
        abv: "Alk.%:",
        delle: "Delle-Einheiten:",
        totalPrimary: "Gesamtes Gärvolumen:",
        totalSecondary: "Tatsächliches Gesamtvolumen:",
      },
      submit: "Abschicken",
      percent: "% Alk.vol.",
    },
  }
};

export const homeCalcTranslations = [homeCalc.en, homeCalc.de];
