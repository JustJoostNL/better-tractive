import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../lib/theme/theme";
import Layout from "@/components/layouts/Layout";
import { DebugProvider } from "@/hooks/useDebug";

function App({ Component, pageProps }: AppProps) {
  return (
    <DebugProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </DebugProvider>
  );
}

export default App;
