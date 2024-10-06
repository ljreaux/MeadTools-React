import { Button } from "@/components/ui/button";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useNavigate } from "react-router-dom";

function Devices() {
  const { deviceList, hydrometerToken } = useiSpindelContext();
  console.log(deviceList);
  return (
    <div>
      {hydrometerToken}
      {deviceList.length || <p>No Devices yet.</p>}
      {deviceList.map((dev) => (
        <DeviceCard device={dev} />
      ))}
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
    <div key={device.id}>
      <h2>{device.device_name}</h2>
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
  );
};
