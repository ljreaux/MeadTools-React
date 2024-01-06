import GravityInput from "./GravityInput";
import Title from "../Title";
function TempCorrection({ toBrix, tempObj, handleTempSg, setTemp }) {
  function temperatureCorrection(sg, curTemp, calTemp) {
    const tempCorrect =
      sg *
      ((1.00130346 -
        0.000134722124 * curTemp +
        0.00000204052596 * curTemp ** 2 -
        0.00000000232820948 * curTemp ** 3) /
        (1.00130346 -
          0.000134722124 * calTemp +
          0.00000204052596 * calTemp ** 2 -
          0.00000000232820948 * calTemp ** 3));
    return tempCorrect;
  }
  function toCelsius(currentTemp) {
    return currentTemp * (9 / 5) + 32;
  }
  return (
    <div className="component-div">
      <Title header="Hydrometer Temperature Correction" />
      <GravityInput
        gravity="sg"
        handleGravity={handleTempSg}
        toBrix={toBrix}
        abvObj={tempObj}
        readingType="sg"
        initial={tempObj.sg}
        labelText="Measured SG: "
      />
      <div className="text-center">
        <label>Current Temp: </label>
        <input
          className="input w-1/4"
          defaultValue={tempObj.curTemp}
          onChange={(e) => {
            setTemp([
              {
                sg: tempObj.sg,
                curTemp: e.target.value,
                calTemp: tempObj.calTemp,
                units: tempObj.units,
              },
            ]);
          }}
        />
        <select
          className="input w-1/4"
          defaultValue={tempObj.units}
          onChange={(e) => {
            setTemp([
              {
                sg: tempObj.sg,
                curTemp: tempObj.curTemp,
                calTemp: tempObj.calTemp,
                units: e.target.value,
              },
            ]);
          }}
        >
          <option value="F">°F</option>
          <option value="C">°C</option>
        </select>{" "}
      </div>
      <div className="text-center">
        <label>Calibration Temp: </label>
        <input
          className="input w-1/4"
          defaultValue={tempObj.calTemp}
          onChange={(e) => {
            setTemp([
              {
                sg: tempObj.sg,
                curTemp: tempObj.curTemp,
                calTemp: e.target.value,
                units: tempObj.units,
              },
            ]);
          }}
        />
      </div>
      <p className="py-4">
        {tempObj.units == "F"
          ? `${temperatureCorrection(
              tempObj.sg,
              tempObj.curTemp,
              tempObj.calTemp
            ).toFixed(3)}, ${toBrix(
              temperatureCorrection(
                tempObj.sg,
                tempObj.curTemp,
                tempObj.calTemp
              )
            ).toFixed(2)} Brix`
          : `${temperatureCorrection(
              tempObj.sg,
              toCelsius(tempObj.curTemp),
              toCelsius(tempObj.calTemp)
            ).toFixed(3)}, ${toBrix(
              temperatureCorrection(
                tempObj.sg,
                toCelsius(tempObj.curTemp),
                toCelsius(tempObj.calTemp)
              )
            ).toFixed(2)} Brix`}
      </p>
    </div>
  );
}

export default TempCorrection;
