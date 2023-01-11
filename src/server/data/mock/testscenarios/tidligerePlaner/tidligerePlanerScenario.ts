import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";
import { tidligerePlanerMockData } from "server/data/mock/testscenarios/tidligerePlaner/tidligerePlanMockData";

export const tidligerePlanerScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: tidligerePlanerMockData,
  activeTestScenario: "TIDLIGEREPLANER",
};
