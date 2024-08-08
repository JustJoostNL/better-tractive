import { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { Layout } from "@/components/layouts/Layout";
import { DebugProvider } from "@/hooks/useDebug";

function App({ Component, pageProps }: AppProps) {
  return (
    <DebugProvider>
      <IntlProvider locale="en-GB" defaultLocale="en-GB">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </DebugProvider>
  );
}

export default App;
