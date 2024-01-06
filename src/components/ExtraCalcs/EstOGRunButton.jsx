function EstOGRunButton({
  estimatedOG,
  abvObj,
  handleEstOG,
  abvCalc,
  delle,
  toBrix,
}) {
  function calcDisplay() {
    handleEstOG(estimatedOG(abvObj.hydroFG, abvObj.refracFG));
  }

  return (
    <div className="py-4">
      <button className="btn" onClick={() => calcDisplay()}>
        Submit
      </button>
      <div>
        <p>{abvObj.estOG > 0 ? `Estimated OG: ${abvObj.estOG}` : null}</p>
        <p>
          {abvObj.estOG > 0
            ? `
      ${toBrix(abvObj.estOG).toFixed(2)} Brix`
            : null}
        </p>
        <p>
          {abvObj.estOG > 0
            ? `
      ${abvCalc(abvObj.estOG, abvObj.hydroFG)}% ABV`
            : null}
        </p>
        <p>
          {abvObj.estOG > 0
            ? `
      ${delle(abvObj.hydroFG, abvCalc(abvObj.estOG, abvObj.hydroFG)).toFixed(
        0
      )} Delle Units`
            : null}
        </p>
      </div>
    </div>
  );
}

export default EstOGRunButton;
