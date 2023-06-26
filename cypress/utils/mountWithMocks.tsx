import { mount } from "cypress/react18";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockSetup } from "../../src/server/data/mock/getMockDb";
import { interceptDataApis } from "./interceptDataApis";
import mockRouter from "next-router-mock";

export interface MockOptions {
  mockHeadContext?: boolean;
  mockReactQuery?: boolean;
  mockRouter?: boolean;

  interceptDataApis?: MockSetup;
  isArbeidsgiver?: boolean;
  narmestelederRouteId: string;
  oppfolgingsplanRouteId?: string;
}

interface HeadProps {
  children: JSX.Element;
  mockHeadContext?: boolean;
}

const HeadProvider = ({
  children,
  mockHeadContext,
}: HeadProps): JSX.Element => {
  if (!mockHeadContext) return children;
  return (
    <HeadManagerContext.Provider
      value={{
        updateHead: cy.stub().as("head:updateHead"),
        mountedInstances: new Set(),
        updateScripts: cy.stub().as("head:updateScripts"),
        scripts: new Set(),
        getIsSsr: () => false,
        appDir: false,
        nonce: "_",
      }}
    >
      {children}
    </HeadManagerContext.Provider>
  );
};

interface RouterProps {
  children: JSX.Element;
  shouldMockRouter?: boolean;
  isArbeidsgiver?: boolean;
  oppfolgingsplanRouteId?: string;
  narmestelederRouteId?: string;
}

const RouterProvider = ({
  children,
  shouldMockRouter,
  isArbeidsgiver,
  oppfolgingsplanRouteId,
  narmestelederRouteId,
}: RouterProps): JSX.Element => {
  if (!shouldMockRouter) return children;

  if (isArbeidsgiver) {
    mockRouter.pathname = "/arbeidsgiver";
  } else {
    mockRouter.pathname = "/sykmeldt";
  }

  mockRouter.query = {
    narmestelederid: narmestelederRouteId,
    oppfolgingsdialogId: oppfolgingsplanRouteId,
  };

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  );
};

interface ReactQueryProps {
  children: JSX.Element;
  mockReactQuery?: boolean;
}

const ReactQueryProvider = ({
  children,
  mockReactQuery,
}: ReactQueryProps): JSX.Element => {
  if (!mockReactQuery) return children;

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
};
export const mountWithMocks = (
  componentUnderTest: JSX.Element,
  options?: MockOptions
) => {
  if (options?.interceptDataApis) {
    interceptDataApis(options.interceptDataApis);
  }

  return mount(
    <HeadProvider mockHeadContext={options?.mockHeadContext}>
      <ReactQueryProvider mockReactQuery={options?.mockReactQuery}>
        <RouterProvider
          shouldMockRouter={options?.mockRouter}
          isArbeidsgiver={options?.isArbeidsgiver}
          oppfolgingsplanRouteId={options?.oppfolgingsplanRouteId}
          narmestelederRouteId={options?.narmestelederRouteId}
        >
          {componentUnderTest}
        </RouterProvider>
      </ReactQueryProvider>
    </HeadProvider>
  );
};
