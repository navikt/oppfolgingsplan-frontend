import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions, screen, Screen } from "@testing-library/react";
import React, { ReactElement, ReactNode } from "react";
import open from "open";
import userEvent from "@testing-library/user-event";
import { testServer } from "../../mocks/testServer";
import { jest } from "@jest/globals";

const requestBodySpy = jest.fn();
testServer.events.on("request:match", (req) => {
  requestBodySpy(req.body);
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return {
    requestBodySpy,
    user: userEvent.setup({ delay: null }),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

export async function openPlayground(screen: Screen): Promise<void> {
  await open(screen.logTestingPlaygroundURL());
}

const customScreen = {
  ...screen,
  openPlayground: () => openPlayground(screen),
};

export { customScreen as screen };
export { customRender as render };
