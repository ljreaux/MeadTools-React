import { useiSpindelContext } from "@/hooks/useiSpindelContext";

function Logs() {
  const { logs } = useiSpindelContext();
  return (
    <div>
      {logs.map((log) => (
        <div key={log.id}>
          {log.message}
          <button>More</button>
        </div>
      ))}
    </div>
  );
}

export default Logs;
