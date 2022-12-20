import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const noPlanScenarioSM: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: [],
  activeTestScenario: "INGENPLAN",
};
