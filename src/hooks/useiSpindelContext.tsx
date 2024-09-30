import { generateToken, getDeviceList, getLogs } from "@/helpers/iSpindel";
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
        console.log(hydroToken);
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
  };

  return (
    <HydroContext.Provider value={context}>{children}</HydroContext.Provider>
  );
};
