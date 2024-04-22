import { useEffect, useState } from "react";

export default function useYeastAmount(
  volume: number = 1,
  sg: number = 1.0,
  units: string = "gal"
) {
  const [yeastAmount, setYeastAmount] = useState(0);

  useEffect(() => {
    let multiplier = 1;
    if (units !== "gal") {
      multiplier /= 3.785;
    }
    if (sg > 1.125) {
      multiplier *= 4;
    } else if (sg > 1.1 && sg < 1.125) {
      multiplier *= 3;
    } else {
      multiplier *= 2;
    }
    setYeastAmount(Math.round(volume * multiplier * 100) / 100);
  }, [volume, sg, units]);

  return { yeastAmount, setYeastAmount };
}
