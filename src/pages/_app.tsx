import "@navikt/dinesykmeldte-sidemeny/dist/style.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { useAudience } from "hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "components/blocks/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "components/blocks/breadcrumbs/BreadcrumbsAppenderAG";
import React, { useState } from "react";
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

const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};

configureLogger({
  basePath: "/syk/oppfolgingsplaner",
});

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <>
          <GlobalStyle />
          {isAudienceSykmeldt ? (
            <BreadcrumbsAppenderSM />
          ) : (
            <BreadcrumbsAppenderAG />
          )}
          <main tabIndex={-1} id="maincontent">
            <OPErrorBoundary>
              <Component {...pageProps} />
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
