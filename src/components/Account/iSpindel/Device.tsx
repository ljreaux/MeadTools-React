import { getDeviceDetails } from "@/helpers/iSpindel";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Device() {
  const { token } = useiSpindelContext();
  const { deviceId } = useParams();
  const [device, setDevice] = useState<any>(null);

  useEffect(() => {
    if (deviceId) {
      (async () => {
        const device = await getDeviceDetails(token, deviceId);
        setDevice(device);
      })();
    }
  }, []);

  return <div>{deviceId}</div>;
}

export default Device;
