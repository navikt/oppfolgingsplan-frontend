import { MockSetup } from "../../src/server/data/mock/getMockDb";

export const interceptDataApis = (mockSetup: MockSetup) => {
  cy.intercept(
    "/api/sykmeldt/oppfolgingsplaner",
    mockSetup.oppfolgingsplaner
  ).as("hentOppfolgingsplaner");

  cy.intercept("/api/sykmeldt/sykmeldinger", mockSetup.sykmeldinger).as(
    "hentSykmeldinger"
  );

  cy.intercept(
    `/api/sykmeldt/tilgang/${mockSetup.sykmeldinger[0].fnr}`,
    mockSetup.tilgang
  ).as("hentTilgang");

  cy.intercept(
    `/api/sykmeldt/narmesteledere/${mockSetup.sykmeldinger[0].fnr}`,
    mockSetup.narmesteLedere
  ).as("hentNarmesteledere");
};
