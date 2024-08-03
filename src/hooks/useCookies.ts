import { cookies } from "next/headers";
import { useCallback } from "react";

export function useCookies() {
  const cookieStore = cookies();

  const checkIfExists = useCallback(
    (key: string) => {
      return cookieStore.has(key);
    },
    [cookieStore],
  );

  return {
    list: cookieStore.getAll,
    get: cookieStore.get,
    set: cookieStore.set,
    remove: cookieStore.delete,
    exists: checkIfExists,
  };
}
