import { useEffect } from "react";
import { useDebug } from "./useDebug";

export function useMutateDebugState(key: string, data: any) {
  const { updateDebugData } = useDebug();

  useEffect(() => {
    updateDebugData(key, data);
  }, [data, key, updateDebugData]);
}
