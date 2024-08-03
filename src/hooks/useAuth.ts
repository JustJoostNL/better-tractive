import { useRouter } from "next/router";
import { useCallback } from "react";
import { useCookies } from "react-cookie";

interface IProps {
  skipAuthCheck?: boolean;
}

export function useAuth({ skipAuthCheck }: IProps = { skipAuthCheck: false }) {
  const [{ tractive_token }, setCookie, removeCookie] = useCookies<string>([
    "tractive_token",
  ]);
  const router = useRouter();

  const isAuthenticated = !!tractive_token;

  if (typeof window !== "undefined" && !isAuthenticated && !skipAuthCheck) {
    router.push(`/login?r=${router.pathname}`);
  }

  const handleSignIn = useCallback(
    (token: string) => {
      setCookie("tractive_token", token, {
        maxAge: 60 * 60 * 24 * 6, //normally 7 days, but 6 to be safe
      });

      const redirectPath = router.query.r as string;
      const redirect = redirectPath ? redirectPath : "/";
      router.push(redirect);
    },
    [router, setCookie],
  );

  const handleSignOut = useCallback(() => {
    removeCookie("tractive_token");
    router.push("/login");
  }, [removeCookie, router]);

  return {
    isAuthenticated,
    token: tractive_token,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}
