import {
  brew,
  generateToken,
  getDeviceList,
  getLogs,
  stopBrew,
  updateCoeff,
} from "@/helpers/iSpindel";
import { createContext, useContext, useEffect, useState } from "react";

export interface ISpindelContext {
  token: string | null;
  deviceList: any[];
  logs: any[];
  logCount: number;
  getMoreLogs: () => void;
  getNewHydrometerToken: () => void;
  hydrometerToken: string | null;
  loading: boolean;
  startBrew: (id: string) => void;
  endBrew: (deviceId: string, brewId: string | null) => void;
  updateCoeff: (deviceId: string, coefficients: number[]) => void;
}

const HydroContext = createContext<any>(null);

export const useiSpindelContext = () =>
  useContext<ISpindelContext>(HydroContext);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [deviceList, setDeviceList] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [logCount, setLogCount] = useState(logs.length);
  const [hydrometerToken, setHydrometerToken] = useState<null | string>(null);
  const getMoreLogs = async () => {
    const moreLogs = await getLogs(token, logCount + 5);
    setLogs([...logs, ...moreLogs]);
    setLogCount(logCount + moreLogs.length);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const startBrew = async (id: string) => {
    if (token) {
      const [, { device }] = await brew(token, id);
      console.log(device.brew_id);
      setDeviceList((prev) =>
        prev.map((dev) => (dev.id === id ? device : dev))
      );
    }
  };

  const endBrew = async (device_id: string, brew_id: string) => {
    if (token) {
      const [, { device }] = await stopBrew(token, device_id, brew_id);
      console.log(device.brew_id);
      setDeviceList((prev) =>
        prev.map((dev) => (dev.id === device_id ? device : dev))
      );
    }
  };

  const updateCoefficients = async (
    device_id: string,
    coefficients: number[]
  ) => {
    if (token) {
      const device = await updateCoeff(token, device_id, coefficients);
      console.log(device.id);
      setDeviceList((prev) =>
        prev.map((dev) => (dev.id === device_id ? device : dev))
      );
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const { hydrometerToken, devices: deviceList } = await getDeviceList(
          token
        );
        setDeviceList(deviceList);
        setHydrometerToken(hydrometerToken);
      })();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      (async () => {
        const logs = await getLogs(token);
        setLogs(logs);
        setLogCount(logs.length);
      })();
    }
  }, [token]);

  const getNewHydrometerToken = async () => {
    try {
      setLoading(true);
      if (token) {
        const { token: hydroToken } = await generateToken(token);

        setHydrometerToken(hydroToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const context = {
    deviceList,
    logs,
    getMoreLogs,
    hydrometerToken,
    getNewHydrometerToken,
    loading,
    startBrew,
    endBrew,
    updateCoeff: updateCoefficients,
  };

  return (
    <HydroContext.Provider value={context}>{children}</HydroContext.Provider>
  );
};
