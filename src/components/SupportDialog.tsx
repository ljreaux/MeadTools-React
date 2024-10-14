import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import useSupportDialog from "@/hooks/useSupportDialog";

function SupportDialog() {
  const { open, setOpen } = useSupportDialog();
  const { t } = useTranslation();
  const splitText = (text: string) => {
    const paragraphs = text.split("\n");
    return paragraphs.map((p, i) => <p key={i}>{p}</p>);
  };
  return (
    <AlertDialog open={open} defaultOpen={open} onOpenChange={setOpen}>
      <AlertDialogContent className="z-[1000] overflow-scroll max-h-screen">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("donate.dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-2">
            {splitText(t("donate.dialog.content"))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("donate.dialog.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              window.open("https://ko-fi.com/meadtools", "_blank");
            }}
          >
            {t("donate.dialog.support")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SupportDialog;
