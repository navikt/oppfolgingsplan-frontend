import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";
import {tidligerePlanerMockData} from "./tidligerePlanMockData";

export const tidligerePlanerScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: tidligerePlanerMockData,
  activeTestScenario: "TIDLIGEREPLANER",
};
