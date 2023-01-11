import { arbeidsgiverSendtTilGodkjenningMockData } from "./arbeidsgiverSendtTilGodkjenningMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const arbeidsgiverSendtTilGodkjenningScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: arbeidsgiverSendtTilGodkjenningMockData,
  activeTestScenario: "ARBEIDSGIVER_SENDT_TIL_GODKJENNING",
};
