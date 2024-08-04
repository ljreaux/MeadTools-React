import { Dispatch, SetStateAction } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/full-logo.png";
import logoOnly from "../../assets/logoOnly.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { MdExpandCircleDown } from "react-icons/md";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useTranslation } from "react-i18next";

const calculatorLinks = [
  {
    path: "/",
    label: "calculators.recipes",
  },
  {
    path: "/NuteCalc/",
    label: "calculators.nutes",
  },
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
];

const NavLinks = ({ links }: { links: { path: string; label: string }[] }) => {
  const { t } = useTranslation();
  return links.map((link, index) => {
    return (
      <NavLink
        key={index}
        className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
        to={link.path}
      >
        {t(link.label)}
      </NavLink>
    );
  });
};

interface Opened {
  menu: boolean;
  calcs: boolean;
  extraCalcs: boolean;
  account: boolean;
  links: boolean;
  settings: boolean;
}

export default function Navbar({
  token,
  setToken,
  setUser,
  opened,
  setOpened,
  theme: isDarkTheme,
  setTheme: toggle,
}: {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<
    SetStateAction<{ id: number; role: "user" | "admin"; email: string } | null>
  >;
  opened: Opened;
  setOpened: Dispatch<SetStateAction<Opened>>;
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}) {
  const { t, i18n } = useTranslation();
  // const { theme, toggle } = useThemeButton();
  const navigate = useNavigate();
  return (
    <nav className="h-20 fixed top-0 z-[51] flex items-center justify-between mb-[1rem]">
      <div className="relative flex items-center justify-between w-screen h-full text-xl text-center bg-sidebar text-textColor">
        <nav className="flex items-center justify-between sm:text-[1rem] text-[.6rem] my-0">
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
            } w-[40vw] bg-sidebar text-start left-0 rounded-xl translate-y-2/4 mt-8 -mx-8`}
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
        </nav>
        <div className="flex items-center justify-center h-full">
          <button onClick={() => toggle(!isDarkTheme)} className="mr-[2rem]">
            {isDarkTheme ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <select
            name=""
            id=""
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
            value={i18n.language}
            className="mr-[2rem] h-fit bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
          <Link
            className="bg-background w-[3rem] md:flex md:w-24 lg:w-52 h-full left-0 border-[1px] border-sidebar hover:opacity-80 transition-all"
            to="/"
          >
            <span className="flex flex-col items-center justify-center w-full h-full">
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
