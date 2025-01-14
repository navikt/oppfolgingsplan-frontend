import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";
import { ingenPlanMockData } from "./ingenPlanMockData";

export const ingenPlanScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: ingenPlanMockData,
  activeTestScenario: "INGENPLAN",
};
