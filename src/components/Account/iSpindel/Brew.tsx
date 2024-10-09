import { getBrewLogs } from "@/helpers/iSpindel";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { HydrometerData } from "./HydrometerData";
import useChangeLogger from "@/hooks/useChangeLogger";
import { transformData } from "@/helpers/unitConverters";
import LogTable from "./LogTable";
import { buttonVariants } from "@/components/ui/button";

function Brew() {
  const { i18n } = useTranslation();
  const formatter = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    dateStyle: "short",
    timeStyle: "short",
  });
  const formatDate = (date: Date) => formatter.format(new Date(date));
  const { token, brews } = useiSpindelContext();
  const { brewId } = useParams();
  const [brew, setBrew] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const removeLog = (id: string) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
  };

  useEffect(() => {
    if (brewId && token) {
      (async () => {
        const brew = brews.find((brew) => brew.id === brewId);

        setBrew(brew);
        const logs = await getBrewLogs(token, brewId);

        setLogs(logs);
      })();
    }
  }, [brewId, token]);

  const chartData = transformData(logs);

  useChangeLogger(chartData);

  return (
    <div className="max-w-full ">
      <div>
        <h1>Brew Details</h1>
        {brew && (
          <div>
            <p>Start Time: {formatDate(brew.start_date)}</p>
            <p>End Time: {formatDate(brew.end_date)}</p>
          </div>
        )}
        {brew?.recipe_id ? (
          <Link
            to={`/recipes/${brew.recipe_id}`}
            className={buttonVariants({ variant: "default" })}
          >
            Open Recipe
          </Link>
        ) : (
          <Link
            to={`/account/ispindel/link/${brewId}`}
            className={buttonVariants({ variant: "default" })}
          >
            Link Recipe
          </Link>
        )}
      </div>
      <h2>Logs</h2>
      <LogTable logs={logs} removeLog={removeLog}></LogTable>
      {logs.length > 0 && (
        <HydrometerData
          chartData={chartData}
          tempUnits={logs[0].temp_units}
        ></HydrometerData>
      )}
    </div>
  );
}

export default Brew;
