import Title from "../../Title";
import GravityInput from "../GravityInput";
import ABVRunButton from "./ABVRunButton";

function AbvCalculator({
  toBrix,
  handleOg,
  ABVObj,
  handleFg,
  runAbvCalc,
  delle,
}) {
  return (
    <div className="component-div aspect-video">
      <Title header="ABV Calculator" />
      <div>
        <GravityInput
          gravity="og"
          handleGravity={handleOg}
          toBrix={toBrix}
          abvObj={ABVObj}
          readingType="og"
          initial={""}
          labelText="Enter OG: "
        />
      </div>
      <GravityInput
        gravity="fg"
        handleGravity={handleFg}
        toBrix={toBrix}
        abvObj={ABVObj}
        readingType="fg"
        initial={0.996}
        labelText="Enter FG: "
      />
      <ABVRunButton runAbvCalc={runAbvCalc} ABVObj={ABVObj} delle={delle} />
    </div>
  );
}

export default AbvCalculator;
