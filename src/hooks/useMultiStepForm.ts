import { ReactElement, useState } from "react";

export default function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function goTo(index: number) {
    setCurrentStepIndex(index);
  }
  function next() {
    setCurrentStepIndex((prev) =>
      prev <= steps.length - 1 ? (prev += 1) : prev
    );
  }
  function back() {
    setCurrentStepIndex((prev) => (prev >= 0 ? (prev -= 1) : prev));
  }
  return {
    currentStepIndex: currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
    steps,
  };
}
