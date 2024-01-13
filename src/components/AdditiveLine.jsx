import AdditiveOptions from "./AdditiveOptions";
import AdditiveUnits from "./AdditiveUnits";
import AdditiveAmount from "./AdditiveAmount";
export default function AdditiveLine({ hidden }) {
  return (
    <>
      <div className={`${hidden}`}>
        <AdditiveOptions />
      </div>
      <div className={`${hidden}`}>
        <AdditiveAmount />
      </div>
      <div className={`${hidden}`}>
        <AdditiveUnits />
      </div>
    </>
  );
}
