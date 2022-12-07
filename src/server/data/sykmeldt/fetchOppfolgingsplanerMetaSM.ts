import { isMockBackend } from "../../../environments/publicEnv";
import { getOppfolgingsplanerSM } from "../../service/oppfolgingsplanService";
import { fetchVirksomhetSM } from "./fetchVirksomhetSM";
import { fetchPersonSM } from "./fetchPersonSM";
import { fetchKontaktinfoSM } from "./fetchKontaktinfoSM";
import { fetchArbeidsforholdSM } from "./fetchArbeidsforholdSM";
import { fetchNarmesteLedereSM } from "./fetchNarmesteLedereSM";
import {
  Oppfolgingsplan,
  Person,
  Stilling,
  Virksomhet,
} from "../../../schema/oppfolgingsplanSchema";
import { Kontaktinfo } from "../../../schema/kontaktinfoSchema";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import getMockDb from "../mock/getMockDb";
import { NextApiRequest } from "next";
import { getTokenXTokenFromRequest } from "../../auth/tokenx/getTokenXFromRequest";

export interface OppfolgingsplanMetaSM {
  person: Person;
  oppfolgingsplaner: Oppfolgingsplan[];
  virksomhet: Virksomhet[];
  kontaktinfo: Kontaktinfo;
  stillinger: Stilling[];
  narmesteLedere: NarmesteLeder[];
}

export const fetchOppfolgingsplanerMetaSM = async (
  req: NextApiRequest
): Promise<OppfolgingsplanMetaSM | undefined> => {
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
    const tokenX = await getTokenXTokenFromRequest(req);

    const oppfolgingsplaner = await getOppfolgingsplanerSM(tokenX);

    if (oppfolgingsplaner.length > 0) {
      const virksomhetPromise = fetchVirksomhetSM(tokenX, oppfolgingsplaner);
      const personPromise = fetchPersonSM(tokenX, oppfolgingsplaner);
      const kontaktinfoPromise = fetchKontaktinfoSM(tokenX, oppfolgingsplaner);
      const arbeidsforholdPromise = fetchArbeidsforholdSM(
        tokenX,
        oppfolgingsplaner
      );
      const narmesteLederePromise = fetchNarmesteLedereSM(
        tokenX,
        oppfolgingsplaner
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
