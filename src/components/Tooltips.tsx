import { FaCircleInfo } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Tooltip({
  body,
  link,
}: {
  body: string;
  link?: string;
}) {
  const [hide, setHide] = useState(true);
  function toggleTooltip() {
    setHide((prev) => !prev);
  }
  const { t } = useTranslation();
  return (
    <div className="sm:text-xs text-[.5rem] relative">
      {/* <div className={"info_button"}> */}
      <span className="cursor-pointer w-fit" onClick={toggleTooltip}>
        <FaCircleInfo />
      </span>
      {/* </div> */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          hide && "hidden"
        } bg-sidebar max-h-[15em] w-[15em] p-[1em] mt-4 overflow-y-auto rounded-lg border-2 border-s-textColor text-left z-50`}
      >
        <div className=" flex justify-end">
          <button type="button" onClick={toggleTooltip}>
            <FaWindowClose />
          </button>
        </div>
        <p>
          {body}
          {link && (
            <a href={link} className="underline">
              {t("tipText.linkText")}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
