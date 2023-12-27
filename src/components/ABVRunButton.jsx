function ABVRunButton({ runAbvCalc, ABVObj, delle }) {
  return (
    <>
      <button onClick={runAbvCalc}>Submit</button>
      <p>
        {ABVObj.abv >= 0
          ? ABVObj.abv + "% ABV"
          : "Error, Please enter a valid Input"}
      </p>
      <p>{delle().toFixed() >= 0 ? delle().toFixed() + " Delle Units" : ""}</p>
    </>
  );
}

export default ABVRunButton;
