import GravityInput from "./GravityInput";
import EstOGRunButton from "./EstOGRunButton";
import Title from "../Title";

function EstimatedOG({
  handleGravity,
  handleHydroFG,
  handleEstOG,
  abvCalc,
  abvObj,
  toBrix,
  estOGObj,
}) {
  function delle(fg, abv) {
    return toBrix(fg) + 4.5 * abv;
  }
  function estimatedOG(fgh, fgr) {
    return (-1.728 * fgh + 0.01085 * fgr + 2.728).toFixed(3);
  }

  return (
    <div className="component-div">
      <Title header="Estimated OG Without Reading" />
      <GravityInput
        gravity="hydroFG"
        handleGravity={handleHydroFG}
        toBrix={toBrix}
        abvObj={estOGObj}
        readingType="hydroFG"
        initial={""}
        labelText="Enter Hydrometer FG: "
      />
      <div>
        <label>Enter Refractometer FG: </label>
        <input
          step="0.1"
          type="number"
          onFocus={(e) => e.target.select()}
          className="input w=1/4"
          onChange={handleGravity}
        ></input>
      </div>
      <div>
        <EstOGRunButton
          estimatedOG={estimatedOG}
          abvObj={abvObj}
          handleEstOG={handleEstOG}
          abvCalc={abvCalc}
          delle={delle}
          toBrix={toBrix}
        />
      </div>
    </div>
  );
}

export default EstimatedOG;
