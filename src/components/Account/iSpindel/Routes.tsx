import { Link, Route, Routes } from "react-router-dom";
import Devices from "./Devices";
import RegisterDevice from "./RegisterDevice";
import Device from "./Device";
import Logs from "./Logs";
import Brew from "./Brew";

import { ContextProvider } from "@/hooks/useiSpindelContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import Brews from "./Brews";

function ISpindelDashboard() {
  return (
    <ContextProvider>
      <div className="relative flex flex-col items-center w-11/12 p-8 my-24 sm:w-9/12 rounded-xl bg-background">
        <h1 className="text-2xl">iSpindel Dashboard</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Devices />} />
          <Route path="/register" element={<RegisterDevice />} />
          <Route path="/devices/:deviceId" element={<Device />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/logs/:brewId" element={<Brew />} />
          <Route path="/brews" element={<Brews />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default ISpindelDashboard;

const Nav = () => {
  const baseRoute = "/account/ispindel";
  const navLinks = [
    {
      name: "Device List",
      to: baseRoute,
    },
    {
      name: "Generate Token",
      to: baseRoute + "/register",
    },
    {
      name: "Brews",
      to: baseRoute + "/brews",
    },
    {
      name: "Setup",
      to: baseRoute + "/setup",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="absolute top-2 left-4">
        <Button variant={"ghost"}>
          <GiHamburgerMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-6 space-y-2">
        {navLinks.map((navLink) => (
          <Link to={navLink.to} key={navLink.name}>
            {navLink.name}
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
