import { Link, Route, Routes } from "react-router-dom";
import Devices from "./Devices";
import Device from "./Device";
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
import Setup from "./Setup";
import LinkBrew from "./LinkBrew";
import Recipe from "./Recipe";
import { useTranslation } from "react-i18next";

function ISpindelDashboard() {
  const { t } = useTranslation();
  return (
    <ContextProvider>
      <div className="relative flex flex-col items-center w-11/12 p-8 my-24 sm:w-9/12 rounded-xl bg-background">
        <h1 className="text-2xl">{t("iSpindelDashboard.label")}</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Devices />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/devices/:deviceId" element={<Device />} />
          <Route path="/logs/:brewId" element={<Brew />} />
          <Route path="/brews" element={<Brews />} />
          <Route path="/link/:brewId" element={<LinkBrew />} />
          <Route path="/recipe/:recipeId" element={<Recipe />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default ISpindelDashboard;

const Nav = () => {
  const { t } = useTranslation();
  const baseRoute = "/account/ispindel";
  const navLinks = [
    {
      name: "iSpindelDashboard.nav.device",
      to: baseRoute,
    },
    {
      name: "iSpindelDashboard.nav.brews",
      to: baseRoute + "/brews",
    },
    {
      name: "iSpindelDashboard.nav.setup",
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
            {t(navLink.name)}
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
