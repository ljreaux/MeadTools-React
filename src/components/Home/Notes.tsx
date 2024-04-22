import { Dispatch, SetStateAction } from "react";
import Title from "../Title";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Notes({
  primaryNotes,
  setPrimaryNotes,
  secondaryNotes,
  setSecondaryNotes,
}: {
  primaryNotes: string[][];
  secondaryNotes: string[][];
  setPrimaryNotes: Dispatch<SetStateAction<string[][]>>;
  setSecondaryNotes: Dispatch<SetStateAction<string[][]>>;
}) {
  function addNewNote(type: "primary" | "secondary") {
    type === "primary" && setPrimaryNotes((prev) => [...prev, ["", ""]]);
    type === "secondary" && setSecondaryNotes((prev) => [...prev, ["", ""]]);
  }

  function removeNote(type: "primary" | "secondary", index: number) {
    type === "primary" &&
      setPrimaryNotes((prev) => prev.filter((_, i) => i !== index));
    type === "secondary" &&
      setSecondaryNotes((prev) => prev.filter((_, i) => i !== index));
  }

  const { t } = useTranslation();

  return (
    <form className="w-11/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 mb-8 mt-24 aspect-video gap-4 sm:text-base text-sm">
      <Title header={t("notes.title")} />
      <label htmlFor="primaryNotes">{t("notes.subtitleOne")}</label>
      <div className="grid grid-cols-notes gap-4 w-full">
        <label htmlFor="Note" className="col-start-2">
          {t("notes.note")}
        </label>
        <label htmlFor="details" className="col-start-3">
          {t("notes.details")}
        </label>
      </div>
      {primaryNotes.map((note, index) => {
        return (
          <div
            id="primaryNotes"
            className="grid grid-cols-notes w-full gap-4 items-center justify-center"
          >
            <p className="h-full text-start">{index + 1}.</p>
            <textarea
              value={note[0]}
              placeholder={t("notes.placeholder")}
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setPrimaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [e.target.value, prev[i][1]] : prev[i]
                  );
                });
              }}
            />
            <textarea
              value={note[1]}
              placeholder={t("notes.placeholder")}
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setPrimaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [prev[i][0], e.target.value] : prev[i]
                  );
                });
              }}
            />
            {index > 0 && (
              <button
                className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 h-fit"
                type="button"
                onClick={() => removeNote("primary", index)}
              >
                <FaMinusSquare />
              </button>
            )}
          </div>
        );
      })}
      {primaryNotes.length < 10 && (
        <button
          className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2"
          type="button"
          onClick={() => addNewNote("primary")}
        >
          <FaPlusSquare />
        </button>
      )}
      <label htmlFor="secondaryNotes">{t("notes.subtitleTwo")}</label>
      <div className="grid grid-cols-notes gap-4 w-full">
        <label htmlFor="Note" className="col-start-2">
          {t("notes.note")}
        </label>
        <label htmlFor="details" className="col-start-3">
          {t("notes.details")}
        </label>
      </div>
      {secondaryNotes.map((note, index) => {
        return (
          <div
            id="secondaryNotes"
            className="grid grid-cols-notes w-full gap-4 items-center justify-center"
          >
            <p className="h-full text-start">{index + 1}.</p>
            <textarea
              value={note[0]}
              placeholder={t("notes.placeholder")}
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setSecondaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [e.target.value, prev[i][1]] : prev[i]
                  );
                });
              }}
            />
            <textarea
              value={note[1]}
              placeholder={t("notes.placeholder")}
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setSecondaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [prev[i][0], e.target.value] : prev[i]
                  );
                });
              }}
            />
            {index > 0 && (
              <button
                className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 h-fit"
                type="button"
                onClick={() => removeNote("secondary", index)}
              >
                <FaMinusSquare />
              </button>
            )}
          </div>
        );
      })}
      {secondaryNotes.length < 10 && (
        <button
          className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2"
          type="button"
          onClick={() => addNewNote("secondary")}
        >
          <FaPlusSquare />
        </button>
      )}
    </form>
  );
}
