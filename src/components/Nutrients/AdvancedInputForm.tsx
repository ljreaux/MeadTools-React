import { SetStateAction, Dispatch } from "react";
import Title from "../Title";
import { useTranslation } from "react-i18next";

export default function AdvancedInputForm({
  advanced,
  yanFromSource,
  setYanFromSource,
  yanContribution,
  setYanContribution,
}: {
  advanced: boolean;
  yanFromSource: null | number[];
  setYanFromSource: Dispatch<SetStateAction<null | number[]>>;
  yanContribution: number[];
  setYanContribution: Dispatch<SetStateAction<number[]>>;
}) {
  const { t } = useTranslation();
  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <div className="text-center">
        <Title header={t("advancedNutrition.label")} />
        <label htmlFor="yanContribution" className="w-full">
          {t("advancedNutrition.yanContribution")}
        </label>
        <div
          id="yanContribution"
          className="grid grid-cols-3 gap-4 text-center"
        >
          <label htmlFor="fermaidO">
            {t("nutrients.fermO")}
            <input
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={yanContribution[0]}
              onFocus={(e) => e.target.select()}
              onChange={(e) =>
                setYanContribution((prev) => {
                  return prev.map((item, i) => {
                    return i === 0 ? Number(e.target.value) : item;
                  });
                })
              }
            />
          </label>
          <label htmlFor="fermaidK">
            {t("nutrients.fermK")}
            <input
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={yanContribution[1]}
              onFocus={(e) => e.target.select()}
              onChange={(e) =>
                setYanContribution((prev) => {
                  return prev.map((item, i) => {
                    return i === 1 ? Number(e.target.value) : item;
                  });
                })
              }
            />
          </label>
          <label htmlFor="dap">
            {t("nutrients.dap")}
            <input
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={yanContribution[2]}
              onFocus={(e) => e.target.select()}
              onChange={(e) =>
                setYanContribution((prev) => {
                  return prev.map((item, i) => {
                    return i === 2 ? Number(e.target.value) : item;
                  });
                })
              }
            />
          </label>
        </div>
      </div>
      <div className="text-center">
        <label htmlFor="yanFromSource" className="w-full">
          {t("advancedNutrition.yanFromSource")}
        </label>
        <div id="yanFromSource" className="grid grid-cols-3 gap-4 text-center">
          <label htmlFor="fermaidO">
            {t("nutrients.fermO")}
            <input
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={advanced && yanFromSource ? yanFromSource[0] : 0}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                setYanFromSource((prev: null | number[]) => {
                  if (prev) {
                    return prev.map((item, i) => {
                      return i === 0 ? Number(e.target.value) : item;
                    });
                  } else return null;
                });
              }}
            />
          </label>
          <label htmlFor="fermaidK">
            {t("nutrients.fermK")}
            <input
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={advanced && yanFromSource ? yanFromSource[1] : 0}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                setYanFromSource((prev: null | number[]) => {
                  if (prev) {
                    return prev.map((item, i) => {
                      return i === 1 ? Number(e.target.value) : item;
                    });
                  } else return null;
                });
              }}
            />
          </label>
          <label htmlFor="dap">
            {t("nutrients.dap")}
            <input
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
              value={advanced && yanFromSource ? yanFromSource[2] : 0}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                setYanFromSource((prev: null | number[]) => {
                  if (prev) {
                    return prev.map((item, i) => {
                      return i === 2 ? Number(e.target.value) : item;
                    });
                  } else return null;
                });
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
