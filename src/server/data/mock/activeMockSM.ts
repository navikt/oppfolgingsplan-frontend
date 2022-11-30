import { MockSetupSM, TestScenario } from "./activeTestScenario";
import { noPlanScenarioSM } from "./testscenarios/noplan/noPlanScenario";
import { godkjennPlanAvslattScenario } from "./testscenarios/godkjentPlanAvslatt/godkjennPlanAvslattScenario";
import { godkjennPlanSendtScenario } from "./testscenarios/godkjennPlanSendt/godkjennPlanSendtScenario";
import { godkjennPlanMottattScenario } from "./testscenarios/godkjennPlanMottatt/godkjennPlanMottattScenario";

const activeMockSM: MockSetupSM = { ...noPlanScenarioSM };

export const getMockSetupForScenario = (scenario: TestScenario) => {
  switch (scenario) {
    case "INGENPLAN":
      return noPlanScenarioSM;
    case "GODKJENNPLANAVSLATT":
      return godkjennPlanAvslattScenario;
    case "GODKJENNPLANSENDT":
      return godkjennPlanSendtScenario;
    case "GODKJENNPLANMOTTATT":
      return godkjennPlanMottattScenario;
  }
};

export default activeMockSM;
