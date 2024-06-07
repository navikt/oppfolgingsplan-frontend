import { MockSetup } from "../../src/server/data/mock/getMockDb";

export const interceptDataApis = (mockSetup: MockSetup) => {
  cy.intercept(
    "/api/sykmeldt/oppfolgingsplaner",
    mockSetup.oppfolgingsplaner,
  ).as("hentOppfolgingsplaner");

  cy.intercept("/api/sykmeldt/sykmeldinger", mockSetup.sykmeldinger).as(
    "hentSykmeldinger",
  );

  cy.intercept(`/api/sykmeldt/tilgang`, mockSetup.tilgang).as("hentTilgang");

  cy.intercept(
    `/api/sykmeldt/narmesteledere/${mockSetup.sykmeldinger[0].fnr}`,
    mockSetup.narmesteLedere,
  ).as("hentNarmesteledere");

  // ARBEIDSGIVER

  cy.intercept(
    `/api/arbeidsgiver/${mockSetup.sykmeldt.narmestelederId}/oppfolgingsplaner`,
    mockSetup.oppfolgingsplaner,
  ).as("hentOppfolgingsplanerAG");

  cy.intercept(
    `/api/arbeidsgiver/dinesykmeldte/${mockSetup.sykmeldt.narmestelederId}`,
    mockSetup.sykmeldt,
  ).as("hentDineSykmeldteAG");

  cy.intercept(`/api/arbeidsgiver/tilgang`, mockSetup.tilgang).as(
    "hentTilgangAG",
  );
};
