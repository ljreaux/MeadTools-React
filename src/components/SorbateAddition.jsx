import Title from "./Title";
import { useState } from "react";
function SorbateAddition() {
  const [sorbate, setsorbate] = useState([
    {
      batchSize: 1,
      units: "gal",
      abv: 12,
    },
  ]);
  const sorbateObj = sorbate[0];
  return (
    <>
      <Title header="Sorbate Addition Calculator" />
      <label>Batch Size: </label>
      <input
        defaultValue={1}
        onChange={(e) => {
          setsorbate([
            {
              batchSize: e.target.value,
              units: sorbateObj.units,
              abv: sorbateObj.abv,
            },
          ]);
        }}
      />
      <select
        defaultValue={"gal"}
        onChange={(e) => {
          setsorbate([
            {
              batchSize: sorbateObj.batchSize,
              units: e.target.value,
              abv: sorbateObj.abv,
            },
          ]);
        }}
      >
        <option value="gal">Gallons</option>
        <option value="liter">Liters</option>
      </select>
      <label>ABV: </label>
      <input
        defaultValue={12}
        onChange={(e) => {
          setsorbate([
            {
              batchSize: sorbateObj.batchSize,
              units: sorbateObj.units,
              abv: e.target.value,
            },
          ]);
        }}
      />
      <p>
        {sorbateObj.units == "gal"
          ? `${(
              ((-sorbateObj.abv * 25 + 400) / 0.75) *
              sorbateObj.batchSize *
              0.003785411784
            ).toFixed(3)}g k-sorbate`
          : `${(
              (((-sorbateObj.abv * 25 + 400) / 0.75) * sorbateObj.batchSize) /
              1000
            ).toFixed(3)}g k-sorbate`}
      </p>
    </>
  );
}
export default SorbateAddition;
