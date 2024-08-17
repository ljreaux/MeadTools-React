import React, { Dispatch, SetStateAction } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/full-logo.png";
import logoOnly from "../../assets/logoOnly.png";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { MdExpandCircleDown } from "react-icons/md";
// import { IoIosArrowDropupCircle } from "react-icons/io";

import { useTranslation } from "react-i18next";
import { ModeToggle } from "../ui/mode-toggle";
import LanguageSwitcher from "../ui/Language-switcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const mainCalcs = [
  {
    path: "/",
    label: "calculators.recipes",
  },
  {
    path: "/NuteCalc/",
    label: "calculators.nutes",
  },
];

const extraCalculatorLinks = [
  {
    path: "/ExtraCalcs/",
    label: "calculators.extraCalcs.abv",
  },
  {
    path: "/ExtraCalcs/brixCalc",
    label: "calculators.extraCalcs.brix",
  },
  {
    path: "/ExtraCalcs/estOG",
    label: "calculators.extraCalcs.estOG",
  },
  {
    path: "/ExtraCalcs/benchTrials",
    label: "calculators.extraCalcs.benchTrials",
  },
  {
    path: "/ExtraCalcs/stabilizers",
    label: "calculators.extraCalcs.stabilizers",
  },
  {
    path: "/ExtraCalcs/RefractometerCorrection",
    label: "calculators.extraCalcs.refractometer",
  },
  {
    path: "/ExtraCalcs/tempCorrection",
    label: "calculators.extraCalcs.tempCorrection",
  },
  {
    path: "/ExtraCalcs/blending",
    label: "calculators.extraCalcs.blending",
  },
];

