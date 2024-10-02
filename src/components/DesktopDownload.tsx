import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import useChangeLogger from "@/hooks/useChangeLogger";
import { Link } from "react-router-dom";

type OSType = "windows" | "linux" | "macos-intel" | "macos-arm";

function DesktopDownload() {
  const [os, setOs] = useState<null | OSType>(null);
  const downloadButtons = [
    {
      os: "Windows",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/wix-x86_64",
      key: "windows",
    },
    {
      os: "Linux",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/debian-x86_64",
      key: "linux",
    },
    {
      os: "MacOS (intel)",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/dmg-aarch64",
      key: "macos-intel",
    },
    {
      os: "MacOS (arm)",
      href: "https://cdn.crabnebula.app/download/meadtools/meadtools/latest/platform/dmg-aarch64",
      key: "macos-arm",
    },
  ];

  const currentButton = downloadButtons.find((item) => item.key === os);
  const buttonText = currentButton?.os;
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
    <section className="flex items-center justify-center my-12 w-fit h-fit">
      <div className="flex flex-col items-center justify-center w-11/12 p-8 my-16 sm:w-9/12 rounded-xl bg-background text-foreground">
        <Button variant={"secondary"}>Download for - {buttonText}</Button>

        <div>
          {otherButtons.map((button) => (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              key={button.key}
              to={button.href}
            >
              Download for - {button.os}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DesktopDownload;
