import { AppProps } from "next/app";
import { Layout } from "@/components/layouts/Layout";
import { DebugProvider } from "@/hooks/useDebug";

function App({ Component, pageProps }: AppProps) {
  return (
    <DebugProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DebugProvider>
  );
}

export default App;
