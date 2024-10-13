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
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ChartDownload({
  fileName,
  updateFileName,
  data,
}: {
  fileName: string;
  updateFileName: (e: ChangeEvent<HTMLInputElement>) => void;
  data: any[];
}) {
  const { t } = useTranslation();
  return (
    <span className="flex items-center justify-center gap-4">
      {t("iSpindelDashboard.chartDownload.desc")}
      <AlertDialog>
        <AlertDialogTrigger className={buttonVariants({ variant: "default" })}>
          {t("download")}
        </AlertDialogTrigger>
        <AlertDialogContent className="z-[1000] w-11/12">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("iSpindelDashboard.enter")}</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <Input value={fileName} onChange={updateFileName} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link
                to={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(
                    data.map((data, i) => ({ ...data, id: i + 1 }))
                  )
                )}`}
                download={`${
                  fileName.length > 0 ? fileName : "meadtools"
                }.hydro`}
              >
                {t("download")}
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
}

export default ChartDownload;
