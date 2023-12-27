function BlendingInputLine({ number, valChange, volChange }) {
  return (
    <>
      <label>Value {number}: </label>
      <input defaultValue={number} onChange={valChange} />
      <label>Volume {number}: </label>
      <input defaultValue={number} onChange={volChange} />
    </>
  );
}

export default BlendingInputLine;
