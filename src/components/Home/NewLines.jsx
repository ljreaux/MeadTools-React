import IngredientLine from "./IngredientLine";

// unhides lines as button is clicked. Could probably be done dynamically, but I was having issues with useEffect when adding them dynamically
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
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 2 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input4"
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 3 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input5"
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 4 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input6"
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 5 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input7"
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 6 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input8"
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 7 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        inputNum="input9"
        initialIngredient={"Honey"}
      />
      <IngredientLine
        volUnits={volUnits}
        units={units}
        defaultSugar={79.6}
        hidden={rowCount >= 8 ? null : "hidden"}
        storedInput={storedInput}
        setStoredInput={setStoredInput}
        initialIngredient={"Honey"}
        inputNum="input10"
      />
    </>
  );
}
