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
    SetStateAction<{ id: number; role: "user" | "admin" } | null>
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
      <div className="w-screen h-full bg-sidebar flex justify-between items-center text-textColor text-xl text-center relative">
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
            <div className="flex items-center justify-center w-fit mx-2 hover:text-background transition-colors">
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
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/"
              >
                {t("calculators.recipes")}
              </NavLink>
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/NuteCalc/"
              >
                {t("calculators.nutes")}
              </NavLink>
              <div className="flex items-center">
                <NavLink
                  className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                  to="/ExtraCalcs"
                >
                  {t("calculators.extraCalcs.label")}
                </NavLink>
                <button
                  onClick={() =>
                    setOpened((prev) => {
                      return { ...prev, extraCalcs: !prev.extraCalcs };
                    })
                  }
                >
                  {opened.extraCalcs ? (
                    <IoIosArrowDropupCircle />
                  ) : (
                    <MdExpandCircleDown />
                  )}
                </button>
              </div>
              <div className={`${opened.extraCalcs ? "grid" : "hidden"} mx-8`}>
                <Link to="/ExtraCalcs/" className="hover:text-background ">
                  {t("calculators.extraCalcs.abv")}
                </Link>
                <Link
                  to="/ExtraCalcs/brixCalc"
                  className="hover:text-background "
                >
                  {t("calculators.extraCalcs.brix")}
                </Link>
                <Link to="/ExtraCalcs/estOG" className="hover:text-background ">
                  {t("calculators.extraCalcs.estOG")}
                </Link>
                <Link
                  to="/ExtraCalcs/benchTrials"
                  className="hover:text-background "
                >
                  {t("calculators.extraCalcs.benchTrials")}
                </Link>
                <Link
                  to="/ExtraCalcs/stabilizers"
                  className="hover:text-background "
                >
                  {t("calculators.extraCalcs.stabilizers")}
                </Link>
                <Link
                  to="/ExtraCalcs/RefractometerCorrection"
                  className="hover:text-background "
                >
                  {t("calculators.extraCalcs.refractometer")}
                </Link>
                <Link
                  to="/ExtraCalcs/tempCorrection"
                  className="hover:text-background "
                >
                  {t("calculators.extraCalcs.tempCorrection")}
                </Link>
                <Link
                  to="/ExtraCalcs/blending"
                  className="hover:text-background pb-2"
                >
                  {t("calculators.extraCalcs.blending")}
                </Link>
              </div>
            </div>
            <div className="flex items-center w-fit mx-2 hover:text-background transition-colors ">
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
                    localStorage.removeItem("user");
                    setUser(null);
                    navigate("/login");
                  }}
                  className="hover:text-background transition-colors sm:mx-4 mx-2 "
                >
                  {t("account.logout")}
                </button>
              ) : (
                <NavLink
                  className="hover:text-background transition-colors sm:mx-4 mx-2 "
                  to="/login"
                >
                  {t("account.login")}
                </NavLink>
              )}
            </div>
            <div className="flex items-center w-fit mx-2 hover:text-background transition-colors">
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
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/about"
              >
                {t("additionalLinks.about")}
              </NavLink>
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/contact"
              >
                {t("additionalLinks.contact")}
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="flex h-full justify-center items-center">
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
            <span className="w-full h-full flex flex-col justify-center items-center">
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
