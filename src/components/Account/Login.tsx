import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import signInButton from "../../assets/signin-assets/Web (mobile + desktop)/svg/dark/web_dark_rd_ctn.svg";
import lightSignIn from "../../assets/signin-assets/Web (mobile + desktop)/svg/light/web_light_rd_ctn.svg";
import { login, register } from "../../helpers/Login";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../main";
import { useTheme } from "../ui/theme-provider";
export default function Login({
  setToken,
}: {
  setToken: Dispatch<SetStateAction<string | null>>;
}) {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");
  useEffect(() => {
    let systemTheme = theme;
    if (theme === "system") {
      systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    setIsDarkTheme(systemTheme === "dark");
  }, [theme]);
  const { t } = useTranslation();
  const { goTo, step, currentStepIndex } = useMultiStepForm([
    <Form
      titleText={t("accountPage.login")}
      setToken={setToken}
      fetchFunction={login}
    />,
    <Form
      titleText={t("accountPage.register")}
      setToken={setToken}
      fetchFunction={register}
    />,
  ]);
  const index = currentStepIndex === 0 ? 1 : 0;
  const buttonMessage =
    index === 1
      ? t("accountPage.buttonMessage.register")
      : t("accountPage.buttonMessage.login");

  const btnSrc = isDarkTheme ? signInButton : lightSignIn;

  return (
    <div className="flex flex-col items-center justify-center w-screen gap-6">
      <div className="flex flex-col items-center justify-center w-full">
        {step}
        <button
          onClick={() => goTo(index)}
          className="font-bold underline transition-all text-foreground hover:text-sidebar"
        >
          {buttonMessage}
        </button>
      </div>
      <p>{t("accountPage.or")}</p>
      <div>
        <button
          onClick={() => {
            (async function auth() {
              const response = await fetch(`${API_URL}/request`, {
                method: "post",
              });
              const data = await response.json();
              window.location.href = data.url;
            })();
          }}
        >
          <img src={btnSrc} alt="Sign in with google" />
        </button>
      </div>
    </div>
  );
}
