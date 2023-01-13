import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const ingenPlanScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: [],
  activeTestScenario: "INGENPLAN",
};
