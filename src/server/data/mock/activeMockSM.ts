import { MockSetupSM, TestScenario } from "./activeTestScenario";
import { noPlanScenarioSM } from "./testscenarios/noplan/noPlanScenario";
import { godkjennPlanAvslattScenario } from "./testscenarios/godkjentPlanAvslatt/godkjennPlanAvslattScenario";
import { godkjennPlanSendtScenario } from "./testscenarios/godkjennPlanSendt/godkjennPlanSendtScenario";

const activeMockSM: MockSetupSM = { ...noPlanScenarioSM };

const getMockSetupForScenario = (scenario: TestScenario) => {
  switch (scenario) {
    case TestScenario.INGENPLAN:
      return noPlanScenarioSM;
    case TestScenario.GODKJENNPLANAVSLATT:
      return godkjennPlanAvslattScenario;
    case TestScenario.GODKJENNPLANSENDT:
      return godkjennPlanSendtScenario;
  }
};

export const assignNewMockSetup = (scenario: TestScenario) => {
  const newMockSetup = getMockSetupForScenario(scenario);

  activeMockSM.oppfolgingsplaner = newMockSetup.oppfolgingsplaner;
  activeMockSM.person = newMockSetup.person;
  activeMockSM.kontaktinfo = newMockSetup.kontaktinfo;
  activeMockSM.tilgang = newMockSetup.tilgang;
  activeMockSM.stillinger = newMockSetup.stillinger;
  activeMockSM.narmesteLedere = newMockSetup.narmesteLedere;
  activeMockSM.sykmeldinger = newMockSetup.sykmeldinger;
  activeMockSM.virksomhet = newMockSetup.virksomhet;
};

export default activeMockSM;
