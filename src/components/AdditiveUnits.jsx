export default function AdditiveUnits() {
  return (
    <div>
      <label htmlFor="addUnits"></label>
      <select className="input" name="units" id="addUnits">
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
      </select>
    </div>
  );
}
