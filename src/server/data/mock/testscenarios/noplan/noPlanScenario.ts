import { MockSetupSM } from "../../activeTestScenario";
import { defaultSykmeldingerMockData } from "../../defaultData/oppfolgingsplanservice/defaultSykmeldingerMockData";
import {
  defaultVirksomhetMockData,
  otherVirksomhetMockData,
} from "../../defaultData/oppfolgingsplanservice/defaultVirksomhetMockData";
import { defaultNarmesteLedereMockData } from "../../defaultData/oppfolgingsplanservice/defaultNarmesteLedereMockData";
import { defaultStillingerMockData } from "../../defaultData/oppfolgingsplanservice/defaultStillingerMockData";
import { defaultPersonMockData } from "../../defaultData/oppfolgingsplanservice/defaultPersonMockData";
import { defaultKontaktinfoMockData } from "../../defaultData/oppfolgingsplanservice/defaultKontaktinfoMockData";

export const noPlanScenarioSM: MockSetupSM = {
  oppfolgingsplaner: [],
  sykmeldinger: defaultSykmeldingerMockData,
  virksomhet: [defaultVirksomhetMockData, otherVirksomhetMockData],
  stillinger: defaultStillingerMockData,
  narmesteLedere: defaultNarmesteLedereMockData,
  person: defaultPersonMockData,
  kontaktinfo: defaultKontaktinfoMockData,
  tilgang: {
    harTilgang: true,
    ikkeTilgangGrunn: null,
  },
};
