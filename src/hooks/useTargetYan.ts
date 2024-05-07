import { toBrix } from "../helpers/unitConverters";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useTargetYan(
  n2Requirement: string = "Low",
  sg: number = 1,
  offset: number = 0
) {
  const { t } = useTranslation();
  const [target, setTarget] = useState({ target: 0, targetString: "0 PPM" });
  useEffect(() => {
    let multiplier = 1;

    // determines yeast nitrogen requirement and sets multiplier
    n2Requirement == "Low"
      ? (multiplier *= 0.75)
      : n2Requirement == "Medium"
      ? (multiplier *= 0.9)
      : n2Requirement == "High"
      ? (multiplier *= 1.25)
      : (multiplier *= 1.8);
    const gpl = toBrix(sg) * sg * 10;
    let targetYan = gpl * multiplier;
    const offsetPPM = offset;
    targetYan -= offsetPPM;
    const roundedYan = Math.round(targetYan);

    setTarget({
      target: roundedYan,
      targetString: `${roundedYan}${t("PPM")}`,
    });
  }, [n2Requirement, sg, offset]);
  return { target };
}
