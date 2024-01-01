function Stabilizers() {
  return (
    <div className="component-div my-4 mb-12">
      <div className="grid grid-cols-4 place-items-center text-center">
        <span className="col-start-1 col-span-2">
          <h2 className="py-6 mx-2">Are you adding stabilizers?</h2>
          <select className="nute-select">
            <option value="no">No</option> <option value="yes">Yes</option>
          </select>
        </span>
        <span className="col-start-3 col-span-2">
          <h2 className="py-6 mx-2">Are you taking a pH Reading?</h2>
          <select className="nute-select">
            <option value="no">No</option> <option value="yes">Yes</option>
          </select>
        </span>
        <h2 className="py-6 mx-2">Potassium Sorbate:</h2>
        <p>0g</p>
        <input className="nute-input col-span-2" />
        <h2 className="py-6 mx-2">Potassium Metabisulfite:</h2>
        <p>0g</p>
      </div>
    </div>
  );
}
export default Stabilizers;
