import { getOppfolgingsplanerSM } from "../../service/oppfolgingsplanService";
import { fetchNarmesteLedereSM } from "./fetchNarmesteLedereSM";
import getMockDb from "../mock/getMockDb";
import { NextApiRequest } from "next";
import {
  getOppfolgingsplanBackendTokenFromRequest,
  getSyfoOppfolgingsplanserviceTokenFromRequest,
} from "../../auth/tokenx/getTokenXFromRequest";
import { fetchVirksomhet } from "../common/fetchVirksomhet";
import { fetchPerson } from "../common/fetchPerson";
import { fetchKontaktinfo } from "../common/fetchKontaktinfo";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { isMockBackend } from "../../utils/serverEnv";

export const fetchOppfolgingsplanerMetaSM = async (
  req: NextApiRequest,
): Promise<OppfolgingsplanMeta | undefined> => {
  if (isMockBackend) {
    const activeMock = getMockDb(req);

    return {
      person: activeMock.person,
      oppfolgingsplaner: activeMock.oppfolgingsplaner,
      virksomhet: activeMock.virksomhet,
      kontaktinfo: activeMock.kontaktinfo,
      narmesteLedere: activeMock.narmesteLedere,
    };
  } else {
    const syfoOppfolgingsplanServiceTokenX =
      await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanBackendTokenX =
      await getOppfolgingsplanBackendTokenFromRequest(req);

    const oppfolgingsplaner = await getOppfolgingsplanerSM(
      syfoOppfolgingsplanServiceTokenX,
    );

    if (oppfolgingsplaner.length > 0) {
      const virksomhetPromise = fetchVirksomhet(
        syfoOppfolgingsplanServiceTokenX,
        oppfolgingsplaner,
      );
      const personPromise = fetchPerson(
        oppfolgingsplanBackendTokenX,
        oppfolgingsplaner,
      );
      const kontaktinfoPromise = fetchKontaktinfo(
        oppfolgingsplanBackendTokenX,
        oppfolgingsplaner,
      );
      const narmesteLederePromise = fetchNarmesteLedereSM(
        oppfolgingsplanBackendTokenX,
      );

      const [virksomhet, person, kontaktinfo, narmesteLedere] =
        await Promise.all([
          virksomhetPromise,
          personPromise,
          kontaktinfoPromise,
          narmesteLederePromise,
        ]);

      return {
        person: person,
        oppfolgingsplaner: oppfolgingsplaner,
        virksomhet: virksomhet,
        kontaktinfo: kontaktinfo,
        narmesteLedere: narmesteLedere,
      };
    }
  }
  return undefined;
};
