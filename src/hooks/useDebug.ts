import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function useDebug(hotkey: string = "shift+d") {
  const [debug, setDebug] = useState(false);

  const toggleDebug = useCallback(() => {
    setDebug((prev) => !prev);
  }, []);

  useHotkeys(hotkey, toggleDebug);

  return debug;
}
