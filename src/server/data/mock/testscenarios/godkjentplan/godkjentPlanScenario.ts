import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";
import { godkjentPlanMockData } from "./godkjentPlanMockData";

export const godkjentPlanScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: godkjentPlanMockData,
  activeTestScenario: "GODKJENTPLAN",
};
