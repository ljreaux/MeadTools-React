import IngredientLine from "./IngredientLine";
import { useState } from "react";

export default function NewLines({
  volUnits,
  units,
  rowCount,
  storedInput,
  setStoredInput,
}) {
  return (
    <>
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 1 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input3"
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 2 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input4"
      />{" "}
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 3 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input5"
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 4 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input6"
      />{" "}
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 5 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input7"
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 6 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input8"
      />{" "}
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 7 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input9"
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 8 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input10"
      />
    </>
  );
}
