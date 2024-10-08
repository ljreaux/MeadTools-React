import { Button } from "@/components/ui/button";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useNavigate } from "react-router-dom";
import TokenGen from "./RegisterDevice";

function Devices() {
  const { deviceList } = useiSpindelContext();
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-4 text-center">
      <TokenGen />
      <div className="flex">
        {deviceList.length === 0 && <p>No Devices yet.</p>}
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
  return (
    <div key={device.id} className="flex flex-col gap-2">
      <h2>{device.device_name}</h2>
      <div className="grid gap-1">
        <Button
          variant={"secondary"}
          onClick={() => nav(`./devices/${device.id}`)}
        >
          View Device Details
        </Button>

        {!device.brew_id ? (
          <Button variant={"secondary"} onClick={() => startBrew(device.id)}>
            Start Brew
          </Button>
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => endBrew(device.id, device.brew_id)}
          >
            End Brew
          </Button>
        )}
      </div>
    </div>
  );
};
