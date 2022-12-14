import { isMockBackend } from "../../../environments/publicEnv";
import getMockDb from "../mock/getMockDb";
import { NextApiRequest } from "next";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanerAG } from "../../service/oppfolgingsplanService";
import { fetchVirksomhet } from "../common/fetchVirksomhet";
import { fetchArbeidsforhold } from "../common/fetchArbeidsforhold";
import { fetchPerson } from "../common/fetchPerson";
import { fetchKontaktinfo } from "../common/fetchKontaktinfo";
import { fetchNaermesteLederForVirksomhet } from "./fetchNaermesteLederForVirksomhet";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

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
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);

    const oppfolgingsplaner = await getOppfolgingsplanerAG(tokenX);

    if (oppfolgingsplaner.length > 0) {
      const virksomhetPromise = fetchVirksomhet(tokenX, oppfolgingsplaner);
      const personPromise = fetchPerson(tokenX, oppfolgingsplaner);
      const kontaktinfoPromise = fetchKontaktinfo(tokenX, oppfolgingsplaner);
      const arbeidsforholdPromise = fetchArbeidsforhold(
        tokenX,
        oppfolgingsplaner
      );
      const narmesteLederPromise = fetchNaermesteLederForVirksomhet(
        tokenX,
        oppfolgingsplaner
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
        oppfolgingsplaner: oppfolgingsplaner,
        virksomhet: virksomhet,
        kontaktinfo: kontaktinfo,
        stillinger: arbeidsforhold,
        narmesteLedere: [narmesteLeder],
      };
    }
  }
  return undefined;
};
