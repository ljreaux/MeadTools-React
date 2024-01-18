function BlendingInputLine({ valObj, number, valChange, volChange }) {
  return (
    <div className="text-center py-2">
      <label>Value {number}: </label>
      <input
        type="number"
        onFocus={(e) => e.target.select()}
        className="input w-1/4"
        value={valObj[`val${number}`]}
        onChange={valChange}
      />
      <label className="px-4">Volume {number}: </label>
      <input
        type="number"
        onFocus={(e) => e.target.select()}
        className="input w-1/4"
        value={valObj[`vol${number}`]}
        onChange={volChange}
      />
    </div>
  );
}

export default BlendingInputLine;
