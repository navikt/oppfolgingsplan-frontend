import React from "react";
import { OppfolgingsplanPageAG, Page } from "./OppfolgingsplanPageAG";
import { planUnderArbeidScenario } from "../../../../server/data/mock/testscenarios/planunderarbeid/planUnderArbeidScenario";

describe("<OppfolgingsplanPageAG />", () => {
  const mockSetup = planUnderArbeidScenario;

  it("renders", () => {
    cy.mountWithMocks(
      <OppfolgingsplanPageAG page={Page.SEPLANEN}>
        <div>Some content here</div>
      </OppfolgingsplanPageAG>,
      {
        interceptDataApis: mockSetup,
        isArbeidsgiver: true,
        mockReactQuery: true,
        mockRouter: true,
        narmestelederRouteId: mockSetup.sykmeldt.narmestelederId,
        oppfolgingsplanRouteId: mockSetup.oppfolgingsplaner[0].id.toString(),
      }
    );

    cy.contains("Some content here").should("not.exist");

    cy.get("#ny-oppfolgingsplan-skeleton").should("exist");

    cy.contains("Some content here");
  });
});
