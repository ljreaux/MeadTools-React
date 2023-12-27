import Title from "./Title";
import { useState } from "react";
function SulfiteAddition() {
  const [sulfite, setSulfite] = useState([
    {
      batchSize: 1,
      units: "gal",
      ppm: 50,
    },
  ]);
  const sulfiteObj = sulfite[0];
  return (
    <>
      <Title header="Sulfite Addition Calculator" />
      <label>Batch Size: </label>
      <input
        defaultValue={1}
        onChange={(e) => {
          setSulfite([
            {
              batchSize: e.target.value,
              units: sulfiteObj.units,
              ppm: sulfiteObj.ppm,
            },
          ]);
        }}
      />
      <select
        defaultValue={"gal"}
        onChange={(e) => {
          setSulfite([
            {
              batchSize: sulfiteObj.batchSize,
              units: e.target.value,
              ppm: sulfiteObj.ppm,
            },
          ]);
        }}
      >
        <option value="gal">Gallons</option>
        <option value="liter">Liters</option>
      </select>
      <label>Desired PPM: </label>
      <input
        defaultValue={50}
        onChange={(e) => {
          setSulfite([
            {
              batchSize: sulfiteObj.batchSize,
              units: sulfiteObj.units,
              ppm: e.target.value,
            },
          ]);
        }}
      />
      <p>
        {sulfiteObj.units == "gal"
          ? `${((sulfiteObj.batchSize * 3.785 * sulfiteObj.ppm) / 570).toFixed(
              3
            )}g k-meta`
          : `${((sulfiteObj.batchSize * sulfiteObj.ppm) / 570).toFixed(
              3
            )}g k-meta`}
      </p>
    </>
  );
}
export default SulfiteAddition;
