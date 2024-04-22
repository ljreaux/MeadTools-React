import { useEffect, useState } from "react";

export type NumArray = number[][];

export default function useBlend(arr: NumArray) {
  const [runBlend, setRunBlend] = useState(false);

  const runBlendingFunction = () => setRunBlend(true);
  const [blend, setBlend] = useState({
    blendedValue: 0,
    totalVolume: 0,
  });

  useEffect(() => {
    if (runBlend) {
      let numerator = 0;
      let denominator = 0;
      for (const [val, vol] of arr) {
        if (vol > 0) numerator = numerator + val * vol;
        denominator += vol;
      }

      setBlend({
        blendedValue: numerator / denominator,
        totalVolume: denominator,
      });
      setRunBlend(false);
    }
  }, [runBlend]);

  return { blend, runBlendingFunction };
}
