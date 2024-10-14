import { Button, buttonVariants } from "@/components/ui/button";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useNavigate } from "react-router-dom";
import TokenGen from "./RegisterDevice";
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
import { useState } from "react";
import { Input } from "@/components/ui/input";

function Devices() {
  const { deviceList } = useiSpindelContext();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-4 text-center">
      <TokenGen />
      <div className="flex">
        {deviceList.length === 0 && <p>{t("noDevices")}</p>}
        {deviceList.map((dev) => (
          <DeviceCard device={dev} key={dev.id} />
        ))}
      </div>
    </div>
  );
}

export default Devices;

type DeviceType = {
  id: string;
  device_name: string;
  brew_id: string | null;
  recipe_id: string | null;
  coefficients: number[];
};

const DeviceCard = ({ device }: { device: DeviceType }) => {
  const { startBrew, endBrew } = useiSpindelContext();
  const nav = useNavigate();
  const { t } = useTranslation();
  const [fileName, setFileName] = useState("");
  const updateFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  return (
    <div key={device.id} className="flex flex-col gap-2">
      <h2>{device.device_name}</h2>
      <div className="grid gap-1">
        <Button
          variant={"secondary"}
          onClick={() => nav(`./devices/${device.id}`)}
        >
          {t("iSpindelDashboard.deviceDetails")}
        </Button>

        {!device.brew_id ? (
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
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => endBrew(device.id, device.brew_id)}
          >
            {t("iSpindelDashboard.endBrew")}
          </Button>
        )}
      </div>
    </div>
  );
};
