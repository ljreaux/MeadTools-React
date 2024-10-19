import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecentLogsForm from "./RecentLogsForm";
import LogTable from "./LogTable";
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
} from "@/components/ui/alert-dialog";
import { getLogs } from "@/helpers/iSpindel";

function Device() {
  const { t } = useTranslation();
  const [showTable, setShowTable] = useState(false);

  const {
    deviceList,
    startBrew,
    endBrew,
    updateCoeff,
    logs,
    setLogs,
    token,
    brews,
    deleteDevice,
  } = useiSpindelContext();
  const { deviceId } = useParams();
  const [device, setDevice] = useState<any>(null);

  const [coefficients, setCoefficients] = useState<string[]>([]);

  const updateCoefficients = (index: number, value: string) => {
    const newCoefficients = [...coefficients];

    newCoefficients[index] = value;
    setCoefficients(newCoefficients);
  };

  function validateCoefficients(arr: any[]) {
    if (arr.length < 4 || arr.includes(undefined)) return false;

    const found = arr.filter((item) => item === 0 || isNaN(Number(item)));

    return !found.length;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateCoefficients(coefficients);

    if (!isValid)
      return toast({
        description:
          "Please fill in all coefficients with valid number values.",
        variant: "destructive",
      });
    updateCoeff(
      device.id,
      coefficients.map((c) => Number(c))
    );
  };

  useEffect(() => {
    setDevice(deviceList.find((device) => device.id === deviceId));
  }, [deviceId, deviceList]);

  useEffect(() => {
    if (device?.coefficients?.length === 4)
      setCoefficients(device.coefficients);
  }, [device]);
  const removeLog = (id: string) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
  };

  const [fileName, setFileName] = useState("");
  const updateFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  useEffect(() => {
    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - 1);

    const start_date = new Date(from.setUTCHours(0, 0, 0, 0)).toISOString();
    const end_date = new Date(to.setUTCHours(23, 59, 59, 999)).toISOString();

    if (deviceId)
      getLogs(token, start_date, end_date, deviceId)
        .then((logs) => setLogs(logs))
        .catch((err) => console.error(err));
  }, [deviceId]);

  const brewName = brews.find((brew) => brew?.id === device?.brew_id)?.name;

  const nav = useNavigate();

  if (!device) return null;
  return (
    <div className="w-full">
      <div className="grid items-center justify-center grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 my-2">
          <p>{device.device_name}</p>
          {!device.brew_id ? (
            <>
              <AlertDialog>
                <AlertDialogTrigger
                  className={buttonVariants({ variant: "secondary" })}
                >
                  {t("iSpindelDashboard.startBrew")}
                </AlertDialogTrigger>
                <AlertDialogContent className="z-[1000] w-11/12">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("iSpindelDashboard.addBrewName")}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-2">
                      <Input value={fileName} onChange={updateFileName} />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        variant={"secondary"}
                        onClick={() => startBrew(device.id, fileName)}
                      >
                        {t("iSpindelDashboard.startBrew")}
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button
                variant={"destructive"}
                onClick={() => endBrew(device.id, device.brew_id)}
              >
                {t("iSpindelDashboard.endBrew", { brew_name: brewName })}
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-center col-start-1">
          {showTable ? (
            <form onSubmit={handleSubmit}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coefficient</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input
                        value={coefficients[0]}
                        onChange={(e) => updateCoefficients(0, e.target.value)}
                      ></Input>
                    </TableCell>
                    <TableCell>
                      &#215; angle<sup>3</sup> +
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Input
                        value={coefficients[1]}
                        onChange={(e) => updateCoefficients(1, e.target.value)}
                      ></Input>
                    </TableCell>
                    <TableCell>
                      &#215; angle<sup>2</sup> +
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Input
                        value={coefficients[2]}
                        onChange={(e) => updateCoefficients(2, e.target.value)}
                      ></Input>
                    </TableCell>
                    <TableCell>&#215; angle +</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Input
                        value={coefficients[3]}
                        onChange={(e) => updateCoefficients(3, e.target.value)}
                      ></Input>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                onClick={() => {
                  if (device?.coefficients?.length === 4)
                    setCoefficients(device.coefficients);
                  setShowTable(false);
                }}
                variant={"destructive"}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <Button onClick={() => setShowTable(true)} className="mx-auto my-2">
              {t("iSpindelDashboard.updateCoefficients")}
            </Button>
          )}
        </div>
        <RecentLogsForm deviceId={device.id} />
      </div>
      <div className="max-w-full">
        <LogTable logs={logs} removeLog={removeLog} />
      </div>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({ variant: "destructive" })}
        >
          Delete Device
        </AlertDialogTrigger>
        <AlertDialogContent className="z-[1000] w-11/12">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              Are you sure you want to delete this device? This action cannot be
              undone. All logs related to this device that are not tied to any
              brew will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              asChild
              className={buttonVariants({ variant: "destructive" })}
            >
              <Button
                onClick={() =>
                  deleteDevice(device.id)
                    .then(() => nav("/account/ispindel"))
                    .catch(() =>
                      toast({
                        description: "Something went wrong",
                        variant: "destructive",
                      })
                    )
                }
              >
                Delete Device
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Device;
