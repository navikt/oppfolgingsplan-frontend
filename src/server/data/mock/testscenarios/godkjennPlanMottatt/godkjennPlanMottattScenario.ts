import { godkjennPlanMottattOppfolgingsplanerMockData } from "./godkjennPlanMottattOppfolgingsplanerMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const godkjennPlanMottattScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: godkjennPlanMottattOppfolgingsplanerMockData,
  activeTestScenario: "GODKJENNPLANMOTTATT",
};
