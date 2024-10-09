import { calcABV } from "@/hooks/useAbv";

export const toBrix = (value: number) => {
  return -668.962 + 1262.45 * value - 776.43 * value ** 2 + 182.94 * value ** 3;
};

export const toSG = (gravityReading: number) => {
  return (
    1.00001 +
    0.0038661 * gravityReading +
    1.3488 * 10 ** -5 * gravityReading ** 2 +
    4.3074 * 10 ** -8 * gravityReading ** 3
  );
};

export const transformData = (logs: any[]) => {
  const og = logs[0]?.calculated_gravity || logs[0]?.gravity;
  return logs.map((log) => {
    const sg = log.calculated_gravity || log.gravity;
    const abv = Math.round(calcABV(og, sg) * 1000) / 1000;
    return {
      date: log.datetime,
      temperature: log.temperature,
      gravity: sg,
      battery: log.battery,
      abv,
    };
  });
}