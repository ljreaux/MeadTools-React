function GravityInput({
  gravity,
  handleGravity,
  toBrix,
  abvObj,
  readingType,
  initial,
}) {
  return (
    <>
      <label htmlFor={readingType}>Enter {readingType.toUpperCase()}: </label>
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
