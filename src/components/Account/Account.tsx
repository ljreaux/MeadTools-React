import React, { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import RecipeCard from "./RecipeCard";
import Title from "../Title";
import { IoSettingsSharp, IoLogOutSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ModeToggle } from "../ui/mode-toggle";
import LanguageSwitcher from "../ui/Language-switcher";
import useAuth from "@/hooks/useAuth";

export default function Account({
  token,
  user,
  setToken,
  setUser,
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
  isMetric: boolean;
  setIsMetric: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const { userInfo, setReload } = useAuth(token, setUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/account");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen my-40 sm:my-24">
      {userInfo ? (
        <div className="relative flex flex-col items-center w-11/12 p-8 sm:w-9/12 rounded-xl bg-background">
          <div className="absolute flex items-center justify-center w-12 gap-2 text-3xl right-12 top-4">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}
            >
              <IoLogOutSharp />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"} className="text-3xl">
                  <IoSettingsSharp />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex items-center sm:w-96 w-80">
                <ul className="flex flex-col items-center justify-center w-full py-2 mx-4 my-2 text-sm">
                  <li className="flex items-center justify-between w-full py-2">
                    <p>{t("accountPage.theme.title")}</p>
                    <ModeToggle />
                  </li>
                  <li className="flex items-center justify-between w-full gap-4 py-2">
                    <p>{t("accountPage.language.title")}</p>
                    <div className="w-1/2">
                      <LanguageSwitcher />
                    </div>
                  </li>
                  <li className="flex items-center justify-between w-full gap-4 py-2">
                    <p>{t("accountPage.units.title")}</p>
                    <div className="w-1/2">
                      <Select
                        name="units"
                        value={isMetric ? "metric" : "us"}
                        onValueChange={(val) => setIsMetric(val === "metric")}
                      >
                        <SelectTrigger className="full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">
                            {t("accountPage.units.us")}
                          </SelectItem>
                          <SelectItem value="metric">
                            {t("accountPage.units.metric")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
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
                  key={recipe.id}
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
