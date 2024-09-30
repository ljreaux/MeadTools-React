import { Route, Routes } from "react-router-dom";
import Devices from "./Devices";
import RegisterDevice from "./RegisterDevice";
import Device from "./Device";
import Logs from "./Logs";
import Brew from "./Brew";

import { ContextProvider } from "@/hooks/useiSpindelContext";

function ISpindelDashboard() {
  return (
    <ContextProvider>
      <div className="flex flex-col items-center w-11/12 p-8 sm:w-9/12 rounded-xl bg-background">
        <Routes>
          <Route path="/" element={<Devices />} />
          <Route path="/register" element={<RegisterDevice />} />
          <Route path="/devices/:deviceId" element={<Device />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/logs/:brewId" element={<Brew />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default ISpindelDashboard;
