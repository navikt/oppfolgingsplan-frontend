import { ingenPlanScenario } from "./testscenarios/ingenplan/ingenPlanScenario";
import { sykmeldtSendtTilGodkjenningAGEndretScenario } from "./testscenarios/sykmeldtsendttilgodkjenningagendret/sykmeldtSendtTilGodkjenningAGEndretScenario";
import { sykmeldtSendtTilGodkjenningScenario } from "./testscenarios/sykmeldtsendttilgodkjenning/sykmeldtSendtTilGodkjenningScenario";
import { arbeidsgiverSendtTilGodkjenningScenario } from "./testscenarios/arbeidsgiversendttilgodkjenning/arbeidsgiverSendtTilGodkjenningScenario";
import { planUnderArbeidScenario } from "./testscenarios/planunderarbeid/planUnderArbeidScenario";
import { MockSetup, TestScenario } from "./getMockDb";
import { tidligerePlanerScenario } from "./testscenarios/tidligereoppfolgingsplaner/tidligerePlanerScenario";
import { godkjentPlanScenario } from "./testscenarios/godkjentplan/godkjentPlanScenario";

const activeMockData: MockSetup = { ...planUnderArbeidScenario };

export const getMockSetupForScenario = (scenario: TestScenario) => {
  switch (scenario) {
    case "INGENPLAN":
      return ingenPlanScenario;
    case "TIDLIGEREPLANER":
      return tidligerePlanerScenario;
    case "SYKMELDT_HAR_SENDT_TIL_GODKJENNING_AG_HAR_ENDRET":
      return sykmeldtSendtTilGodkjenningAGEndretScenario;
    case "UNDERARBEID":
      return planUnderArbeidScenario;
    case "GODKJENTPLAN":
      return godkjentPlanScenario;
    case "SYKMELDT_HAR_SENDT_TIL_GODKJENNING":
      return sykmeldtSendtTilGodkjenningScenario;
    case "ARBEIDSGIVER_HAR_SENDT_TIL_GODKJENNING":
      return arbeidsgiverSendtTilGodkjenningScenario;
  }
};

export default activeMockData;
