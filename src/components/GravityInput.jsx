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
    <div className="flex justify-center items-center">
      <label className="mx-2 my-2 text-center" htmlFor={readingType}>
        {labelText}{" "}
      </label>
      <input
        className="input"
        defaultValue={initial}
        onChange={handleGravity}
      ></input>
      <p className="mx-2 my-2 text-center">
        {toBrix(abvObj[gravity]).toFixed(2) > 0
          ? toBrix(abvObj[gravity]).toFixed(2) + " Brix"
          : "0 Brix"}
      </p>
    </div>
  );
}

export default GravityInput;
