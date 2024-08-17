import React, { useEffect, useState } from "react";
import Title from "../Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";

export default function Form({
  titleText,
  fetchFunction,
  setToken,
}: {
  titleText: string;
  fetchFunction: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<
    Partial<{ token: string; message: string; refreshToken: string }>
  >;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { t } = useTranslation();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { toast } = useToast();

  useEffect(() => {
    setToken(token);
    if (token) {
      localStorage.setItem("token", token);
      navigate("/account");
    }
  }, [token]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { email, password } = data;
        fetchFunction({ email, password }).then((res) => {
          console.log(res);
          if (res.token && res.refreshToken) {
            setToken(res.token);
            localStorage.setItem("token", res.token);
            localStorage.setItem("refreshToken", res.refreshToken);
            toast({ description: res.message });
            navigate("/account");
          } else {
            toast({ description: res.message, variant: "destructive" });
          }
        });
      }}
      className="aspect-video sm:w-2/4 w-11/12 flex flex-col items-center justify-center rounded-xl bg-background p-8 my-8"
    >
      <Title header={titleText} />
      <label htmlFor="email" className="flex justify-between w-7/12">
        {t("accountPage.email")}
        <input
          type="email"
          id="email"
          required
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-8/12"
        />
      </label>
      <label htmlFor="password" className="flex justify-between w-7/12">
        {t("accountPage.password")}
        <input
          type="password"
          id="password"
          required
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-foreground hover:bg-background hover:border-background w-8/12"
        />
      </label>
      <button
        type="submit"
        className="border-2 border-solid border-foreground  hover:bg-background hover:border-background md:text-lg py-1 disabled:bg-background disabled:hover:border-foreground disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 mt-6"
      >
        {titleText}
      </button>
    </form>
  );
}
