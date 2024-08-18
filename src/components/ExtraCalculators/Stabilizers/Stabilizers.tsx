import Sorbate from "./Sorbate";
import Sulfite from "./Sulfite";

export default function Stabilizers() {
  return (
    <div className="w-11/12 sm:w-1/2 flex flex-col items-center justify-center rounded-xl bg-background p-8 my-[8rem] gap-6">
      <Sorbate />
      <Sulfite />
    </div>
  );
}
