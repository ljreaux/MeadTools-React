function ABVRunButton({ runAbvCalc, ABVObj, delle }) {
  return (
    <>
      <button className="btn" onClick={runAbvCalc}>
        Submit
      </button>
      <p className="pt-4">
        {ABVObj.abv >= 0
          ? ABVObj.abv + "% ABV"
          : "Error, Please enter a valid Input"}
      </p>
      <p className="pb-4">
        {delle().toFixed() >= 0 ? delle().toFixed() + " Delle Units" : ""}
      </p>
    </>
  );
}

export default ABVRunButton;
