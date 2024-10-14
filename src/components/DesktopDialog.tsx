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

import { useNavigate } from "react-router-dom";
import useDesktopDialog from "@/hooks/useDesktopDialog";

function DesktopDialog() {
  const { open, setOpen } = useDesktopDialog();
  const { t } = useTranslation();
  const nav = useNavigate();
  return (
    <AlertDialog open={open} defaultOpen={open} onOpenChange={setOpen}>
      <AlertDialogContent className="z-[1000] overflow-scroll max-h-screen">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("desktop.dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-2"></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("donate.dialog.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              nav("/desktop");
            }}
          >
            {t("desktop.dialog.download")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DesktopDialog;
