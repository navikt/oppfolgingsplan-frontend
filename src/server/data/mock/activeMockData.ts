import { ingenPlanScenario } from "./testscenarios/ingenplan/ingenPlanScenario";
import { sykmeldtSendtTilGodkjenningAGEndretScenario } from "./testscenarios/sykmeldtsendttilgodkjenningagendret/sykmeldtSendtTilGodkjenningAGEndretScenario";
import { sykmeldtSendtTilGodkjenningScenario } from "./testscenarios/sykmeldtsendttilgodkjenning/sykmeldtSendtTilGodkjenningScenario";
import { arbeidsgiverSendtTilGodkjenningScenario } from "./testscenarios/arbeidsgiversendttilgodkjenning/arbeidsgiverSendtTilGodkjenningScenario";
import { planUnderArbeidScenario } from "./testscenarios/underarbeid/planUnderArbeidScenario";
import { MockSetup, TestScenario } from "./getMockDb";
import { tidligerePlanerScenario } from "server/data/mock/testscenarios/tidligereplaner/tidligerePlanerScenario";

const activeMockData: MockSetup = { ...ingenPlanScenario };

export const getMockSetupForScenario = (scenario: TestScenario) => {
  switch (scenario) {
    case "INGENPLAN":
      return ingenPlanScenario;
    case "TIDLIGEREPLANER":
      return tidligerePlanerScenario;
    case "SYKMELDT_SENDT_TIL_GODKJENNING_AG_HAR_ENDRET":
      return sykmeldtSendtTilGodkjenningAGEndretScenario;
    case "UNDERARBEID":
      return planUnderArbeidScenario;
    case "SYKMELDT_SENDT_TIL_GODKJENNING":
      return sykmeldtSendtTilGodkjenningScenario;
    case "ARBEIDSGIVER_SENDT_TIL_GODKJENNING":
      return arbeidsgiverSendtTilGodkjenningScenario;
  }
};

export default activeMockData;
