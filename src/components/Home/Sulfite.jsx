import { useEffect } from "react";
export default function Sulfite({
  volUnits,
  totalVolume,
  phReading,
  sulfiteAmount,
  setSulfiteAmount,
}) {
  useEffect(() => {
    if (volUnits == "gal") {
      setSulfiteAmount(
        `${((totalVolume * 3.785 * phReading) / 570).toFixed(3)}g`
      );
    } else {
      setSulfiteAmount(((totalVolume * phReading) / 570).toFixed(3));
    }
  }, [phReading, volUnits, totalVolume]);

  return <p className="py-4">{sulfiteAmount}</p>;
}
