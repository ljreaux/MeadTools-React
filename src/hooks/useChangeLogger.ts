import { useEffect } from "react";

export default function useChangeLogger(state: object | string | number): void {
  useEffect(() => console.log(state), [state]);
}
