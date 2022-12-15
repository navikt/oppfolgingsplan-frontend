import { isMockBackend } from "../../../environments/publicEnv";
import getMockDb from "../mock/getMockDb";
import { NextApiRequest } from "next";
import {
  getDineSykmeldteTokenFromRequest,
  getSyfoOppfolgingsplanserviceTokenFromRequest,
} from "../../auth/tokenx/getTokenXFromRequest";
import {
  getDineSykmeldteMedSykmeldinger,
  getOppfolgingsplanerAG,
} from "../../service/oppfolgingsplanService";
import { fetchVirksomhet } from "../common/fetchVirksomhet";
import { fetchArbeidsforhold } from "../common/fetchArbeidsforhold";
import { fetchPerson } from "../common/fetchPerson";
import { fetchKontaktinfo } from "../common/fetchKontaktinfo";
import { fetchNaermesteLederForVirksomhet } from "./fetchNaermesteLederForVirksomhet";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { filterValidOppfolgingsplaner } from "../mapping/filterValidOppfolgingsplaner";

export const fetchOppfolgingsplanerMetaAG = async (
  req: NextApiRequest
): Promise<OppfolgingsplanMeta | undefined> => {
  if (isMockBackend) {
    const activeMock = getMockDb(); //Todo finn ut av mockdata løsning

    return {
      person: activeMock.person,
      oppfolgingsplaner: activeMock.oppfolgingsplaner,
      virksomhet: activeMock.virksomhet,
      kontaktinfo: activeMock.kontaktinfo,
      stillinger: activeMock.stillinger,
      narmesteLedere: activeMock.narmesteLedere,
    };
  } else {
    const syfoOppfolgingsplanServiceTokenX =
      await getSyfoOppfolgingsplanserviceTokenFromRequest(req);

    const dineSykmeldteTokenX = await getDineSykmeldteTokenFromRequest(req);

    const oppfolgingsplaner = await getOppfolgingsplanerAG(
      syfoOppfolgingsplanServiceTokenX
    );
    const dineSykmeldteMedSykmeldinger = await getDineSykmeldteMedSykmeldinger(
      dineSykmeldteTokenX
    );

    const validOppfolgingsplaner = filterValidOppfolgingsplaner(
      oppfolgingsplaner,
      dineSykmeldteMedSykmeldinger
    );

    if (validOppfolgingsplaner.length > 0) {
      const virksomhetPromise = fetchVirksomhet(
        syfoOppfolgingsplanServiceTokenX,
        validOppfolgingsplaner
      );
      const personPromise = fetchPerson(
        syfoOppfolgingsplanServiceTokenX,
        validOppfolgingsplaner
      );
      const kontaktinfoPromise = fetchKontaktinfo(
        syfoOppfolgingsplanServiceTokenX,
        validOppfolgingsplaner
      );
      const arbeidsforholdPromise = fetchArbeidsforhold(
        syfoOppfolgingsplanServiceTokenX,
        validOppfolgingsplaner
      );
      const narmesteLederPromise = fetchNaermesteLederForVirksomhet(
        syfoOppfolgingsplanServiceTokenX,
        validOppfolgingsplaner
      );

      const [virksomhet, person, kontaktinfo, arbeidsforhold, narmesteLeder] =
        await Promise.all([
          virksomhetPromise,
          personPromise,
          kontaktinfoPromise,
          arbeidsforholdPromise,
          narmesteLederPromise,
        ]);

      return {
        person: person,
        oppfolgingsplaner: validOppfolgingsplaner,
        virksomhet: virksomhet,
        kontaktinfo: kontaktinfo,
        stillinger: arbeidsforhold,
        narmesteLedere: [narmesteLeder],
      };
    }
  }
  return undefined;
};
