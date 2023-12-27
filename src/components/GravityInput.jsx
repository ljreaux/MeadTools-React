function GravityInput({
  gravity,
  handleGravity,
  toBrix,
  abvObj,
  readingType,
  initial,
  labelText,
}) {
  return (
    <>
      <label htmlFor={readingType}>{labelText} </label>
      <input defaultValue={initial} onChange={handleGravity}></input>
      <p>
        {toBrix(abvObj[gravity]).toFixed(2) > 0
          ? toBrix(abvObj[gravity]).toFixed(2) + " Brix"
          : "0 Brix"}
      </p>
    </>
  );
}

export default GravityInput;
