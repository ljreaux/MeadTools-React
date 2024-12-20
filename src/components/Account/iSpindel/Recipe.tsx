import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HydrometerData } from "./HydrometerData";
import { transformData } from "@/helpers/unitConverters";
import { getBrewLogs } from "@/helpers/iSpindel";
import { useTranslation } from "react-i18next";

function Recipe() {
  const { t } = useTranslation();
  const { recipeId } = useParams();
  const { brews: allBrews, token } = useiSpindelContext();

  const brews = allBrews.filter((brew) => brew.recipe_id === Number(recipeId));

  const [selectedBrew, setSelectedBrew] = useState<any>(null);

  const handleChange = async (value: string) => {
    setSelectedBrew(brews.find((b) => b.id === value));
    if (token) {
      const logs = await getBrewLogs(token, value);

      setLogs(logs);
      setChartData(transformData(logs));
    }
  };

  const [logs, setLogs] = useState<any[]>([]);

  const [chartData, setChartData] = useState(transformData(logs));

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Select value={selectedBrew?.id} onValueChange={handleChange}>
        <SelectTrigger className="my-4">
          <SelectValue placeholder="Select a brew to see chart data"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {brews.map((brew) => (
            <SelectItem key={brew.id} value={brew.id}>
              {brew.name ?? brew.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {logs.length > 0 ? (
        <HydrometerData
          chartData={chartData}
          tempUnits={logs[0].temp_units}
        ></HydrometerData>
      ) : (
        <>{t("noLogs")}</>
      )}
    </div>
  );
}

export default Recipe;
