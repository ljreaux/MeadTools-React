export default function AdditiveAmount({ additiveAmount, setAdditiveAmount }) {
  return (
    <div>
      <label htmlFor="amount"></label>
      <input
        onFocus={(e) => e.target.select()}
        type="text"
        name="amount"
        id="amount"
        className="input w-2/4 my-4"
        value={additiveAmount}
        onChange={(e) => {
          setAdditiveAmount(e.target.value);
        }}
      />
    </div>
  );
}
