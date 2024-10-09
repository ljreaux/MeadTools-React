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
  return (
    <span>
      Download Chart data for MeadTools Desktop.
      <AlertDialog>
        <AlertDialogTrigger className={buttonVariants({ variant: "default" })}>
          Download
        </AlertDialogTrigger>
        <AlertDialogContent className="z-[1000] max-w-screen">
          <AlertDialogHeader>
            <AlertDialogTitle>Enter File Name</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <Input value={fileName} onChange={updateFileName} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                Download File
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
}

export default ChartDownload;