const extraLinks = [
  {
    path: "/about",
    label: "additionalLinks.about",
  },
  {
    path: "/contact",
    label: "additionalLinks.contact",
  },
  {
    path: "https://yeasts.meadtools.com",
    label: "yeasts",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// const NavLinks = ({
//   links,
// }: {
//   links: { path: string; label: string; external?: boolean }[];
// }) => {
//   const { t } = useTranslation();
//   return links.map((link, index) => {
//     if (link.external)
//       return (
//         <a
//           href={link.path}
//           key={index}
//           className="hover:text-background transition-colors sm:mx-4 mx-[.125rem]"
//         >
//           {t(link.label)}
//         </a>
//       );

//     return (
//       <NavLink
//         key={index}
//         className="hover:text-background transition-colors sm:mx-4 mx-[.125rem]"
//         to={link.path}
//       >
//         {t(link.label)}
//       </NavLink>
//     );
//   });
// };

// interface Opened {
//   menu: boolean;
//   calcs: boolean;
//   extraCalcs: boolean;
//   account: boolean;
//   links: boolean;
//   settings: boolean;
// }

export default function Navbar({
  token,
  setToken,
  setUser,
}: {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<
    SetStateAction<{ id: number; role: "user" | "admin"; email: string } | null>
  >;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <nav className="sm:h-20 h-28 fixed top-0 z-[49] flex items-center justify-between mb-[1rem] border-b-2 border-background">
      <div className="relative grid items-center justify-center w-screen h-full gap-2 text-xl text-center sm:justify-between sm:flex bg-background text-foreground">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Calculators</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid sm:gap-3 gap-2 sm:p-4 p-2 sm:min-w-[400px] min-w-[300px] lg:grid-cols-[1fr_1fr] text-start">
                  <li className="col-span-full">Main Calculators</li>
                  {mainCalcs.map((link) => {
                    return (
                      <ListItem
                        key={link.path}
                        title={t(link.label)}
                        href={link.path}
                      />
                    );
                  })}
                </ul>
                <ul className="grid sm:gap-3 gap-2 sm:p-4 p-2 sm:min-w-[400px] min-w-[300px] lg:grid-cols-[1fr_1fr] text-start">
                  <li className="col-span-full">Extra Calculators</li>
                  {extraCalculatorLinks.map((link) => {
                    return (
                      <ListItem
                        key={link.path}
                        title={t(link.label)}
                        href={link.path}
                      />
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex sm:min-w-[400px] min-w-[300px] p-4">
                  {token ? (
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          setToken(null);
                          localStorage.removeItem("refreshToken");
                          localStorage.removeItem("user");
                          setUser(null);
                          navigate("/login");
                        }}
                        className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground "
                      >
                        {t("account.logout")}
                      </button>
                    </li>
                  ) : (
                    <li>
                      <NavLink
                        className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground "
                        to="/login"
                      >
                        {t("account.login")}
                      </NavLink>
                    </li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Additional Links</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex gap-3 p-4 sm:min-w-[400px] min-w-[300px] justify-center">
                  {extraLinks.map((link) => {
                    return (
                      <ListItem
                        key={link.path}
                        title={t(link.label)}
                        href={link.path}
                      />
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <nav className="flex items-center justify-between sm:text-[1rem] text-[.6rem] my-0">
          <button
            className="relative ml-4"
            onClick={() =>
              setOpened((prev) => {
                return { ...prev, menu: !prev.menu };
              })
            }
          >
            {opened.menu ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
          <div
            className={`${
              opened.menu ? "grid" : "hidden"
            } w-[40vw] bg-background text-start left-0 rounded-xl translate-y-2/4 mt-8 -mx-8`}
          >
            <div className="flex items-center justify-center mx-2 transition-colors w-fit hover:text-background">
              <NavLink to="/">{t("calculators.label")}</NavLink>
              <button
                className="mx-2"
                onClick={() =>
                  setOpened((prev) => {
                    return { ...prev, calcs: !prev.calcs };
                  })
                }
              >
                {opened.calcs ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <MdExpandCircleDown />
                )}
              </button>
            </div>
            <div className={`${opened.calcs ? "grid" : "hidden"} mx-2`}>
              <NavLinks links={calculatorLinks} />
            </div>
            <div className="flex items-center mx-2 transition-colors w-fit hover:text-background ">
              <NavLink to={"/account"}>{t("account.label")}</NavLink>
              <button
                className="mx-2"
                onClick={() =>
                  setOpened((prev) => {
                    return { ...prev, account: !prev.account };
                  })
                }
              >
                {opened.account ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <MdExpandCircleDown />
                )}
              </button>
            </div>
            <div className={`${opened.account ? "block" : "hidden"} mx-2`}>
              {token ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");
                    setUser(null);
                    navigate("/login");
                  }}
                  className="mx-2 transition-colors hover:text-background sm:mx-4 "
                >
                  {t("account.logout")}
                </button>
              ) : (
                <NavLink
                  className="mx-2 transition-colors hover:text-background sm:mx-4 "
                  to="/login"
                >
                  {t("account.login")}
                </NavLink>
              )}
            </div>
            <div className="flex items-center mx-2 transition-colors w-fit hover:text-background">
              <NavLink to="/about">{t("additionalLinks.label")}</NavLink>
              <button
                className="mx-2"
                onClick={() =>
                  setOpened((prev) => {
                    return { ...prev, links: !prev.links };
                  })
                }
              >
                {opened.links ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <MdExpandCircleDown />
                )}
              </button>
            </div>
            <div className={`${opened.links ? "grid" : "hidden"} mx-2`}>
              <NavLinks links={extraLinks} />
            </div>
          </div>
        </nav> */}
        <div className="flex items-center justify-center h-full">
          <div className="flex gap-4 ml-4 mr-auto sm:mr-4">
            <ModeToggle />
            <LanguageSwitcher />
          </div>
          <Link
            className="bg-background w-[3rem] sm:flex sm:w-24 lg:w-52 h-full left-0 border-[1px] border-sidebar hover:opacity-80 transition-all"
            to="/"
          >
            <span className="flex flex-col items-center justify-center w-full h-full bg-secondary">
              <img src={logo} alt="MeadTools logo" className="hidden lg:flex" />
              <img
                src={logoOnly}
                alt="MeadTools logo"
                className="lg:hidden w-[50%]"
              />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
