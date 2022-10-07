import { defaultOppfolgingsplanerMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultOppfolgingsplanerMockData";
import { defaultSykmeldingerMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultSykmeldingerMockData";
import { defaultNarmesteLedereMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultNarmesteLedereMockData";
import {
  defaultVirksomhetMockData,
  otherVirksomhetMockData,
} from "@/server/data/mock/data/oppfolgingsplanservice/defaultVirksomhetMockData";
import { defaultPersonMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultPersonMockData";
import { defaultKontaktinfoMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultKontaktinfoMockData";

const activeMockSM = {
  oppfolgingsplaner: defaultOppfolgingsplanerMockData,
  sykmeldinger: defaultSykmeldingerMockData,
  virksomhet: [defaultVirksomhetMockData, otherVirksomhetMockData],
  narmesteLedere: defaultNarmesteLedereMockData,
  person: defaultPersonMockData,
  kontaktinfo: defaultKontaktinfoMockData,
  tilgang: {
    harTilgang: true,
    ikkeTilgangGrunn: null,
  },
};

export default activeMockSM;
