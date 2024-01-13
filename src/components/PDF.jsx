import logo from "../assets/full-logo.png";
import "./pdfStyles.css";
import { forwardRef } from "react";

const PDF = forwardRef(
  (
    { totalVolume, volUnits, OG, FG, OGBrix, FGBrix, abv, delle, yeastObj },
    ref
  ) => {
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
                  <td className="no_border">
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
                  <td className="no_border">
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
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>6.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>7.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>8.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>9.</p>
                  </td>
                  <td>
                    <p></p>
                  </td>
                  <td className="no_border">
                    <p></p>
                  </td>
                </tr>
                <tr className="text-start">
                  <td>
                    <p>10.</p>
                  </td>
                  <td>
                    <p></p>
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
                      : null}
                  </td>
                  <td>{OG?.toFixed(3)}</td>
                  <td>{FG?.toFixed(3)}</td>
                  <td rowSpan="2">
                    {yeastObj && yeastObj.name && `0g ${yeastObj.name}`}
                  </td>
                  <td>dummy sg</td>
                  <td>{abv && `${Number(abv).toFixed(2)}% ABV`}</td>
                </tr>
                <tr>
                  <td>{OGBrix && `${OGBrix.toFixed(2)} Brix`}</td>
                  <td>{FGBrix && `${FGBrix.toFixed(2)} Brix`}</td>
                  <td>brix</td>
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
                    <td>Tosna</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td rowSpan="2">go-ferm</td>
                    <td rowSpan="2">schedule</td>
                    <td>test</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>test</td>
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
                    <td>k-sorb</td>
                    <td>k-meta</td>
                    <td colSpan="2">remaining</td>
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
