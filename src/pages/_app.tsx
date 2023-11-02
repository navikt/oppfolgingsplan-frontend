import "@navikt/dinesykmeldte-sidemeny/dist/style.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAudience } from "../hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "../components/blocks/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "../components/blocks/breadcrumbs/BreadcrumbsAppenderAG";
import React, { useEffect, useState } from "react";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TestScenarioSelector } from "../components/blocks/testscenarioselector/TestScenarioSelector";
import { displayTestScenarioSelector } from "../environments/publicEnv";
import { configureLogger } from "@navikt/next-logger";
import { OPErrorBoundary } from "../components/blocks/error/OPErrorBoundary";
import { initFaro } from "../faro/initFaro";
import { minutesToMillis } from "../utils/dateUtils";

configureLogger({
  basePath: "/syk/oppfolgingsplaner",
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
            gcTime: minutesToMillis(60),
            staleTime: minutesToMillis(30),
          },
        },
      })
  );

  useEffect(() => {
    initFaro();
  }, []);

  return (
    <OPErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <main tabIndex={-1} id="maincontent" className="min-h-screen">
            <>
              {isAudienceSykmeldt ? (
                <BreadcrumbsAppenderSM />
              ) : (
                <BreadcrumbsAppenderAG />
              )}
              <Component {...pageProps} />
            </>
          </main>
        </HydrationBoundary>
        <TestScenarioDevTools />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </OPErrorBoundary>
  );
}

export default MyApp;
