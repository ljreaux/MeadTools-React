import Sorbate from "./Sorbate";
import Sulfite from "./Sulfite";

export default function Stabilizers() {
  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Sorbate />
      <Sulfite />
    </div>
  );
}
