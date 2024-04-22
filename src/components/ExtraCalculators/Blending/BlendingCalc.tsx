import { useState, FormEvent } from "react";
import useBlend from "../../../hooks/useBlend";
import { NumArray } from "../../../hooks/useBlend";
import Title from "../../Title";
import { useTranslation } from "react-i18next";

export default function BlendingCalc() {
  const { t } = useTranslation();
  const [inputValues, setInputValues] = useState<NumArray>([
    [0, 0],
    [0, 0],
  ]);

  function handleChange(e: FormEvent<EventTarget>, [index1, index2]: number[]) {
    const target = e.target as HTMLInputElement;
    setInputValues((prev) => {
      const newArr = [...prev];
      newArr[index1][index2] = Number(target.value);
      return newArr;
    });
  }

  const { blend, runBlendingFunction } = useBlend(inputValues);

  return (
    <form
      className="flex flex-col gap-4 w-11/12 sm:w-9/12 rounded-xl bg-sidebar p-8 my-8 items-center justify-center aspect-video"
      onSubmit={(e) => {
        e.preventDefault();
        runBlendingFunction();
      }}
    >
      <Title header={t("blendingHeading")} />
      <div>
        <label className="text-center mx-2 my-2" htmlFor="valueOne">
          {t("valOne")}
        </label>
        <input
          type="number"
          id="valueOne"
          value={inputValues[0][0]}
          onChange={(e) => handleChange(e, [0, 0])}
          onFocus={(e) => e.target.select()}
          step={0.001}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
        />

        <label className="text-center mx-2 my-2" htmlFor="volumeOne">
          {t("volOne")}
        </label>
        <input
          type="number"
          id="volumeOne"
          value={inputValues[0][1]}
          onChange={(e) => handleChange(e, [0, 1])}
          onFocus={(e) => e.target.select()}
          step={0.001}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
        />
      </div>
      <div>
        <label className="text-center mx-2 my-2" htmlFor="valueTwo">
          {t("valTwo")}
        </label>
        <input
          type="number"
          id="valueTwo"
          value={inputValues[1][0]}
          onChange={(e) => handleChange(e, [1, 0])}
          onFocus={(e) => e.target.select()}
          step={0.001}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
        />
        <label className="text-center mx-2 my-2" htmlFor="volumeTwo">
          {t("volTwo")}
        </label>
        <input
          type="number"
          id="volumeTwo"
          value={inputValues[1][1]}
          onChange={(e) => handleChange(e, [1, 1])}
          onFocus={(e) => e.target.select()}
          step={0.001}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
        />
      </div>
      <div>
        <label className="text-center mx-2 my-2" htmlFor="totalVol">
          {t("totalVol")}
        </label>
        <input
          type="number"
          disabled
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
          value={blend.totalVolume}
        />
        <label className="text-center mx-2 my-2" htmlFor="blendedVal">
          {t("blendedVal")}
        </label>
        <input
          id="blendedVal"
          type="number"
          disabled
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
          value={Math.round(blend.blendedValue * 10 ** 4) / 10 ** 4}
        />
      </div>
      <button
        type="submit"
        className="col-span-4 bg-background rounded-2xl border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4"
      >
        Submit
      </button>
    </form>
  );
}
