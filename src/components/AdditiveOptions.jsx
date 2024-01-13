export default function AdditiveOptions({ additiveName, setAdditiveName }) {
  return (
    <div>
      <label htmlFor="additionalIngredients"></label>
      <input
        className="input"
        type="text"
        list="additives"
        id="additionalIngredients"
        value={additiveName}
        onChange={(e) => {
          setAdditiveName(e.target.value);
        }}
      />
      <datalist id="additives">
        <option value="Red Wine Tannin"></option>
        <option value="FT Rouge"></option>
        <option value="Opti-Red"></option>
        <option value="FT Blanc Soft"></option>
        <option value="Opti-White"></option>
        <option value="Tannin Complex"></option>
        <option value="Tannin Riche Extra"></option>
        <option value="Citric Acid"></option>
        <option value="Malic Acid"></option>
        <option value="Tartaric Acid"></option>
        <option value="Bentonite"></option>
        <option value="Chitosan"></option>
        <option value="Kieselsol"></option>
        <option value="Sparkolloid"></option>
        <option value="Pectic Enzyme"></option>
        <option value="Lallzyme EX-V"></option>
        <option value="Oak Chips"></option>
        <option value="Oak Spirals"></option>
        <option value="Oak Cubes"></option>
        <option value="Potassium Carbonate"></option>
      </datalist>{" "}
    </div>
  );
}
