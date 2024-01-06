import { useState, useEffect } from "react";
import fermentables from "/src/fermentables.json";

function IngredientLine({
  optionValue,
  defaultSugar,
  units,
  volUnits,
  hidden,
  setStoredInput,
  inputNum,
}) {
  const [ingredients, setIngredients] = useState();
  function getIngredients() {
    const response = JSON.parse(JSON.stringify(fermentables));
    const json = response;
    setIngredients(json);
  }
  useEffect(() => {
    getIngredients();
  }, []);

  const [ingredientDetails, setIngredientDetails] = useState();
  const [ingredientCat, setIngredientCat] = useState("sugar");

  function ingredientChange(e) {
    const found = ingredients.ingredients.filter(
      (ingredient) => ingredient.name == e.target.value
    );
    setIngredientDetails(found);
  }
  const [brix, setBrix] = useState(defaultSugar || 79.6);
  useEffect(() => {
    ingredientDetails && ingredientDetails[0]
      ? setBrix(ingredientDetails[0].sugarContent)
      : "";
    ingredientDetails && ingredientDetails[0]
      ? setIngredientCat(ingredientDetails[0].category)
      : "";
  }, [ingredientDetails]);
  useEffect(() => {}, [brix]);

  const [weight, setWeight] = useState({ unit: "lbs", weight: 0 });
  useEffect(() => {
    if (weight.unit == "lbs") {
      setWeight({
        unit: units,
        weight: (weight.weight / 2.20462).toFixed(3),
      });
    } else {
      setWeight({
        unit: units,
        weight: (weight.weight * 2.20462).toFixed(3),
      });
    }
  }, [units]);

  const [sg, setSg] = useState(1);
  useEffect(
    () =>
      setSg(
        1.00001 +
          0.0038661 * brix +
          1.3488 * 10 ** -5 * brix ** 2 +
          4.3074 * 10 ** -8 * brix ** 3
      ),
    [brix]
  );

  const [volume, setVolume] = useState({ unit: "gal", vol: 0 });
  useEffect(() => {
    if (volume.unit == "liter") {
      setVolume({
        unit: volUnits,
        vol: (volume.vol / 3.87541).toFixed(3),
      });
    } else {
      setVolume({
        unit: volUnits,
        vol: (volume.vol * 3.87541).toFixed(3),
      });
    }
  }, [volUnits]);

  function calcVolume(e) {
    let calcedWeight = e.target.value;
    let calcedVol = 8.345;
    if (weight.unit == "kg") {
      calcedWeight *= 2.20462;
    }
    if (volume.unit == "liter") {
      calcedVol /= 3.87541;
    }
    const volOfIng = (calcedWeight / calcedVol / sg).toFixed(3);
    setVolume({
      unit: volume.unit,
      vol: volOfIng,
    });
  }

  function calcWeight(e) {
    let calcedVol = e.target.value;

    let calcedWeight = calcedVol * 8.345 * sg;
    if (weight.unit == "kg") {
      calcedWeight /= 2.20462;
    }
    if (volume.unit == "liter") {
      calcedWeight /= 3.87541;
    }
    setWeight({
      unit: weight.unit,
      weight: calcedWeight.toFixed(3),
    });
  }

  useEffect(() => {
    setStoredInput((prev) => {
      return {
        ...prev,
        [inputNum]: {
          weight: weight.weight,
          brix: brix,
          volume: volume.vol,
          cat: ingredientCat,
        },
      };
    });
  }, [weight, brix, volume, ingredientCat]);
  return (
    <div
      className={`col-start-1 col-span-4 grid grid-cols-4 place-items-center text-center ${hidden} w-full`}
    >
      <select className="input w-11/12 my-4 " onChange={ingredientChange}>
        {optionValue ? (
          <option value={optionValue}>{optionValue}</option>
        ) : null}
        {ingredients
          ? ingredients.ingredients.map((ingredient) => {
              return (
                <option key={ingredient.name} value={ingredient.name}>
                  {ingredient.name}
                </option>
              );
            })
          : null}
      </select>
      <input
        className="input w-2/4 my-4"
        value={weight.weight}
        onChange={(e) => {
          setWeight({
            unit: weight.unit,
            weight: e.target.value,
          });
          calcVolume(e);
        }}
      />
      <input
        className="input w-2/4 my-4"
        value={brix}
        onChange={(e) => {
          setBrix(e.target.value);
        }}
      />
      <input
        className="input w-2/4 my-4"
        value={volume.vol}
        onChange={(e) => {
          setVolume({
            unit: volume.unit,
            vol: e.target.value,
          });
          calcWeight(e);
        }}
      />
    </div>
  );
}
export default IngredientLine;
