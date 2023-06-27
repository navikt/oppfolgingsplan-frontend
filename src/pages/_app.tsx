import "@navikt/dinesykmeldte-sidemeny/dist/style.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAudience } from "../hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "../components/blocks/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "../components/blocks/breadcrumbs/BreadcrumbsAppenderAG";
import React, { useEffect, useState } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TestScenarioSelector } from "../components/blocks/testscenarioselector/TestScenarioSelector";
import { displayTestScenarioSelector } from "../environments/publicEnv";
import { configureLogger } from "@navikt/next-logger";
import { OPErrorBoundary } from "../components/blocks/error/OPErrorBoundary";
import { Modal } from "@navikt/ds-react";
import { initFaro, pinoLevelToFaroLevel } from "../faro/initFaro";
import { minutesToMillis } from "../utils/dateUtils";

// eslint-disable-next-line
declare const window: any;

configureLogger({
  basePath: "/syk/oppfolgingsplaner",
  onLog: (log) => {
    if (typeof window !== "undefined" && window.faro !== "undefined") {
      window.faro.api.pushLog(log.messages, {
        level: pinoLevelToFaroLevel(log.level.label),
      });
    }
  },
});

const TestScenarioDevTools = () => {
  if (displayTestScenarioSelector) {
    return <TestScenarioSelector />;
  }
  return null;
};

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const { isAudienceSykmeldt } = useAudience();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            cacheTime: minutesToMillis(60),
            staleTime: minutesToMillis(30),
          },
        },
      })
  );

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }
    initFaro();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <>
          <main tabIndex={-1} id="maincontent" className="min-h-screen">
            <OPErrorBoundary>
              <>
                {isAudienceSykmeldt ? (
                  <BreadcrumbsAppenderSM />
                ) : (
                  <BreadcrumbsAppenderAG />
                )}
                <Component {...pageProps} />
              </>
            </OPErrorBoundary>
          </main>
        </>
      </Hydrate>
      <TestScenarioDevTools />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
