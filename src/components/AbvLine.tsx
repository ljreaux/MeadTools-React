import { useTranslation } from "react-i18next";

export default function AbvLine({
  ABV,
  delle,
}: {
  ABV: number;
  delle: number;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      <p className="text-2xl">
        {Math.round(ABV * 100) / 100}% {t("ABV")}
      </p>
      <p className="text-2xl">
        {Math.round(delle)} {t("DU")}
      </p>
    </div>
  );
}
