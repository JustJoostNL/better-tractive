import Head from "next/head";
import React from "react";
import { CssBaseline, Grow, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { theme } from "@/lib/theme/theme";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Better Tractive</title>
        <meta
          name="description"
          content="Better Tractive is a better way to track your pets."
        />
        <meta name="application-name" content="Better Tractive" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Better Tractive" />
        <meta
          name="description"
          content="The best Tractive 3rd-party app available."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon.png" />

        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={2}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Grow}
        >
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};
