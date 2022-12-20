import { godkjennPlanAvslattOppfolgingsplanerMockData } from "./godkjennPlanAvslattOppfolgingsplanerMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const godkjennPlanAvslattScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: godkjennPlanAvslattOppfolgingsplanerMockData,
  activeTestScenario: "GODKJENNPLANAVSLATT",
};
