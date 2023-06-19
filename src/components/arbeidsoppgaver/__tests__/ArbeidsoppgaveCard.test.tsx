import { render, screen } from "../../../utils/test/testUtils";
import mockRouter from "next-router-mock";
import { SYKMELDT } from "../../../mocks/data/constants";
import { arbeidsoppgaveCreatedBySM } from "../../../mocks/data/fixtures/arbeidsoppgave";
import jExpect from "../../../../jestGlobals";
import { ArbeidsoppgaveCard } from "../arbeidsoppgavecard/ArbeidsoppgaveCard";

describe("ArbeidsoppgaveCard", () => {
  describe("logged in as sykmeldt and arbeidsoppgave is created by sykmeldt", () => {
    beforeEach(() => {
      mockRouter.setCurrentUrl("/sykmeldt");
    });

    it("should display slett and endre button", async () => {
      render(
        <ArbeidsoppgaveCard
          arbeidstakerFnr={SYKMELDT.fnr}
          arbeidsoppgave={arbeidsoppgaveCreatedBySM}
          readonly={false}
        />
      );

      jExpect(
        screen.getByRole("button", { name: "Slett" })
      ).toBeInTheDocument();
      jExpect(
        screen.getByRole("button", { name: "Endre" })
      ).toBeInTheDocument();
    });
  });
  describe("logged in as narmeste leder and arbeidsoppgave is created by sykmeldt", () => {
    beforeEach(() => {
      mockRouter.setCurrentUrl("/arbeidsgiver");
    });

    it("should not display slett and endre button", async () => {
      render(
        <ArbeidsoppgaveCard
          arbeidstakerFnr={SYKMELDT.fnr}
          arbeidsoppgave={arbeidsoppgaveCreatedBySM}
          readonly={false}
        />
      );

      jExpect(
        screen.queryByRole("button", { name: "Slett" })
      ).not.toBeInTheDocument();

      jExpect(
        screen.queryByRole("button", { name: "Endre" })
      ).not.toBeInTheDocument();
    });
  });
});
