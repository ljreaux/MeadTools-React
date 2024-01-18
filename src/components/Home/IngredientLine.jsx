import { useState, useEffect } from "react";

// wil likely refactor and add both json files into API
import fermentables from "/src/fermentables.json";
import IngredientOptions from "./IngredientOptions";
import FilteredIngredients from "./FilteredIngredients";

function IngredientLine({
  optionValue,
  defaultSugar,
  units,
  volUnits,
  hidden,
  storedInput,
  setStoredInput,
  inputNum,
  initialIngredient,
}) {
  // sets ingredient select
  const [ingredients, setIngredients] = useState();
  function getIngredients() {
    const response = JSON.parse(JSON.stringify(fermentables));
    const json = response;
    setIngredients(json);
  }
  useEffect(() => {
    getIngredients();
  }, []);

  // stores selected ingredients
  const [ingredientDetails, setIngredientDetails] = useState();
  const [ingredientCat, setIngredientCat] = useState(
    storedInput[inputNum].cat || "sugar"
  );
  const [ingredientName, setIngredientName] = useState(
    storedInput[inputNum].name
  );

  // handles ingredient changes
  function ingredientChange(e) {
    const found = ingredients.ingredients.filter(
      (ingredient) => ingredient.name == e.target.value
    );
    setIngredientDetails(found);
  }
  const [brix, setBrix] = useState(
    storedInput[inputNum].brix || defaultSugar || 79.6
  );

  // sets details when they change
  useEffect(() => {
    ingredientDetails && ingredientDetails[0]
      ? setBrix(ingredientDetails[0].sugarContent)
      : "";
    ingredientDetails && ingredientDetails[0]
      ? setIngredientCat(ingredientDetails[0].category)
      : "";
    ingredientDetails && ingredientDetails[0]
      ? setIngredientName(ingredientDetails[0].name)
      : "";
  }, [ingredientDetails]);
  useEffect(() => {}, [brix]);

  // sets weight when volume changes
  const [weight, setWeight] = useState({
    unit: units,
    weight: storedInput[inputNum].weight,
  });
  useEffect(() => {
    if (weight.unit == "lbs" && units != weight.unit) {
      setWeight({
        unit: units,
        weight: (weight.weight / 2.20462).toFixed(3),
      });
    } else if (weight.unit == "kg" && units != weight.unit) {
      setWeight({
        unit: units,
        weight: (weight.weight * 2.20462).toFixed(3),
      });
    }
  }, [units]);

  const [sg, setSg] = useState(storedInput[inputNum].brix);
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

  // sets volume when weight changes
  const [volume, setVolume] = useState({
    unit: volUnits,
    vol: storedInput[inputNum].volume,
  });
  useEffect(() => {
    if (volume.unit == "liter" && volUnits != volume.unit) {
      setVolume({
        unit: volUnits,
        vol: (volume.vol / 3.78541).toFixed(3),
      });
    } else if (volume.unit == "gal" && volUnits != volume.unit) {
      setVolume({
        unit: volUnits,
        vol: (volume.vol * 3.78541).toFixed(3),
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
      calcedVol /= 3.78541;
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
      calcedWeight /= 3.78541;
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
          name: ingredientName,
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
      {optionValue == "liquid" ? (
        <FilteredIngredients
          ingredientChange={ingredientChange}
          ingredients={ingredients}
          optionValue={storedInput[inputNum].name}
        />
      ) : (
        <IngredientOptions
          ingredientChange={ingredientChange}
          ingredients={ingredients}
          optionValue={storedInput[inputNum].name}
        />
      )}
      {/* */}

      <input
        step="0.1"
        type="number"
        onFocus={(e) => e.target.select()}
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
        type="number"
        onFocus={(e) => e.target.select()}
        className="input w-2/4 my-4"
        value={brix}
        onChange={(e) => {
          setBrix(e.target.value);
        }}
      />
      <input
        step="0.1"
        type="number"
        onFocus={(e) => e.target.select()}
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
