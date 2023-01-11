import { sykmeldtSendtTilGodkjenningAGEndretMockData } from "./sykmeldtSendtTilGodkjenningAGEndretMockData";
import { MockSetup } from "../../getMockDb";
import { defaultMockSetup } from "../../defaultData/defaultMockSetup";

export const sykmeldtSendtTilGodkjenningAGEndretScenario: MockSetup = {
  ...defaultMockSetup,
  oppfolgingsplaner: sykmeldtSendtTilGodkjenningAGEndretMockData,
  activeTestScenario: "SYKMELDT_HAR_SENDT_TIL_GODKJENNING_AG_HAR_ENDRET",
};
