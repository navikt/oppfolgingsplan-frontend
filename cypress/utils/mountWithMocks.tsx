import { mount } from "cypress/react18";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextRouter } from "next/dist/shared/lib/router/router";
import { MockSetup } from "../../src/server/data/mock/getMockDb";
import { interceptDataApis } from "./interceptDataApis";
import { minutesToMillis } from "../../src/utils/dateUtils";

export interface MockOptions {
  mockHeadContext?: boolean;
  mockReactQuery?: boolean;
  mockRouter?: boolean;

  interceptDataApis?: MockSetup;
  routerOptions?: Partial<NextRouter>;
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
  mockRouter?: boolean;
  routerOptions?: Partial<NextRouter>;
}

const RouterProvider = ({
  children,
  mockRouter,
  routerOptions,
}: RouterProps): JSX.Element => {
  if (!mockRouter) return children;
  const router = {
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    basePath: "",
    back: cy.spy().as("back"),
    beforePopState: cy.spy().as("beforePopState"),
    forward: cy.spy().as("forward"),
    prefetch: cy.stub().as("prefetch").resolves(),
    push: cy.spy().as("push"),
    reload: cy.spy().as("reload"),
    replace: cy.spy().as("replace"),
    events: {
      emit: cy.spy().as("emit"),
      off: cy.spy().as("off"),
      on: cy.spy().as("on"),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...routerOptions,
  };

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
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
              cacheTime: minutesToMillis(60),
              staleTime: minutesToMillis(30),
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
          mockRouter={options?.mockRouter}
          routerOptions={options?.routerOptions}
        >
          {componentUnderTest}
        </RouterProvider>
      </ReactQueryProvider>
    </HeadProvider>
  );
};
