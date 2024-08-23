import Title from "../../Title";
import { toBrix } from "../../../helpers/unitConverters";
import { Fragment, useState } from "react";
import useAbv from "../../../hooks/useAbv";
import AbvLine from "../../AbvLine";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

export default function AbvCalculator() {
  const { t } = useTranslation();

  const [inputValues, setInputValues] = useState([1.105, 1]);
  const abv = useAbv({ OG: inputValues[0], FG: inputValues[1] });
  const inputArr = [t("OG"), t("FG")];

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 w-11/12 md:p-12 p-8 my-8 sm:w-1/2 rounded-xl bg-background ">
      <Title header={t("abvHeading")} styles="col-span-3" />
      {inputArr.map((item, index) => {
        const brix = toBrix(inputValues[index]);
        return (
          <Fragment key={index}>
            <label htmlFor={item}>{t(`${item.toLowerCase()}Label`)}</label>
            <Input
              type="number"
              id={item}
              step="0.001"
              value={inputValues[index]}
              onChange={(e) => {
                setInputValues(
                  inputValues.map((value, i) =>
                    index === i ? Number(e.target.value) : value
                  )
                );
              }}
              onFocus={(e) => e.target.select()}
            />
            <p>
              {Math.round(brix * 100) / 100} {t("BRIX")}
            </p>
          </Fragment>
        );
      })}
      <div className="flex items-center justify-center col-span-3">
        <AbvLine {...abv} />
      </div>
    </div>
  );
}
