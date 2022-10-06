import { defaultOppfolgingsplanerMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultOppfolgingsplanerMockData";
import { defaultSykmeldingerMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultSykmeldingerMockData";
import { defaultNarmesteLedereMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultNarmesteLedereMockData";
import { defaultVirksomhetMockData } from "@/server/data/mock/data/oppfolgingsplanservice/defaultVirksomhetMockData";

const activeMockSM = {
  oppfolgingsplaner: defaultOppfolgingsplanerMockData,
  sykmeldinger: defaultSykmeldingerMockData,
  virksomhet: defaultVirksomhetMockData,
  narmesteLedere: defaultNarmesteLedereMockData,
  tilgang: {
    harTilgang: true,
    ikkeTilgangGrunn: null,
  },
};

export default activeMockSM;
