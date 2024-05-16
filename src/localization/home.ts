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
        estOG: "Estimated OG:",
        estFG: "Estimated FG:",
        backFG: "Backsweetened FG:",
        abv: "ABV:",
        delle: "Delle Units:",
        totalPrimary: "Total Primary Volume:",
        totalSecondary: "Total Actual Volume:",
      },
      submit: "Submit",
      percent: "% ABV",
      reset: "Reset Recipe",
      resetConfirmation:
        "Are you sure you want to reset your recipe? This action cannot be undone.",
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
        estOG: "Geschätzte OG:",
        estFG: "Geschätzte FG:",
        backFG: "Nachgesüßte FG",
        abv: "Alkoholgehalt:",
        delle: "Delle-Einheiten:",
        totalPrimary: "Gesamtes Gärvolumen:",
        totalSecondary: "Tatsächliches Gesamtvolumen:",
      },
      submit: "Anwenden",
      percent: "%",
      reset: "Rezept zurücksetzen",
      resetConfirmation:
        "Bist du sicher, dass du das Rezept zurücksetzen möchtest? Dies kann nicht rückgängig gemacht werden.",
    },
  },
};

export const homeCalcTranslations = [homeCalc.en, homeCalc.de];
