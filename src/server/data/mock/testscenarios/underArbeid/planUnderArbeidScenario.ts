import { planUnderArbeidOppfolgingsplanerMockData } from "./planUnderArbeidOppfolgingsplanerMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const planUnderArbeidScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: planUnderArbeidOppfolgingsplanerMockData,
  activeTestScenario: "UNDERARBEID",
};
