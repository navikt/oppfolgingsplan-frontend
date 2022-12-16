import { godkjennPlanSendtOppfolgingsplanerMockData } from "./godkjennPlanSendtOppfolgingsplanerMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const godkjennPlanSendtScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: godkjennPlanSendtOppfolgingsplanerMockData,
  activeTestScenario: "GODKJENNPLANSENDT",
};
