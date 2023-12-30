import Title from "../Title";
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
    <div className="component-div">
      <Title header="Sulfite Addition Calculator" />
      <div className="text-center">
        <label>Batch Size: </label>
        <input
          className="input"
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
          className="input mx-4"
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
      </div>
      <label className="py-4">Desired PPM: </label>
      <input
        className="input"
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
      <p className="py-4">
        {sulfiteObj.units == "gal"
          ? `${((sulfiteObj.batchSize * 3.785 * sulfiteObj.ppm) / 570).toFixed(
              3
            )}g k-meta`
          : `${((sulfiteObj.batchSize * sulfiteObj.ppm) / 570).toFixed(
              3
            )}g k-meta`}
      </p>
    </div>
  );
}
export default SulfiteAddition;
