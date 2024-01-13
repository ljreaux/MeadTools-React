import AdditiveLine from "./AdditiveLine";

export default function NewAddLines({ addRowCount }) {
  return (
    <>
      <AdditiveLine hidden={addRowCount >= 1 ? null : "hidden"} />
      <AdditiveLine hidden={addRowCount >= 2 ? null : "hidden"} />
      <AdditiveLine hidden={addRowCount >= 3 ? null : "hidden"} />
      <AdditiveLine hidden={addRowCount >= 4 ? null : "hidden"} />
    </>
  );
}
