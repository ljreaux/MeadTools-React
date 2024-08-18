import { cn } from "@/lib/utils";

function Title({ header, styles }: { header: string; styles?: string }) {
  return (
    <>
      <h1 className={cn("text-4xl px-3 py-3 text-center", styles)}>{header}</h1>
    </>
  );
}

export default Title;
