import { useiSpindelContext } from "@/hooks/useiSpindelContext";

function Devices() {
  const { deviceList } = useiSpindelContext();
  return (
    <div>
      {deviceList.map((dev) => (
        <div key={dev.id}>
          <h2>{dev.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Devices;
