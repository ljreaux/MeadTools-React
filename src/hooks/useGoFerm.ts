import { useEffect, useState } from "react";

export default function useGoFerm(gfType: string, yeastAmount: number) {
  const [gf, setGf] = useState({
    gf: 0,
    gfWater: 0,
  });
  useEffect(() => {
    let multiplier = 0;
    let waterMultiplier = 20;
    if (gfType == "none") {
      waterMultiplier *= 0;
    }
    if (gfType == "Go-Ferm" || gfType == "protect") {
      multiplier = 1.25;
    }
    if (gfType == "sterol-flash") {
      multiplier = 1.2;
      waterMultiplier /= 2;
    }
    const goFerm = yeastAmount * multiplier;
    const goFermWater = goFerm * waterMultiplier;

    setGf({
      gf: Math.round(goFerm * 100) / 100,
      gfWater: Math.round(goFermWater * 100) / 100,
    });
  }, [gfType, yeastAmount]);
  return { ...gf };
}
