import Head from "next/head";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
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
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
