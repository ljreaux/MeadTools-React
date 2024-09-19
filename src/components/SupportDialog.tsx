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
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

function SupportDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog open={open} defaultOpen={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="fixed bottom-2 right-2">
        <Button variant={"emphasis"} className="gap-2">
          <LiaMoneyBillWaveSolid />
          {t("donate.trigger")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("donate.dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("donate.dialog.content")}
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
