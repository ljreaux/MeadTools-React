import { useEffect, useState } from "react";
import AdditiveOptions from "./AdditiveOptions";
import AdditiveUnits from "./AdditiveUnits";
import AdditiveAmount from "./AdditiveAmount";
export default function AdditiveLine({
  hidden,
  inputNum,
  setExtraIngredients,
}) {
  const obj = JSON.parse(sessionStorage.getItem("extraIngredients")) || null;

  const [additiveName, setAdditiveName] = useState(
    (obj && obj[inputNum].name) || ""
  );
  const [additiveAmount, setAdditiveAmount] = useState(
    (obj && obj[inputNum].amount) || 0
  );
  const [additiveUnits, setAdditiveUnits] = useState(
    (obj && obj[inputNum].units) || "g"
  );
  useEffect(() => {
    setExtraIngredients((prev) => {
      return {
        ...prev,
        [inputNum]: {
          name: additiveName,
          amount: additiveAmount,
          units: additiveUnits,
        },
      };
    });
  }, [additiveName, additiveAmount, additiveUnits]);

  return (
    <>
      <div className={`${hidden}`}>
        <AdditiveOptions
          additiveName={additiveName}
          setAdditiveName={setAdditiveName}
        />
      </div>
      <div className={`${hidden}`}>
        <AdditiveAmount
          additiveAmount={additiveAmount}
          setAdditiveAmount={setAdditiveAmount}
        />
      </div>
      <div className={`${hidden}`}>
        <AdditiveUnits
          additiveUnits={additiveUnits}
          setAdditiveUnits={setAdditiveUnits}
        />
      </div>
    </>
  );
}
