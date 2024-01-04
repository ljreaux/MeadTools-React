import { useState } from "react";
import Title from "../Title";

function ChangeToBrix({ toBrix }) {
  const [gravity, setGravity] = useState([
    {
      sg: 1,
      brix: 0,
    },
  ]);
  const gravityObj = gravity[0];
  const [unitSwitch, setUnitSwitch] = useState("");
  const [units, setUnits] = useState("SG");
  const handleChange = (e) => {
    setUnitSwitch(e.target.value);
    if (units == "SG") {
      setGravity([
        {
          sg: e.target.value,
          brix: toBrix(e.target.value).toFixed(2),
        },
      ]);
    } else {
      setGravity([
        {
          sg: toSG(e.target.value).toFixed(3),
          brix: e.target.value,
        },
      ]);
    }
  };
  function toSG(gravityReading) {
    return (
      1.00001 +
      0.0038661 * gravityReading +
      1.3488 * 10 ** -5 * gravityReading ** 2 +
      4.3074 * 10 ** -8 * gravityReading ** 3
    );
  }

  return (
    <div className="component-div">
      <Title header="Brix Conversion Calculator" />
      <div className="items-center justify-center text-center py-2">
        {" "}
        <label>Enter Gravity: </label>
        <input
          className="input"
          value={unitSwitch ? unitSwitch : ""}
          onChange={handleChange}
        ></input>
      </div>
      <select
        className="input hover:cursor-pointer"
        id="select"
        onChange={(e) => {
          setUnits(e.target.value);
          if (e.target.value == "Brix") {
            setUnitSwitch(gravityObj.brix);
          } else {
            setUnitSwitch(gravityObj.sg);
          }
        }}
      >
        <option value="SG">SG</option>
        <option value="Brix">Brix</option>
      </select>
      <p className="py-4">
        {units == "SG" ? gravityObj.brix + " Brix" : gravityObj.sg}
      </p>
    </div>
  );
}

export default ChangeToBrix;