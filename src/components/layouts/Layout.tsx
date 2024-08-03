import Head from "next/head";
import React from "react";
import { CssBaseline, Grow, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { theme } from "@/lib/theme/theme";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Better Tractive</title>
        <meta
          name="description"
          content="Better Tractive is a better way to track your pets."
        />
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

export default Layout;
