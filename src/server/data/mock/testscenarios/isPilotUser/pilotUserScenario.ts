import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const pilotUserScenario: MockSetup = {
  ...defaultMockSetup,
  person: {
    ...defaultMockSetup.person,
    pilotUser: true,
  },
  activeTestScenario: "TIDLIGEREPLANER",
};
