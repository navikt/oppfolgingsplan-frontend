import { rest } from "msw";
import mockRouter from "next-router-mock";
import { screen, waitFor } from "@testing-library/react";
import jExpect from "../../../../../jestGlobals";
import { render } from "../../../../utils/test/testUtils";
import { testServer } from "../../../../mocks/testServer";
import { SYKMELDT } from "../../../../mocks/data/constants";
import { DeprecationBannerAG } from "../DeprecationBannerAG";

const NARMESTE_LEDER_ID = "test-leder-id";

const mockDineSykmeldte = () =>
  rest.get(
    `/api/arbeidsgiver/dinesykmeldte/${NARMESTE_LEDER_ID}`,
    (_, res, ctx) =>
      res(
        ctx.json({
          narmestelederId: NARMESTE_LEDER_ID,
          orgnummer: "123456789",
          fnr: SYKMELDT.fnr,
          navn: SYKMELDT.navn,
        }),
      ),
  );

const mockPilot = (isPilot: boolean) =>
  rest.get("/api/arbeidsgiver/pilot", (_, res, ctx) => res(ctx.json(isPilot)));

describe("DeprecationBannerAG", () => {
  beforeEach(() => {
    mockRouter.push({
      pathname: "/arbeidsgiver/[narmestelederid]",
      query: { narmestelederid: NARMESTE_LEDER_ID },
    });
  });

  it("should not render when user is not a pilot", async () => {
    testServer.use(mockDineSykmeldte(), mockPilot(false));
    render(<DeprecationBannerAG />);

    await waitFor(() =>
      jExpect(
        screen.queryByText(/Vi flytter til ny oppfølgingsplan/i),
      ).not.toBeInTheDocument(),
    );
  });

  it("should render banner with title and bullet list when user is a pilot", async () => {
    testServer.use(mockDineSykmeldte(), mockPilot(true));
    render(<DeprecationBannerAG />);

    await waitFor(() =>
      jExpect(
        screen.getByText(/Vi flytter til ny oppfølgingsplan/i),
      ).toBeInTheDocument(),
    );

    jExpect(screen.getByText(/Hva betyr det for deg/i)).toBeInTheDocument();
    jExpect(
      screen.getByText(/Hva skjer med gamle planer/i),
    ).toBeInTheDocument();
    jExpect(
      screen.getByRole("button", { name: /Gå til ny oppfølgingsplan/i }),
    ).toBeInTheDocument();
  });
});
