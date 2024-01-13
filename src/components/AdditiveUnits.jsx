export default function AdditiveUnits({ additiveUnits, setAdditiveUnits }) {
  return (
    <div>
      <label htmlFor="addUnits"></label>
      <select
        className="input"
        name="units"
        id="addUnits"
        value={additiveUnits}
        onChange={(e) => {
          setAdditiveUnits(e.target.value);
        }}
      >
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="oz">oz</option>
        <option value="lbs">lbs</option>
        <option value="ml">ml</option>
        <option value="liters">liters</option>
        <option value="fl oz">fl oz</option>
        <option value="quarts">quarts</option>
        <option value="gal">gal</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
        <option value="units"></option>
      </select>
    </div>
  );
}
