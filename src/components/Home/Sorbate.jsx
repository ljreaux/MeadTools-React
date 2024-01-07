import { useState, useEffect } from "react";

export default function Sorbate({ volUnits, abv, totalVolume }) {
  const [sorbAmount, setSorbAmount] = useState("");

  useEffect(() => {
    let vol = totalVolume;
    if (volUnits == "gal") {
      vol *= 0.003785411784;
    } else {
      vol /= 1000;
    }
    setSorbAmount(
      (((-abv * 25 + 400) / 0.75) * vol).toFixed(3) > 0
        ? `${(((-abv * 25 + 400) / 0.75) * vol).toFixed(3)}g`
        : "No Sorbate Needed!"
    );
  }, [abv, volUnits, totalVolume]);
  return <p className="py-4">{sorbAmount}</p>;
}
