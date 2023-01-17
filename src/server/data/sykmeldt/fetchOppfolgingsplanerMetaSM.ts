import { isMockBackend } from "../../../environments/publicEnv";
import { getOppfolgingsplanerSM } from "../../service/oppfolgingsplanService";
import { fetchNarmesteLedereSM } from "./fetchNarmesteLedereSM";
import getMockDb from "../mock/getMockDb";
import { NextApiRequest } from "next";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../auth/tokenx/getTokenXFromRequest";
import { fetchVirksomhet } from "../common/fetchVirksomhet";
import { fetchArbeidsforhold } from "../common/fetchArbeidsforhold";
import { fetchPerson } from "../common/fetchPerson";
import { fetchKontaktinfo } from "../common/fetchKontaktinfo";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

export const fetchOppfolgingsplanerMetaSM = async (
  req: NextApiRequest
): Promise<OppfolgingsplanMeta | undefined> => {
  if (isMockBackend) {
    const activeMock = getMockDb();

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

    const oppfolgingsplaner = await getOppfolgingsplanerSM(tokenX);

    if (oppfolgingsplaner.length > 0) {
      const virksomhetPromise = fetchVirksomhet(tokenX, oppfolgingsplaner);
      const personPromise = fetchPerson(tokenX, oppfolgingsplaner);
      const kontaktinfoPromise = fetchKontaktinfo(tokenX, oppfolgingsplaner);
      const arbeidsforholdPromise = fetchArbeidsforhold(
        tokenX,
        oppfolgingsplaner
      );
      const narmesteLederePromise = fetchNarmesteLedereSM(
        tokenX,
        oppfolgingsplaner[0].arbeidstaker.fnr
      );

      const [virksomhet, person, kontaktinfo, arbeidsforhold, narmesteLedere] =
        await Promise.all([
          virksomhetPromise,
          personPromise,
          kontaktinfoPromise,
          arbeidsforholdPromise,
          narmesteLederePromise,
        ]);

      return {
        person: person,
        oppfolgingsplaner: oppfolgingsplaner,
        virksomhet: virksomhet,
        kontaktinfo: kontaktinfo,
        stillinger: arbeidsforhold,
        narmesteLedere: narmesteLedere,
      };
    }
  }
  return undefined;
};
