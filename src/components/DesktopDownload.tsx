import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Link } from "react-router-dom";
import Title from "./Title";
import { FaApple, FaUbuntu, FaWindows } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import hydroFile from "@/assets/chart-images/hydro-file.png";
import pillFile from "@/assets/chart-images/pill-file.png";

type OSType = "windows" | "linux" | "macos-intel" | "macos-arm";

function DesktopDownload() {
  const { t } = useTranslation();
  const [os, setOs] = useState<null | OSType>(null);
  const downloadButtons = [
    {
      os: "Windows",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/wix-x86_64",
      key: "windows",
      logo: <FaWindows className="mx-1" />,
    },
    {
      os: "Ubuntu",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/appimage-x86_64",
      key: "linux",
      logo: <FaUbuntu className="mx-1" />,
    },
    {
      os: "Mac (intel)",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/MeadTools.app.tar.gz",
      key: "macos-intel",
      logo: <FaApple className="mx-1" />,
    },
    {
      os: "Mac",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/dmg-aarch64",
      key: "macos-arm",
      logo: <FaApple className="mx-1" />,
    },
  ];

  const currentButton = downloadButtons.find((item) => item.key === os);

  const otherButtons = downloadButtons.filter((item) => item.key !== os);

  useEffect(() => {
    async function getOs() {
      const ua = navigator.userAgent;
      if (ua.includes("Windows")) return setOs("windows");
      if (ua.includes("Linux")) return setOs("linux");
      if (ua.includes("Macintosh")) {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("webgl");
          const debugInfo = ctx?.getExtension("WEBGL_debug_renderer_info");
          const renderer = ctx?.getParameter(
            debugInfo?.UNMASKED_RENDERER_WEBGL || 0
          );
          return setOs(
            renderer.match(/(M1|M2|M3)/gm) ? "macos-arm" : "macos-intel"
          );
        } catch {
          setOs("macos-intel");
        }
      }

      return setOs(null);
    }
    getOs();
  }, []);

  return (
    <section className="flex items-center justify-center w-full my-12 h-fit">
      <div className="flex flex-col items-center justify-center w-11/12 p-8 my-16 sm:w-9/12 rounded-xl bg-background text-foreground">
        <Title header={t("downloadDesktop")} />
        <p className="my-2 text-xl">1.0.0</p>
        <Button variant={"secondary"}>
          {currentButton?.logo} {t("download")} {currentButton?.os}
        </Button>
        <div className="flex flex-wrap items-center justify-center my-4">
          {otherButtons.map((button) => (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-[rgb(200_215_255)]"
              )}
              key={button.key}
              to={button.href}
            >
              {button.logo} {t("download")} {button.os}
            </Link>
          ))}
        </div>{" "}
        <h2 className="text-xl">New Features</h2>
        <iframe
          className="w-full my-4 aspect-video"
          src="https://www.youtube.com/embed/I1OSPqiaOfs"
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg">{t("desktop.features.offline.label")}</h3>
            <p>{t("desktop.features.offline.body")}</p>
          </div>
          <div>
            <h3 className="text-lg">
              {t("desktop.features.customization.label")}
            </h3>
            <p>{t("desktop.features.customization.body")}</p>
          </div>
          <div>
            <h3 className="text-lg">{t("desktop.features.charts.label")}</h3>
            <p>{t("desktop.features.charts.body")}</p>
            <div className="grid w-full gap-2 my-4 sm:grid-cols-2">
              <img src={pillFile} alt="Rapt pill chart" />
              <img src={hydroFile} alt="Manual hydrometer data chart" />
            </div>
          </div>
        </div>
        <p className="flex mt-4">
          {t("poweredBy")}
          <a
            href="https://web.crabnebula.cloud/meadtools/meadtools/releases"
            className="text-[rgb(200_215_255)] flex"
            target="_blank"
            rel="noreferrer"
          >
            <CNLogo cn="fill-[rgb(200_215_255)] w-6 h-6" />
            CrabNebula Cloud
          </a>
        </p>
      </div>
    </section>
  );
}

export default DesktopDownload;

const CNLogo = ({ cn }: { cn?: string }) => (
  <svg
    width="332"
    height="332"
    viewBox="0 0 332 332"
    xmlns="http://www.w3.org/2000/svg"
    className={cn}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M164.923 101.881C131.11 146.401 131.306 203.282 165.36 228.927C174.309 235.667 184.707 239.579 195.787 240.875C164.356 266.368 128.151 274.279 103.705 257.675C70.1784 234.904 71.4639 174.647 106.576 123.088C135.895 80.0339 179.53 56.6586 212.649 63.3761C195.156 71.1026 178.364 84.1831 164.923 101.881ZM209.351 158.739C193.56 173.643 175.512 183.55 160.274 186.845C169.271 218.962 203.857 221.431 203.857 221.431C203.857 221.431 224.44 216.704 239.983 181.83C252.781 153.111 251.666 123.437 238.765 108.335C237.694 122.931 227.161 141.932 209.351 158.739Z"
      fill="rgb(200 215 255)"
    />
  </svg>
);
