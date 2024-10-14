import { getBrewLogs, updateBrewName } from "@/helpers/iSpindel";
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

import { CaretSortIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

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
  const { t } = useTranslation();
  const [fileName, setFileName] = useState("");
  const updateFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  console.log(brew);
  return (
    <div className="w-full">
      <div className="my-4">
        <h1>{t("iSpindelDashboard.brews.details")}:</h1>
        {brew && (
          <div>
            {brew.name ? (
              <p>Name: {brew.name}</p>
            ) : (
              <>
                <AlertDialog>
                  <AlertDialogTrigger
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    {t("iSpindelDashboard.addBrewName")}
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
                          onClick={() =>
                            updateBrewName(token, brew.id, fileName).then(() =>
                              setBrew((brew: any) => ({
                                ...brew,
                                name: fileName,
                              }))
                            )
                          }
                        >
                          {t("iSpindelDashboard.addBrewName")}
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            <p>
              {t("iSpindelDashboard.brews.startTime")}{" "}
              {formatDate(brew.start_date)}
            </p>
            <p>
              {t("iSpindelDashboard.brews.endTime")} {formatDate(brew.end_date)}
            </p>
          </div>
        )}
        {brew?.recipe_id ? (
          <Link
            to={`/recipes/${brew.recipe_id}`}
            className={buttonVariants({ variant: "default" })}
          >
            {t("iSpindelDashboard.brews.open")}
          </Link>
        ) : (
          <Link
            to={`/account/ispindel/link/${brewId}`}
            className={buttonVariants({ variant: "default" })}
          >
            {t("iSpindelDashboard.brews.link")}
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
              <h3>{t("iSpindelDashboard.brews.showLogs")}</h3>
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
