import React, { useEffect, useState } from "react";
import Title from "../Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
      className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 my-8 aspect-video sm:w-2/4 rounded-xl bg-background"
    >
      <Title header={titleText} />
      <label
        htmlFor="email"
        className="flex items-center justify-between w-full gap-4 sm:w-7/12"
      >
        {t("accountPage.email")}
        <Input
          className="sm:max-w-60 max-w-40"
          type="email"
          id="email"
          required
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
      </label>
      <label
        htmlFor="password"
        className="flex items-center justify-between w-full gap-4 sm:w-7/12"
      >
        {t("accountPage.password")}
        <Input
          className="sm:max-w-60 max-w-40"
          type="password"
          id="password"
          required
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
      </label>
      <Button type="submit" variant={"secondary"}>
        {titleText}
      </Button>
    </form>
  );
}
