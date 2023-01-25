import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";
import { planUnderArbeidOppfolgingsplanerMockData } from "./planUnderArbeidOppfolgingsplanerMockData";

export const planUnderArbeidScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: planUnderArbeidOppfolgingsplanerMockData,
  activeTestScenario: "UNDERARBEID",
};
