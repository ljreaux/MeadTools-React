import { FormData } from "./NutrientCalc";

export const initialData: FormData = {
  inputs: {
    volume: 0,
    sg: 1.0,
    offset: 0,
    numberOfAdditions: 1,
  },
  selected: {
    yeastBrand: "Lalvin",
    yeastStrain: "18-2007",
    yeastDetails: {
      id: 1,
      brand: "Lalvin",
      name: "18-2007",
      nitrogen_requirement: "Low",
      tolerance: 15,
      low_temp: 50,
      high_temp: 90,
    },
    n2Requirement: "Low",
    volumeUnits: "gal",
    schedule: "tbe",
  },
  maxGpl: {
    tbe: { name: "TBE (All Three)", value: [0.45, 0.5, 0.96] },
    tosna: { name: "TOSNA (Fermaid O Only)", value: [2.5, 0, 0] },
    justK: { name: "Fermaid K Only", value: [0, 3, 0] },
    dap: { name: "DAP Only", value: [0, 0, 1.5] },
    oAndk: {
      name: "Fermaid O & K",
      value: [
        [0.6, 0.81, 0],
        [0.9, 0.81, 0],
        [1.1, 1, 0],
      ],
    },
    oAndDap: { name: "Fermaid O & DAP", value: [1, 0, 0.96] },
    kAndDap: { name: "Fermaid K & DAP", value: [0, 1, 0.96] },
  },
  yanContribution: [40, 100, 210],
  outputs: {
    targetYan: 0,
    yeastAmount: 0,
  },
};
