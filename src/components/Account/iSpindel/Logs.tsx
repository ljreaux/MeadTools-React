import { useiSpindelContext } from "@/hooks/useiSpindelContext";

function Logs() {
  const { logs, getMoreLogs } = useiSpindelContext();
  return (
    <div>
      {logs.map((log) => (
        <div key={log.id}>
          {log.message}
          <button onClick={getMoreLogs}>More</button>
        </div>
      ))}
    </div>
  );
}

export default Logs;
