import { useState } from "react";
import Title from "../../Title";

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
    <div className="component-div aspect-video">
      <Title header="Sorbate Addition Calculator" />
      <div className="justify-center items-center text-center py-2">
        <label>Batch Size: </label>
        <input
          step="0.1"
          type="number"
          onFocus={(e) => e.target.select()}
          className="input"
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
          className="input w-1/4"
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
        </select>{" "}
      </div>
      <div className="justify-center items-center text-center">
        <label>ABV: </label>
        <input
          step="0.1"
          type="number"
          onFocus={(e) => e.target.select()}
          className="input w-1/4"
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
      </div>
      <p className="py-4">
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
    </div>
  );
}
export default SorbateAddition;
