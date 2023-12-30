function NutrientDisplay() {
  return (
    <div className="component-div">
      <div
        className="my-2 grid grid-cols-5 text-center justify-items-center text-center"
        id="nuteDisplay"
      >
        <h2 className="my-2 col-start-2">Fermaid O</h2>
        <h2 className="my-2">Fermaid K</h2>
        <h2 className="my-2">DAP</h2>
        <span className="my-2">
          <h2>Go Ferm (g)</h2>
          <select className=" nute-select" id="go-ferm-type">
            <option value="go-ferm">Go-Ferm</option>
            <option value="go-ferm-protect">Go-Ferm Protect</option>
            <option value="go-ferm-sterol">Go-Ferm Sterol Flash</option>
          </select>
        </span>
        <h2 className="my-2">Max g/L</h2>
        <input id="fermogpl" className="my-2 nute-input" />
        <input id="fermkgpl" className="my-2 nute-input" />
        <input id="dapgpl" className="my-2 nute-input" />
        <p className="my-2">0g</p>
        <h2 className="my-2">g/L to add</h2>
        <p className="my-2">0</p>
        <p className="my-2">0</p>
        <p className="my-2">0</p>
        <h2 className="my-2">Water for Go-Ferm</h2>
        <h2 className="my-2">PPM YAN</h2>
        <p className="my-2">0</p>
        <p className="my-2">0</p>
        <p className="my-2">0</p>
        <p className="my-2">0ml</p>
        <h2 className="my-2">Total Grams</h2>
        <p className="my-2">0</p>
        <p className="my-2">0</p>
        <p className="my-2">0</p>
        <h2 className="my-2 col-start-2">Total YAN</h2>
        <h2 className="my-2 col-start-4 col-span-2">Remaining YAN</h2>
        <p className="my-2 col-start-2">0 PPM</p>
        <p className="my-2 col-start-4 col-span-2">0 PPM</p>
        <h2 className="my-2 col-span-3">Amount per Addition</h2>
        <h2 className="my-2 col-start-4 col-span-2">1/3 Sugar Break</h2>
        <p className="my-2 col-start-1">0g Ferm 0</p>
        <p className="my-2">0g Ferm K</p>
        <p className="my-2">0g DAP</p>
        <p className="my-2 col-start-4 col-span-2">1.060</p>
      </div>
    </div>
  );
}
export default NutrientDisplay;
