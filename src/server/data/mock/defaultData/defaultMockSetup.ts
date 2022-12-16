import { MockSetup } from "../getMockDb";
import { defaultSykmeldingerMockData } from "./oppfolgingsplanservice/defaultSykmeldingerMockData";
import {
  defaultVirksomhetMockData,
  otherVirksomhetMockData,
} from "./oppfolgingsplanservice/defaultVirksomhetMockData";
import { defaultStillingerMockData } from "./oppfolgingsplanservice/defaultStillingerMockData";
import { defaultNarmesteLedereMockData } from "./oppfolgingsplanservice/defaultNarmesteLedereMockData";
import { defaultPersonMockData } from "./oppfolgingsplanservice/defaultPersonMockData";
import { defaultKontaktinfoMockData } from "./oppfolgingsplanservice/defaultKontaktinfoMockData";
import { defaultSykmeldtMockData } from "./sykmeldinger-arbeidsgiver/defaultSykmeldtMockData";

export const defaultMockSetup: MockSetup = {
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
  sykmeldt: defaultSykmeldtMockData,
  activeTestScenario: "INGENPLAN",
};
