import { Dispatch, SetStateAction } from "react";
import Title from "../Title";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Textarea } from "../ui/textarea";

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
    <form className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 mt-24 mb-8 text-sm rounded-xl bg-background aspect-video sm:text-base">
      <Title header={t("notes.title")} />
      <Table>
        <TableHeader>
          <TableHead colSpan={3} className="text-2xl text-center">
            {t("notes.subtitleOne")}
          </TableHead>
          <TableRow>
            <TableHead></TableHead>

            <TableHead>{t("notes.note")}</TableHead>
            <TableHead>{t("notes.details")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {primaryNotes.map((note, index) => {
            return (
              <TableRow id="primaryNotes">
                <TableCell className="h-full text-start">
                  {index + 1}.
                </TableCell>
                <TableCell className="min-w-40">
                  <Textarea
                    value={note[0]}
                    placeholder={t("notes.placeholder")}
                    onChange={(e) => {
                      setPrimaryNotes((prev) => {
                        return prev.map((_, i) =>
                          i === index ? [e.target.value, prev[i][1]] : prev[i]
                        );
                      });
                    }}
                  />
                </TableCell>
                <TableCell className="min-w-40">
                  <span className="flex items-center justify-between gap-4">
                    <Textarea
                      className="w-10/12"
                      value={note[1]}
                      placeholder={t("notes.placeholder")}
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
                        className="flex items-center justify-center gap-4 px-8 py-2 my-4 text-lg border border-solid rounded-lg bg-background text-foreground hover:bg-foreground hover:border-background hover:text-background sm:gap-8 group"
                        type="button"
                        onClick={() => removeNote("primary", index)}
                      >
                        <FaMinusSquare />
                      </button>
                    )}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {primaryNotes.length < 10 && (
        <button
          className="flex items-center justify-center gap-4 px-8 py-2 my-4 text-lg border border-solid rounded-lg bg-background text-foreground hover:bg-foreground hover:border-background hover:text-background sm:gap-8 group"
          type="button"
          onClick={() => addNewNote("primary")}
        >
          <FaPlusSquare />
        </button>
      )}
      <Table>
        <TableHeader>
          <TableHead colSpan={3} className="text-2xl text-center">
            {t("notes.subtitleTwo")}
          </TableHead>
          <TableRow>
            <TableHead></TableHead>

            <TableHead>{t("notes.note")}</TableHead>
            <TableHead>{t("notes.details")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {secondaryNotes.map((note, index) => {
            return (
              <TableRow id="secondaryNotes">
                <TableCell className="h-full text-start">
                  {index + 1}.
                </TableCell>
                <TableCell className="min-w-40">
                  <Textarea
                    value={note[0]}
                    placeholder={t("notes.placeholder")}
                    onChange={(e) => {
                      setSecondaryNotes((prev) => {
                        return prev.map((_, i) =>
                          i === index ? [e.target.value, prev[i][1]] : prev[i]
                        );
                      });
                    }}
                  />
                </TableCell>
                <TableCell className="min-w-40">
                  <span className="flex items-center justify-between gap-4">
                    <Textarea
                      value={note[1]}
                      placeholder={t("notes.placeholder")}
                      className="w-10/12"
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
                        className="flex items-center justify-center gap-4 px-8 py-2 my-4 text-lg border border-solid rounded-lg bg-background text-foreground hover:bg-foreground hover:border-background hover:text-background sm:gap-8 group"
                        type="button"
                        onClick={() => removeNote("secondary", index)}
                      >
                        <FaMinusSquare />
                      </button>
                    )}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {secondaryNotes.length < 10 && (
        <button
          className="flex items-center justify-center gap-4 px-8 py-2 my-4 text-lg border border-solid rounded-lg bg-background text-foreground hover:bg-foreground hover:border-background hover:text-background sm:gap-8 group"
          type="button"
          onClick={() => addNewNote("secondary")}
        >
          <FaPlusSquare />
        </button>
      )}
    </form>
  );
}
