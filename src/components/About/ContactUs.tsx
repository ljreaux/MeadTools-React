import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Title from "../Title";
import { useTranslation } from "react-i18next";

// most of this code is taken directly from the emailjs website, added styling, and a success and error message
// sends an email to contact@meadtools.com
const ContactUs = () => {
  const { t } = useTranslation();
  const form = useRef(null);
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [messageColor, setMessageColor] = useState("green");

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    if (form.current)
      emailjs
        .sendForm(
          "service_3kmg80f",
          "template_5pwnpf5",
          form.current,
          "2G-OLW9VI5seyvCUK"
        )
        .then(
          (result) => {
            const target = e.target as HTMLFormElement;
            console.log(result.text);
            target.reset();
            setMessageColor("green");
            setStatus(t("success"));
            setDisabled(false);
          },
          (error) => {
            console.error(error.text);
            setMessageColor("red");
            setStatus(t("error"));
            setDisabled(false);
          }
        );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center font-serif text-textColor md:text-xl lg:text-2xl text-xs">
      <div className="flex flex-col items-center justify-center rounded-xl bg-sidebar px-8 aspect-video">
        <Title header={t("contactHeading")}></Title>
        <form
          className="grid place-items-center"
          ref={form}
          onSubmit={sendEmail}
        >
          <div>
            <label className="p-6">{t("name")}</label>
            <input
              className="bg-background text-[.5rem] md:text-sm rounded-xl border-2 border-solid border-textColor px-2 hover:bg-sidebar hover:border-background w-[20%]"
              type="text"
              name="user_name"
              required
            />
            <label className="p-6">{t("email")}</label>
            <input
              className="bg-background text-[.5rem] md:text-sm rounded-xl border-2 border-solid border-textColor px-2 hover:bg-sidebar hover:border-background w-[20%]"
              type="email"
              name="user_email"
              required
            />
          </div>
          <label className="py-6">{t("message")}</label>
          <textarea
            className="bg-background text-[.5rem] md:text-sm rounded-xl border-2 border-solid border-textColor px-2 hover:bg-sidebar hover:border-background w-full"
            name="message"
            required
          />
          <input
            className="my-6 bg-background rounded-2xl border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
            type="submit"
            value={t("send")}
            disabled={disabled}
          />
        </form>
        <h1 className={`text-${messageColor}-500`}>{status}</h1>
      </div>
    </div>
  );
};

export default ContactUs;
