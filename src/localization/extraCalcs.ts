const abvCalc = {
  en: {
    abvHeading: "ABV Calculator",
    ogLabel: "Enter OG:",
    fgLabel: "Enter FG:",
  },
  de: {
    abvHeading: "Alkoholgehaltsrechner",
    ogLabel: "OG eingeben:",
    fgLabel: "FG eingeben:",
  },
};

const brixCalc = {
  en: {
    brixHeading: "Brix Conversion Calculator",
    gravityLabel: "Enter Gravity:",
  },
  de: {
    brixHeading: "Brix-Umrechnung",
    gravityLabel: "Spezifisches Gewicht:",
  },
};

const estOG = {
  en: {
    ogHeading: "Estimated OG Without Reading",
    hydrometerFG: "Enter Hydrometer FG:",
    refractometerFG: "Enter Refractometer FG:",
    estimatedOG: "Estimated OG:",
  },
  de: {
    ogHeading: "Geschätztes OG ohne Messwert",
    hydrometerFG: "Hydrometer-FG:",
    refractometerFG: "Refraktometer-FG:",
    estimatedOG: "Geschätztes OG:",
  },
};

const benchTrials = {
  en: {
    benchTrialsHeading: "Bench Trials",
    batchSize: "Batch Size:",
    sampleSize: "Sample Size (ml):",
    stockSolutionConcentration: "Concentration (%):",
    solutionVolume: "Stock Solution Volume:",
    adjunctAmount: "Adjunct Amount in sample (g):",
    adjunctConcentration: "Adjunct Concentration (PPM):",
    gallonScaledAdjunct: "Scaled Adjunct g/gallon:",
    literScaledAdjunct: "Scaled Adjunct g/liter:",
    scaledBatch: "Scaled Adjunct (entire batch):",
  },
  de: {
    benchTrialsHeading: "Bench Trials",
    batchSize: "Ansatzmenge:",
    sampleSize: "Probenmenge (ml):",
    stockSolutionConcentration: "Konzentration (%):",
    solutionVolume: "Volumen Stammlösung:",
    adjunctAmount: "Zusatzmenge in Probe (g):",
    adjunctConcentration: "Zusatzkonzentration (PPM):",
    gallonScaledAdjunct: "Skalierter Zusatz g/Gallone:",
    literScaledAdjunct: "Skalierter Zusatz g/Liter:",
    scaledBatch: "Skalierter Zusatz (gesamter Ansatz):",
  },
};

const stabilizers = {
  en: {
    sorbateHeading: "Sorbate Addition Calculator",
    kSorb: "k-sorbate",
    sulfiteHeading: "Sulfite Addition Calculator",
    desiredPpm: "Desired PPM:",
    kMeta: "k-meta",
  },
  de: {
    sorbateHeading: "Sorbatmengenrechner",
    kSorb: "Kaliumsorbat",
    sulfiteHeading: "Sulfitmengenrechner",
    desiredPpm: "Gewünschte PPM:",
    kMeta: "Kaliumpyrosulfit",
  },
};

const refractometer = {
  en: {
    refractometerHeading: "Refractometer Correction Calculator",
    correctionFactor: "Correction Factor:",
    fgInBrix: "Enter FG in Brix:",
  },
  de: {
    refractometerHeading: "Refraktometerkorrektur-Rechner",
    correctionFactor: "Korrekturfaktor:",
    fgInBrix: "FG in Brix:",
  },
};

const tempCorrection = {
  en: {
    tempCorrectionHeading: "Temperature Correction Calculator",
    measuredSG: "Measured SG:",
    curTemp: "Current Temp:",
    calTemp: "Calibration Temp:",
  },
  de: {
    tempCorrectionHeading: "Temperaturkorrektur-Rechner",
    measuredSG: "Gemessene SG:",
    curTemp: "Momentane Temperatur:",
    calTemp: "Kalibrierungstemperatur:",
  },
};

const blending = {
  en: {
    blendingHeading: "Blending Calculator",
    valOne: "Value One:",
    valTwo: "Value Two:",
    volOne: "Volume One:",
    volTwo: "Volume Two:",
    totalVol: "Total Volume:",
    blendedVal: "Blended Value:",
  },
  de: {
    blendingHeading: "Mischwert-Rechner",
    valOne: "Erster Wert:",
    valTwo: "Zweiter Wert:",
    volOne: "Erstes Volumen:",
    volTwo: "Zweites Volumen:",
    totalVol: "Gesamtvolumen:",
    blendedVal: "Mischwert:",
  },
};
const nav = {
  en: {
    sideNav: {
      abv: "ABV",
      brix: "Brix Conversion",
      estOG: "Estimated OG without Reading",
      benchTrials: "Bench Trials",
      stabilizers: "Stabilizer Additions",
      refractometer: "Refractometer Correction",
      tempCorrection: "Hydrometer Temperature Correction",
      blending: "Blending",
    },
  },
};

const ExtraCalcsEN = {
  ...abvCalc.en,
  ...brixCalc.en,
  ...estOG.en,
  ...benchTrials.en,
  ...stabilizers.en,
  ...refractometer.en,
  ...tempCorrection.en,
  ...blending.en,
  ...nav.en,
};

const ExtraCalcsDE = {
  ...abvCalc.de,
  ...brixCalc.de,
  ...estOG.de,
  ...benchTrials.de,
  ...stabilizers.de,
  ...refractometer.de,
  ...tempCorrection.de,
  ...blending.de,
};

export const extraCalcsTranslations = [ExtraCalcsEN, ExtraCalcsDE];
