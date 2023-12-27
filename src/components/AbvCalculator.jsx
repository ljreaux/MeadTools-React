import Title from "./Title";
import GravityInput from "./GravityInput";
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
    <>
      <Title header="ABV Calculator" />

      <GravityInput
        gravity="og"
        handleGravity={handleOg}
        toBrix={toBrix}
        abvObj={ABVObj}
        readingType="og"
        initial={""}
        labelText="Enter OG: "
      />
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
    </>
  );
}

export default AbvCalculator;
