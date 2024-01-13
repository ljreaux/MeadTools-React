import AdditiveLine from "./AdditiveLine";

export default function NewAddLines({ addRowCount, setExtraIngredients }) {
  return (
    <>
      <AdditiveLine
        hidden={addRowCount >= 1 ? null : "hidden"}
        inputNum={"input2"}
        setExtraIngredients={setExtraIngredients}
      />
      <AdditiveLine
        hidden={addRowCount >= 2 ? null : "hidden"}
        inputNum={"input3"}
        setExtraIngredients={setExtraIngredients}
      />
      <AdditiveLine
        hidden={addRowCount >= 3 ? null : "hidden"}
        inputNum={"input4"}
        setExtraIngredients={setExtraIngredients}
      />
      <AdditiveLine
        hidden={addRowCount >= 4 ? null : "hidden"}
        inputNum={"input5"}
        setExtraIngredients={setExtraIngredients}
      />
    </>
  );
}
