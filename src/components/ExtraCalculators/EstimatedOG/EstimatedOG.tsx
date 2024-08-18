import { useState } from "react";
import Title from "../../Title";
import useAbv from "../../../hooks/useAbv";
import { toBrix } from "../../../helpers/unitConverters";
import AbvLine from "../../AbvLine";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

interface Gravity {
  fgh: number;
  fgr: number;
}

export default function EstimatedOG() {
  const { t } = useTranslation();
  const [gravity, setGravity] = useState<Gravity>({
    fgh: 1.0,
    fgr: 5,
  });

  const estOG =
    Math.round((-1.728 * gravity.fgh + 0.01085 * gravity.fgr + 2.728) * 1000) /
    1000;
  const abv = useAbv({ OG: estOG, FG: gravity.fgh });
  return (
    <div className="flex flex-col items-center justify-center w-11/12 p-8 my-40 sm:my-8 sm:w-1/2 rounded-xl bg-background">
      <Title header={t("ogHeading")} />
      <label className="mx-2 my-2 text-center" htmlFor="hydrometerFG">
        {t("hydrometerFG")}{" "}
      </label>
      <Input
        value={gravity.fgh}
        onChange={(e) =>
          setGravity((prev) => ({ ...prev, fgh: Number(e.target.value) }))
        }
        type="number"
        id="hydrometerFG"
        className="max-w-96"
        onFocus={(e) => e.target.select()}
      />
      <label className="mx-2 my-2 text-center" htmlFor="refractometerFG">
        {t("refractometerFG")}{" "}
      </label>
      <Input
        value={gravity.fgr}
        onChange={(e) =>
          setGravity((prev) => ({ ...prev, fgr: Number(e.target.value) }))
        }
        type="number"
        id="refractometerFG"
        className="max-w-96"
        onFocus={(e) => e.target.select()}
      />
      <div className="flex gap-2 mt-8 text-lg text-center sm:text-2xl">
        <p>
          {t("estimatedOG")} {estOG}
        </p>
        <p>
          {Math.round(toBrix(estOG) * 100) / 100} {t("BRIX")}
        </p>
      </div>
      <AbvLine {...abv} textSize="text-lg" />
    </div>
  );
}
