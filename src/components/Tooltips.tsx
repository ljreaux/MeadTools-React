import { FaCircleInfo } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { PopoverContent, PopoverTrigger, Popover } from "./ui/popover";

export default function Tooltip({
  body,
  link,
  links,
}: {
  body: string;
  link?: string;
  links?: string[][];
}) {
  const { t } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger>
        <FaCircleInfo />
      </PopoverTrigger>

      <PopoverContent>
        {body}
        {link && (
          <a href={link} className="underline">
            {t("tipText.linkText")}
          </a>
        )}
        {links &&
          links.map((linkArr) => (
            <a href={linkArr[0]} className="underline" key={linkArr[0]}>
              {linkArr[1]}
            </a>
          ))}
      </PopoverContent>
    </Popover>
  );
}
