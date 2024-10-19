import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { toBrix } from "@/helpers/unitConverters";
import ChartDownload from "./ChartDownload";
type FileData = {
  date: string;
  temperature?: number;
  gravity: number;
  abv: number;
  signalStrength?: number;
  battery?: number;
};

export const description = "A multiple line chart";

export function HydrometerData({
  chartData,
  name,
  tempUnits,
}: {
  chartData: FileData[];
  name?: string;
  tempUnits: "C" | "F";
}) {
  const [gravityUnits, setGravityUnits] = useState("SG");

  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || "en-US";
  const [data, setData] = useState(chartData);

  const chartConfig = {
    temperature: {
      label: t("temperature"),
      color: "hsl(var(--chart-1))",
    },
    gravity: {
      label: gravityUnits === "Brix" ? t("BRIX") : t("nuteSgLabel"),
      color: "hsl(var(--chart-2))",
    },
    signalStrength: {
      label: t("iSpindelDashboard.signalStrength"),
      color: "hsl(var(--chart-3))",
    },
    battery: {
      label: t("iSpindelDashboard.batteryLevel"),
      color: "hsl(var(--chart-4))",
    },
    abv: {
      label: t("ABV"),
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
  const showSignalStrength = !!data[0].signalStrength;
  const showBattery = !!data[0].battery;
  const yPadding =
    showSignalStrength || showBattery ? { bottom: 15 } : undefined;
  const xPadding =
    showSignalStrength || showBattery ? { left: 45, right: 60 } : undefined;
  const beginDate = new Date(data[0].date).toLocaleDateString(lang, {
    month: "long",
    day: "numeric",
  });
  const endDate = new Date(data[data.length - 1].date).toLocaleDateString(
    lang,
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
  const [fileName, setFileName] = useState("");

  const initialChecked = Object.keys(chartConfig).reduce((acc, key) => {
    const label = key;
    acc[label] = true;
    return acc;
  }, {} as { [key: string]: boolean });

  const [checkObj, setCheckObj] = useState(initialChecked);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {beginDate} - {endDate}
        </CardDescription>
        <CardContent>
          <Select
            onValueChange={(val) => {
              const dataWithBrix = chartData.map((data) => {
                const newGravity = toBrix(data.gravity);
                return { ...data, gravity: newGravity };
              });
              if (val === "SG") {
                setData(chartData);
              } else if (val === "Brix") {
                setData(dataWithBrix);
              }
              setGravityUnits(val);
            }}
            value={gravityUnits}
          >
            <SelectTrigger>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SG">{t("SG")}</SelectItem>
              <SelectItem value="Brix">{t("BRIX")}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="hsl(210, 13%, 35%)" />
            <XAxis
              dataKey="date"
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleString(lang, {
                  month: "short",
                  weekday: "short",
                  day: "numeric",
                })
              }
              minTickGap={50}
              padding={xPadding}
            />
            <YAxis
              domain={[0.99, "dataMax + 0.01"]}
              tickCount={15}
              tickMargin={8}
              dataKey={"gravity"}
              yAxisId={"gravity"}
              tickFormatter={(val) => val.toFixed(3)}
              padding={yPadding}
              className={!checkObj.gravity ? "hidden" : "block"}
            />
            <YAxis
              domain={["dataMin - 5", "dataMax + 5"]}
              orientation="right"
              dataKey={"temperature"}
              yAxisId={"temperature"}
              tickCount={10}
              tickFormatter={(val) => val.toFixed()}
              padding={yPadding}
              unit={`°${tempUnits}`}
              className={!checkObj.temperature ? "hidden" : "block"}
            />
            <YAxis
              domain={[0, "dataMax"]}
              orientation="right"
              dataKey={"abv"}
              yAxisId={"abv"}
              tickFormatter={(val) => val.toFixed(1)}
              padding={yPadding}
              unit={"%"}
              className={!checkObj.abv ? "hidden" : "block"}
            />
            {showBattery && (
              <YAxis
                domain={[3.5, 4.2]}
                dataKey={"battery"}
                yAxisId={"battery"}
                tickFormatter={(val) => val.toFixed(2)}
                mirror
                padding={yPadding}
                unit={"V"}
                className={!checkObj.battery ? "hidden" : "block"}
              />
            )}
            {showSignalStrength && (
              <YAxis
                orientation="right"
                dataKey={"signalStrength"}
                yAxisId={"signalStrength"}
                tickCount={10}
                tickFormatter={(val) => val.toFixed()}
                mirror
                tickMargin={10}
                padding={yPadding}
                unit={"dB"}
                className={!checkObj.signalStrength ? "hidden" : "block"}
              />
            )}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(val) => {
                    const date = new Date(val);

                    const dateString = date.toLocaleString(lang, {
                      timeStyle: "medium",
                      dateStyle: "short",
                    });

                    return dateString;
                  }}
                />
              }
            />
            {showSignalStrength && (
              <Line
                dataKey="signalStrength"
                type="monotone"
                stroke="var(--color-signalStrength)"
                strokeWidth={2}
                dot={false}
                yAxisId={"signalStrength"}
                unit={"dB"}
                className={!checkObj.signalStrength ? "hidden" : "block"}
              />
            )}
            {showBattery && (
              <Line
                dataKey="battery"
                type="monotone"
                stroke="var(--color-battery)"
                strokeWidth={2}
                dot={false}
                yAxisId={"battery"}
                unit={"%"}
                className={!checkObj.battery ? "hidden" : "block"}
              />
            )}
            <Line
              dataKey="abv"
              type="monotone"
              stroke="var(--color-abv)"
              strokeWidth={2}
              dot={false}
              yAxisId={"abv"}
              unit={"%"}
              className={!checkObj.abv ? "hidden" : "block"}
            />
            <Line
              dataKey="temperature"
              type="monotone"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={false}
              yAxisId={"temperature"}
              unit={`°${tempUnits}`}
              className={!checkObj.temperature ? "hidden" : "block"}
            />
            <Line
              dataKey="gravity"
              type="monotone"
              stroke="var(--color-gravity)"
              strokeWidth={2}
              dot={false}
              yAxisId={"gravity"}
              className={!checkObj.gravity ? "hidden" : "block"}
            />
            <ChartLegend
              content={
                <ChartLegendContent
                  checkObj={checkObj}
                  updateCheckObj={(newCheckObj) =>
                    setCheckObj(newCheckObj.checkObj)
                  }
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <ChartDownload
          fileName={fileName}
          updateFileName={(e) => setFileName(e.target.value)}
          data={data}
        ></ChartDownload>
      </CardFooter>
    </Card>
  );
}