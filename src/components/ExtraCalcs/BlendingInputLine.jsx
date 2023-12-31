function BlendingInputLine({ number, valChange, volChange }) {
  return (
    <div className="text-center py-2">
      <label>Value {number}: </label>
      <input
        className="input w-1/4"
        defaultValue={number}
        onChange={valChange}
      />
      <label className="px-4">Volume {number}: </label>
      <input
        className="input w-1/4"
        defaultValue={number}
        onChange={volChange}
      />
    </div>
  );
}

export default BlendingInputLine;
