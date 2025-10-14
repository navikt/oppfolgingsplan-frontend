import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@navikt/dinesykmeldte-sidemeny/dist/style.css";
import "@navikt/flexjar-widget/styles.css";
import { configureLogger } from "@navikt/next-logger";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAudience } from "../hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "../components/blocks/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "../components/blocks/breadcrumbs/BreadcrumbsAppenderAG";
import { TestScenarioSelector } from "../components/blocks/testscenarioselector/TestScenarioSelector";
import { displayTestScenarioSelector } from "../environments/publicEnv";
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

function MyApp({ Component, pageProps }: AppProps) {
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
      }),
  );

  useEffect(() => {
    initFaro();
  }, []);

  return (
    <OPErrorBoundary>
      <QueryClientProvider client={queryClient}>
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
