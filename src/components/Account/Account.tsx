import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../helpers/Login";
import Loading from "../Loading";
import RecipeCard from "./RecipeCard";
import Title from "../Title";
import { IoSettingsSharp, IoLogOutSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";

interface UserInfo {
  id: number;
  email: string;
  google_id: string | null;
  role: "user" | "admin";
  recipes: { id: number; user_id: number; name: string; private: boolean }[];
}

export default function Account({
  token,
  user,
  setToken,
  setUser,
  isDarkTheme,
  setTheme,
  isMetric,
  setIsMetric,
}: {
  token: string | null;
  user: { id: number; role: "user" | "admin" } | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: number;
      role: "user" | "admin";
      email: string;
    } | null>
  >;
  isDarkTheme: boolean;
  setTheme: React.Dispatch<SetStateAction<boolean>>;
  isMetric: boolean;
  setIsMetric: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [reload, setReload] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { toast } = useToast();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    else
      (async () => {
        const user = await getUserInfo(token);
        if (user) {
          setUserInfo(user);
          setUser((prev) => ({
            ...prev,
            id: user.id,
            role: user.role,
            email: user.email,
          }));
        } else {
          toast({
            title: "Account Error",
            description: "Please Login Again",
            variant: "destructive",
          });
          navigate("/login");
        }
      })();
  }, [token, reload]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/account");
    }
  }, [user]);
  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("click", () => {
        setOpened(false);
      });
    }
    return () => {
      main?.removeEventListener("click", () => {
        setOpened(false);
      });
    };
  }, []);

  return (
    <div className="w-screen flex items-center justify-center h-screen">
      {userInfo ? (
        <div className="w-11/12 sm:w-9/12 flex flex-col items-center rounded-xl bg-sidebar p-8 my-8 relative">
          <div className="absolute right-12 top-4 flex w-12 gap-2 text-3xl">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}
            >
              <IoLogOutSharp />
            </button>
            <button
              className="relative"
              onClick={() => setOpened((prev) => !prev)}
            >
              <IoSettingsSharp />
            </button>
            <div
              className={`${
                isOpened || "hidden"
              } absolute right-0 top-0 translate-y-1/4 translate-x-8 bg-sidebar border-solid border-2 border-textColor rounded-xl flex justify-center items-center w-[15rem]`}
            >
              <ul
                className="text-sm w-full flex flex-col justify-center items-center mx-4 my-2 py-2"
                onClick={() => setOpened(true)}
              >
                <li className="flex justify-between w-full py-2">
                  <p>{t("accountPage.theme.title")}</p>
                  <select
                    className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
                    name="theme"
                    id="theme"
                    value={isDarkTheme ? "dark" : "light"}
                    onChange={(e) => setTheme(e.target.value === "dark")}
                  >
                    <option value="dark">{t("accountPage.theme.dark")}</option>
                    <option value="light">
                      {t("accountPage.theme.light")}
                    </option>
                  </select>
                </li>
                <li className="flex justify-between w-full py-2">
                  <p>{t("accountPage.language.title")}</p>
                  <select
                    className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
                    name="lang"
                    id="lang"
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                  >
                    <option value="en">EN</option>
                    <option value="de">DE</option>
                  </select>
                </li>
                <li className="flex justify-between w-full py-2">
                  <p>{t("accountPage.units.title")}</p>
                  <select
                    className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
                    name="units"
                    id="units"
                    value={isMetric ? "metric" : "us"}
                    onChange={(e) => setIsMetric(e.target.value === "metric")}
                  >
                    <option value="us">{t("accountPage.units.us")}</option>
                    <option value="metric">
                      {t("accountPage.units.metric")}
                    </option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
          <Title header={t("accountPage.title")} />
          <div className="flex flex-col items-center justify-center w-full">
            <h2>
              {t("greeting")} {userInfo.email}
            </h2>
            <h2 className={`text-2xl text-center col-span-full`}>
              {t("accountPage.myRecipes")}
            </h2>
            <div
              className={`flex flex-wrap justify-center items-center gap-4 text-center mt-4`}
            >
              {userInfo.recipes.map((recipe) => (
                <RecipeCard
                  recipe={recipe}
                  token={token}
                  setReload={setReload}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
