import { rest } from "msw";
import mockRouter from "next-router-mock";
import { screen, waitFor } from "@testing-library/react";
import jExpect from "../../../../../jestGlobals";
import { render } from "../../../../utils/test/testUtils";
import { testServer } from "../../../../mocks/testServer";
import { createSykmeldingDTO } from "../../../../mocks/data/factories/sykmeldingDTO";
import { DeprecationBannerSM } from "../DeprecationBannerSM";

const mockSykmeldinger = () =>
  rest.get("/api/sykmeldt/sykmeldinger", (_, res, ctx) =>
    res(ctx.json([createSykmeldingDTO()])),
  );

const mockPilot = (isPilot: boolean) =>
  rest.get("/api/sykmeldt/pilot", (_, res, ctx) => res(ctx.json(isPilot)));

describe("DeprecationBannerSM", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/sykmeldt");
  });

  it("should not render when user is not a pilot", async () => {
    testServer.use(mockSykmeldinger(), mockPilot(false));
    render(<DeprecationBannerSM />);

    await waitFor(() =>
      jExpect(
        screen.queryByText(/Vi flytter til ny oppfølgingsplan/i),
      ).not.toBeInTheDocument(),
    );
  });

  it("should render banner with title and content when user is a pilot", async () => {
    testServer.use(mockSykmeldinger(), mockPilot(true));
    render(<DeprecationBannerSM />);

    await waitFor(() =>
      jExpect(
        screen.getByText(/Vi flytter til ny oppfølgingsplan/i),
      ).toBeInTheDocument(),
    );

    jExpect(
      screen.getByText(/Fra nå av skjer alt i den nye oppfølgingsplanen/i),
    ).toBeInTheDocument();
    jExpect(
      screen.getByRole("button", { name: /Gå til ny oppfølgingsplan/i }),
    ).toBeInTheDocument();
  });
});
