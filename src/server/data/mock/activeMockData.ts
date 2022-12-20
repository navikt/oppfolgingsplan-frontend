import { noPlanScenarioSM } from "./testscenarios/noplan/noPlanScenario";
import { godkjennPlanAvslattScenario } from "./testscenarios/godkjentPlanAvslatt/godkjennPlanAvslattScenario";
import { godkjennPlanSendtScenario } from "./testscenarios/godkjennPlanSendt/godkjennPlanSendtScenario";
import { godkjennPlanMottattScenario } from "./testscenarios/godkjennPlanMottatt/godkjennPlanMottattScenario";
import { planUnderArbeidScenario } from "./testscenarios/underArbeid/planUnderArbeidScenario";
import { MockSetup, TestScenario } from "./getMockDb";

const activeMockData: MockSetup = { ...noPlanScenarioSM };

export const getMockSetupForScenario = (scenario: TestScenario) => {
  switch (scenario) {
    case "INGENPLAN":
      return noPlanScenarioSM;
    case "GODKJENNPLANAVSLATT":
      return godkjennPlanAvslattScenario;
    case "UNDERARBEID":
      return planUnderArbeidScenario;
    case "GODKJENNPLANSENDT":
      return godkjennPlanSendtScenario;
    case "GODKJENNPLANMOTTATT":
      return godkjennPlanMottattScenario;
  }
};

export default activeMockData;
