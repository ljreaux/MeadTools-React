import logo from "../assets/full-logo.png";
import "./pdfStyles.css";
import { forwardRef } from "react";

const PDF = forwardRef(
  (
    {
      totalVolume,
      volUnits,
      units,
      OG,
      FG,
      OGBrix,
      FGBrix,
      abv,
      delle,
      yeastObj,
      mainCalcSugarBreak,
      sorbAmount,
      sulfiteAmount,
      mainCalcNuteInfo,
      remainingYan,
      gfType,
      goFermGrams,
      goFermWater,
      preferred,
      storedInput,
    },
    ref
  ) => {
    const newYeastObj = yeastObj[0];
    return (
      <div ref={ref} className="page">
        <div className="header">
          <img src={logo} alt="MeadTools Logo" className="-mb-4" />
          <h1 className="text-3xl font-bold">Recipe Sheet</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="body">
            <p>Name: __________</p>
            <p>Style: ___________</p>
            <p>Start Date: __________</p>
            <p>Secondary Date: _____</p>
          </div>
          <div className="container">
            <div className="table-container">
              <table className="ingredients">
                <tr>
                  <th>
                    <h3>Ingredients</h3>
                  </th>
                  <th>
                    <h3>Amount</h3>
                  </th>
                  <th>
                    <h3>Liquid Ingredients</h3>
                  </th>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input1.volume > 0
                        ? `1.${storedInput.input1.name}`
                        : "1."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input1.volume > 0
                        ? `${storedInput.input1.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input11.volume > 0
                        ? `${storedInput.input11.volume}${volUnits} ${storedInput.input11.name}`
                        : ""}
                    </p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input2.volume > 0
                        ? `2.${storedInput.input2.name}`
                        : "2."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input2.volume > 0
                        ? `${storedInput.input2.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input12.volume > 0
                        ? `${storedInput.input12.volume}${volUnits} ${storedInput.input12.name}`
                        : ""}
                    </p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input3.volume > 0
                        ? `3.${storedInput.input3.name}`
                        : "3."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input3.volume > 0
                        ? `${storedInput.input3.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input4.volume > 0
                        ? `4.${storedInput.input4.name}`
                        : "4."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input4.volume > 0
                        ? `${storedInput.input4.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input5.volume > 0
                        ? `5.${storedInput.input5.name}`
                        : "5."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input5.volume > 0
                        ? `${storedInput.input5.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input6.volume > 0
                        ? `6.${storedInput.input6.name}`
                        : "6."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input6.volume > 0
                        ? `${storedInput.input6.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input7.volume > 0
                        ? `7.${storedInput.input7.name}`
                        : "7."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input7.volume > 0
                        ? `${storedInput.input7.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input8.volume > 0
                        ? `8.${storedInput.input8.name}`
                        : "8."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input8.volume > 0
                        ? `${storedInput.input8.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input9.volume > 0
                        ? `9.${storedInput.input9.name}`
                        : "9."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input9.volume > 0
                        ? `${storedInput.input9.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>
                      {storedInput.input10.volume > 0
                        ? `10.${storedInput.input10.name}`
                        : "10."}
                    </p>
                  </td>
                  <td>
                    <p>
                      {storedInput.input10.volume > 0
                        ? `${storedInput.input10.weight}${units}`
                        : ""}
                    </p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
              </table>
              <table className="ingredients">
                <tr>
                  <th>
                    <h3>Extra Ingredients</h3>
                  </th>
                  <th>
                    <h3>Amount</h3>
                  </th>
                  <th>
                    <h3>Date/Notes</h3>
                  </th>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>1.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>2.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>3.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>4.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>5.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                </tr>
              </table>
            </div>
            <div className="flex flex-col">
              <table className="detail-table w-full">
                <tr>
                  <th>
                    <h3>Total Volume</h3>
                  </th>
                  <th>
                    <h3>Estimated OG:</h3>
                  </th>
                  <th>
                    <h3>Estimated FG:</h3>
                  </th>
                  <th>
                    <h3>Yeast:</h3>
                  </th>
                  <th>
                    <h3>ABV Tolerance:</h3>
                  </th>
                  <th>Expected ABV:</th>
                </tr>
                <tr>
                  <td rowSpan="2">
                    {totalVolume && volUnits
                      ? `${totalVolume.toFixed(3)} ${volUnits}`
                      : ""}
                  </td>
                  <td>{Number(OG)?.toFixed(3)}</td>
                  <td>{Number(FG)?.toFixed(3)}</td>
                  <td>
                    {newYeastObj &&
                      newYeastObj.name &&
                      `${yeastObj.yeastAmount}g ${newYeastObj.name}`}
                  </td>
                  <td>{newYeastObj && `${newYeastObj["ABV Tolerance"]}%`}</td>
                  <td>{abv && `${Number(abv).toFixed(2)}% ABV`}</td>
                </tr>
                <tr>
                  <td>{OGBrix && `${OGBrix.toFixed(2)} Brix`}</td>
                  <td>{FGBrix && `${FGBrix.toFixed(2)} Brix`}</td>
                  <td>
                    {newYeastObj &&
                      `Temp Range: ${newYeastObj.LowTemp}-${newYeastObj.HighTemp}°F`}
                  </td>
                  <td>
                    {mainCalcSugarBreak && `1/3 SB: ${mainCalcSugarBreak}`}
                  </td>
                  <td>{delle && `${Number(delle).toFixed(0)} Delle Units`}</td>
                </tr>
              </table>
              <div className="nute-table">
                <table>
                  <tr>
                    <th>
                      <h3>Nutrient Protocol</h3>
                    </th>
                    <th>
                      <h3>Number of Additions:</h3>
                    </th>
                    <th>
                      <h3>Amount per Addition:</h3>
                    </th>
                    <th>Total:</th>
                  </tr>
                  <tr>
                    <td>{preferred}</td>
                    <td>{mainCalcNuteInfo.addNum}</td>
                    <td>{`${Number(mainCalcNuteInfo.perAdd[0]).toFixed(
                      3
                    )}g Ferm O`}</td>
                    <td>{`${Number(mainCalcNuteInfo.totalGrams[0]).toFixed(
                      3
                    )}g Ferm O`}</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">
                      {gfType != "none"
                        ? `${goFermGrams.toFixed(
                            2
                          )}g of ${gfType}; ${goFermWater.toFixed(
                            2
                          )}ml of water`
                        : "No Go Ferm"}
                    </td>
                    <td rowSpan="2">schedule</td>
                    <td>{`${Number(mainCalcNuteInfo.perAdd[1]).toFixed(
                      3
                    )}g Ferm K`}</td>
                    <td>{`${Number(mainCalcNuteInfo.totalGrams[1]).toFixed(
                      3
                    )}g Ferm K`}</td>
                  </tr>
                  <tr>
                    <td>{`${Number(mainCalcNuteInfo.perAdd[2]).toFixed(
                      3
                    )}g DAP`}</td>
                    <td>{`${Number(mainCalcNuteInfo.totalGrams[2]).toFixed(
                      3
                    )}g DAP`}</td>
                  </tr>
                  <tr>
                    <th colSpan="2">
                      <h3>Stabilizers</h3>
                    </th>
                    <th colSpan="2">
                      <h3>Remaining YAN</h3>
                    </th>
                  </tr>
                  <tr>
                    <td>{`Sorbate: ${sorbAmount}`}</td>
                    <td>{`Metabisulfite: ${sulfiteAmount}`}</td>
                    <td colSpan="2">{remainingYan}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PDF;
