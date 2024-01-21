import { useEffect } from "react";

export default function RemainingYan({
  addedYan,
  targetYAN,
  setRemainingYan,
  remainingYan,
}) {
  useEffect(() => {
    if (addedYan[0] + addedYan[1] + addedYan[2] >= targetYAN) {
      setRemainingYan("O PPM");
    } else {
      setRemainingYan(
        `${(targetYAN - (addedYan[0] + addedYan[1] + addedYan[2])).toFixed(
          2
        )} PPM`
      );
    }
  }, [addedYan, targetYAN]);
  return (
    <p className="sm:text-base text-[.9em] col-start-4 col-span-2 my-2">
      {remainingYan}
    </p>
  );
}
