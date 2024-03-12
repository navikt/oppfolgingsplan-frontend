import React from "react";
import OppfolgingsdialogTeaserSM from "./OppfolgingsdialogTeaserSM";
import { arbeidsgiverSendtTilGodkjenningMockData } from "../../../../server/data/mock/testscenarios/arbeidsgiversendttilgodkjenning/arbeidsgiverSendtTilGodkjenningMockData";

describe("<OppfolgingsdialogTeaserSM />", () => {
  it("Oppfolgingsplan with active nearest leader uses linkpanel and has no error message", () => {
    const oppfolgingsplanTilGodkjenning =
      arbeidsgiverSendtTilGodkjenningMockData[0];

    cy.mountWithMocks(
      <OppfolgingsdialogTeaserSM
        oppfolgingsplan={oppfolgingsplanTilGodkjenning}
      />,
      { mockRouter: true },
    );

    cy.findByRole("link").should("exist");
    cy.contains("Vi finner ikke din nærmeste leder i Altinn.").should(
      "not.exist",
    );
  });

  it("Oppfolgingsplan without active nearest leader does not use linkpanel and has error message", () => {
    const oppfolgingsplanTilGodkjenning =
      arbeidsgiverSendtTilGodkjenningMockData[0];
    oppfolgingsplanTilGodkjenning.arbeidsgiver.naermesteLeder = null;

    cy.mountWithMocks(
      <OppfolgingsdialogTeaserSM
        oppfolgingsplan={oppfolgingsplanTilGodkjenning}
      />,
      { mockRouter: true },
    );

    cy.findByRole("link").should("not.exist");
    cy.contains("Vi finner ikke din nærmeste leder i Altinn.");
  });
});
