import React from "react";
import { OppfolgingsplanPageSM, Page } from "./OppfolgingsplanPageSM";
import { planUnderArbeidScenario } from "../../../../server/data/mock/testscenarios/planunderarbeid/planUnderArbeidScenario";

describe("<OppfolgingsplanPageAG />", () => {
  const mockSetup = planUnderArbeidScenario;

  it("renders", () => {
    cy.mountWithMocks(
      <OppfolgingsplanPageSM page={Page.SEPLANEN}>
        <div>Some content here</div>
      </OppfolgingsplanPageSM>,
      {
        interceptDataApis: mockSetup,
        isArbeidsgiver: false,
        mockReactQuery: true,
        mockRouter: true,
        oppfolgingsplanRouteId: mockSetup.oppfolgingsplaner[0].id.toString(),
      },
    );

    cy.contains("Some content here").should("not.exist");

    cy.get("#ny-oppfolgingsplan-skeleton").should("exist");

    cy.contains("Some content here");
  });
});
