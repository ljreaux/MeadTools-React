import { useEffect, useState } from "react";

function getSaved(key: string, initialState: unknown) {
  const saved = localStorage.getItem(key);
  const savedValue = saved ? JSON.parse(saved) : null;
  const fallback =
    initialState instanceof Function ? initialState() : initialState;
  return savedValue ? savedValue : fallback;
}

export default function useLocalStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(() => {
    return getSaved(key, initialState);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
