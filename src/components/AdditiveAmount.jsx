export default function AdditiveAmount({ additiveAmount, setAdditiveAmount }) {
  return (
    <div>
      <label htmlFor="amount"></label>
      <input
        type="text"
        name="amount"
        id="amount"
        className="input"
        value={additiveAmount}
        onChange={(e) => {
          setAdditiveAmount(e.target.value);
        }}
      />
    </div>
  );
}
