import { godkjennPlanAvslattOppfolgingsplanerMockData } from "./godkjennPlanAvslattOppfolgingsplanerMockData";
import { defaultSykmeldingerMockData } from "../../defaultData/oppfolgingsplanservice/defaultSykmeldingerMockData";
import {
  defaultVirksomhetMockData,
  otherVirksomhetMockData,
} from "../../defaultData/oppfolgingsplanservice/defaultVirksomhetMockData";
import { defaultStillingerMockData } from "../../defaultData/oppfolgingsplanservice/defaultStillingerMockData";
import { defaultNarmesteLedereMockData } from "../../defaultData/oppfolgingsplanservice/defaultNarmesteLedereMockData";
import { defaultPersonMockData } from "../../defaultData/oppfolgingsplanservice/defaultPersonMockData";
import { defaultKontaktinfoMockData } from "../../defaultData/oppfolgingsplanservice/defaultKontaktinfoMockData";
import { MockSetupSM } from "../../getMockDb";

export const godkjennPlanAvslattScenario: MockSetupSM = {
  oppfolgingsplaner: godkjennPlanAvslattOppfolgingsplanerMockData,
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
  activeTestScenario: "GODKJENNPLANAVSLATT",
};
