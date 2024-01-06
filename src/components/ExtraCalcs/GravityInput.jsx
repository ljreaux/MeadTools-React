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
      <label className="text-center mx-2 my-2" htmlFor={readingType}>
        {labelText}{" "}
      </label>
      <input
        className="input w-1/4"
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
