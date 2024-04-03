import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import signInButton from "../../assets/signin-assets/Web (mobile + desktop)/svg/dark/web_dark_rd_ctn.svg";
import lightSignIn from "../../assets/signin-assets/Web (mobile + desktop)/svg/light/web_light_rd_ctn.svg";

export default function Login({ setToken }) {
  const [mode, setMode] = useState("dark");
  const btnSrc = mode === "dark" ? signInButton : lightSignIn;
  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setMode(e.matches ? "dark" : "light"));

    // Setup dark/light mode for the first time
    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    // Remove listener
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    setToken(token);
    if (token) {
      localStorage.setItem("token", token);
      navigate("/account");
    }
  }, [token]);
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <button
        onClick={() => {
          (async function auth() {
            const response = await fetch("http://localhost:3000/api/request", {
              method: "post",
            });
            const data = await response.json();
            console.log(data);
            window.location.href = data.url;
          })();
        }}
      >
        <img src={btnSrc} alt="Sign in with google" />
      </button>
      <LoginForm setToken={setToken} />
      <RegisterForm setToken={setToken} />
    </div>
  );
}
