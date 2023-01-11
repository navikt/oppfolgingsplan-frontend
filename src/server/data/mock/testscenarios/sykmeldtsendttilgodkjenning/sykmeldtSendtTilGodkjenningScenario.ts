import { sykmeldtSendtTilGodkjenningMockData } from "./sykmeldtSendtTilGodkjenningMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const sykmeldtSendtTilGodkjenningScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: sykmeldtSendtTilGodkjenningMockData,
  activeTestScenario: "SYKMELDT_SENDT_TIL_GODKJENNING",
};
