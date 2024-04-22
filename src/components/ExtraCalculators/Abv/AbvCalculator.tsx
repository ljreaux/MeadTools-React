import Title from "../../Title";
import { toBrix } from "../../../helpers/unitConverters";
import { useState } from "react";
import useAbv from "../../../hooks/useAbv";
import AbvLine from "../../AbvLine";
import { useTranslation } from "react-i18next";

export default function AbvCalculator() {
  const { t } = useTranslation();

  const [inputValues, setInputValues] = useState([1.105, 1]);
  const abv = useAbv({ OG: inputValues[0], FG: inputValues[1] });
  const inputArr = [t("OG"), t("FG")];

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header={t("abvHeading")} />
      {inputArr.map((item, index) => {
        const brix = toBrix(inputValues[index]);
        return (
          <div
            key={index}
            className="flex items-center justify-center gap-[1rem]"
          >
            <label htmlFor={item} className="text-center mx-2 my-2">
              {t(`${item.toLowerCase()}Label`)}
            </label>
            <input
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
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
            />
            <p>
              {Math.round(brix * 100) / 100} {t("BRIX")}
            </p>
          </div>
        );
      })}
      <AbvLine {...abv} />
    </div>
  );
}
