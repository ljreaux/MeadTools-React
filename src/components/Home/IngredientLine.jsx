function IngredientLine({ optionValue, defaultSugar }) {
  return (
    <>
      <select className="my-4 nute-select">
        <option value={optionValue}>{optionValue}</option>
      </select>
      <input className="my-4 nute-input" />
      <input className="my-4 nute-input" defaultValue={defaultSugar} />
      <input className="my-4 nute-input" />
    </>
  );
}
export default IngredientLine;
