import getMockDb from "../mock/getMockDb";
import { NextApiRequest } from "next";
import {
  getDineSykmeldteTokenFromRequest,
  getOppfolgingsplanBackendTokenFromRequest,
  getSyfoOppfolgingsplanserviceTokenFromRequest,
} from "../../auth/tokenx/getTokenXFromRequest";
import {
  getDineSykmeldteMedSykmeldinger,
  getOppfolgingsplanerAG,
} from "../../service/oppfolgingsplanService";
import { fetchVirksomhet } from "../common/fetchVirksomhet";
import { fetchPerson } from "../common/fetchPerson";
import { fetchKontaktinfo } from "../common/fetchKontaktinfo";
import { fetchNaermesteLederForVirksomhet } from "./fetchNaermesteLederForVirksomhet";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { filterValidOppfolgingsplaner } from "../mapping/filterValidOppfolgingsplaner";
import { ApiErrorException, generalError } from "../../../api/axios/errors";
import { getNarmesteLederIdFromRequest } from "../../utils/requestUtils";
import { isMockBackend } from "../../utils/serverEnv";

export const fetchOppfolgingsplanerMetaAG = async (
  req: NextApiRequest,
): Promise<OppfolgingsplanMeta | undefined> => {
  const narmesteLederId = getNarmesteLederIdFromRequest(req);

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
    const dineSykmeldteTokenX = await getDineSykmeldteTokenFromRequest(req);

    const dineSykmeldteMedSykmeldinger =
      await getDineSykmeldteMedSykmeldinger(dineSykmeldteTokenX);

    const sykmeldt = dineSykmeldteMedSykmeldinger.find(
      (sykmeldt) => sykmeldt.narmestelederId == narmesteLederId,
    );

    if (!sykmeldt) {
      throw new ApiErrorException(generalError("Ikke tilgang"));
    }

    const syfoOppfolgingsplanServiceTokenX =
      await getSyfoOppfolgingsplanserviceTokenFromRequest(req);

    const oppfolgingsplanBackendTokenX =
      await getOppfolgingsplanBackendTokenFromRequest(req);

    const oppfolgingsplaner = await getOppfolgingsplanerAG(
      sykmeldt.fnr,
      sykmeldt.orgnummer,
      syfoOppfolgingsplanServiceTokenX,
    );

    const validOppfolgingsplaner = filterValidOppfolgingsplaner(
      oppfolgingsplaner,
      sykmeldt,
    );

    if (validOppfolgingsplaner.length > 0) {
      const virksomhetPromise = fetchVirksomhet(
        oppfolgingsplanBackendTokenX,
        validOppfolgingsplaner,
      );
      const personPromise = fetchPerson(
        oppfolgingsplanBackendTokenX,
        validOppfolgingsplaner,
      );
      const kontaktinfoPromise = fetchKontaktinfo(
        oppfolgingsplanBackendTokenX,
        validOppfolgingsplaner,
      );
      const narmesteLederPromise = fetchNaermesteLederForVirksomhet(
        oppfolgingsplanBackendTokenX,
        validOppfolgingsplaner,
      );

      const [virksomhet, person, kontaktinfo, narmesteLeder] =
        await Promise.all([
          virksomhetPromise,
          personPromise,
          kontaktinfoPromise,
          narmesteLederPromise,
        ]);

      return {
        person: person,
        oppfolgingsplaner: validOppfolgingsplaner,
        virksomhet: virksomhet,
        kontaktinfo: kontaktinfo,
        narmesteLedere: narmesteLeder ? [narmesteLeder] : [],
      };
    }
  }
  return undefined;
};
