import { getBrewLogs } from "@/helpers/iSpindel";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { HydrometerData } from "./HydrometerData";
import { transformData } from "@/helpers/unitConverters";
import LogTable from "./LogTable";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

import { CaretSortIcon } from "@radix-ui/react-icons";

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
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="w-full">
      <div className="my-4">
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

      {logs.length > 0 && (
        <HydrometerData
          chartData={chartData}
          tempUnits={logs[0].temp_units}
        ></HydrometerData>
      )}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-center">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <h3>Show Logs</h3>
              <CaretSortIcon className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <LogTable logs={[...logs].reverse()} removeLog={removeLog}></LogTable>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default Brew;
