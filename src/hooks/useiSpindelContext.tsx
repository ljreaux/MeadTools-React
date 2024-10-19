import {
  brew,
  deleteBrew,
  deleteDevice,
  fetchAllBrews,
  generateToken,
  getDeviceList,
  stopBrew,
  updateCoeff,
} from "@/helpers/iSpindel";
import { createContext, useContext, useEffect, useState } from "react";

export interface ISpindelContext {
  token: string | null;
  deviceList: any[];
  logs: any[];
  setLogs: (logs: any[]) => void;
  logCount: number;

  getNewHydrometerToken: () => void;
  hydrometerToken: string | null;
  loading: boolean;
  startBrew: (id: string, brewName: string | null) => void;
  endBrew: (deviceId: string, brewId: string | null) => void;
  updateCoeff: (deviceId: string, coefficients: number[]) => void;
  brews: any[];
  deleteDevice: (deviceId: string) => Promise<void>;
  deleteBrew: (brewId: string) => Promise<void>;
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

  const [hydrometerToken, setHydrometerToken] = useState<null | string>(null);
  const [brews, setBrews] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const startBrew = async (id: string, brewName = null) => {
    if (token) {
      const [, { device }] = await brew(token, id, brewName);

      setDeviceList((prev) =>
        prev.map((dev) => (dev.id === id ? device : dev))
      );
    }
  };

  const endBrew = async (device_id: string, brew_id: string) => {
    if (token) {
      const [, { device }] = await stopBrew(token, device_id, brew_id);

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

  const getBrews = async () => {
    try {
      setLoading(true);
      if (token) {
        const brews = await fetchAllBrews(token);
        return brews;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getBrews()
        .then((brews) => {
          if (brews) setBrews(brews);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const removeDevice = async (deviceId: string) => {
    deleteDevice(token, deviceId).then(() => {
      setDeviceList((prev) => prev.filter((dev) => dev.id !== deviceId));
    });
  };

  const removeBrew = async (brewId: string) => {
    await deleteBrew(token, brewId)
      .then(() => {
        setBrews((prev) => prev.filter((brew) => brew.id !== brewId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const context = {
    token,
    deviceList,
    logs,
    setLogs,
    hydrometerToken,
    getNewHydrometerToken,
    loading,
    startBrew,
    endBrew,
    updateCoeff: updateCoefficients,
    brews,
    deleteDevice: removeDevice,
    deleteBrew: removeBrew,
  };

  return (
    <HydroContext.Provider value={context}>{children}</HydroContext.Provider>
  );
};
