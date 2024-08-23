import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function AbvLine({
  ABV,
  delle,
  textSize,
}: {
  ABV: number;
  delle: number;
  textSize?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      <p className={cn(textSize || "text-2xl")}>
        {Math.round(ABV * 100) / 100}% {t("ABV")}
      </p>
      <p className={cn(textSize || "text-2xl")}>
        {Math.round(delle)} {t("DU")}
      </p>
    </div>
  );
}
