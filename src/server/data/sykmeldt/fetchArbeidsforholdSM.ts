import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import activeMockSM from "server/data/mock/activeMockSM";
import { getArbeidsforholdSM } from "server/service/oppfolgingsplanService";
import { handleSchemaParsingError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { NextApiResponseOppfolgingsplanSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import serverLogger from "server/utils/serverLogger";
import { Arbeidsforhold } from "../../../schema/ArbeidsforholdSchema";

const fetchSingleArbeidsforhold = async (
  oppfolgingsplanTokenX: string,
  fnr: string,
  virksomhetsnummer: string,
  fom: string
) => {
  const response = await getArbeidsforholdSM(
    oppfolgingsplanTokenX,
    fnr,
    virksomhetsnummer,
    fom
  );

  if (response.success) {
    return {
      ...response.data,
      virksomhetsnummer: virksomhetsnummer,
      fom: fom,
    };
  } else {
    handleSchemaParsingError("Sykmeldt", "Arbeidsforhold", response.error);
  }
};

interface ArbeidsforholdQueryParams {
  fnr: string;
  fom: string;
  virksomhetsnummer: string;
}

export const fetchArbeidsforholdSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.stillinger = [...activeMockSM.stillinger];
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    const unikeArbeidsforhold: ArbeidsforholdQueryParams[] = [
      ...new Set(
        res.oppfolgingsplaner
          .filter((plan) => plan.arbeidstaker.fnr)
          .filter((plan) => plan.opprettetDato)
          .filter((plan) => plan.virksomhet?.virksomhetsnummer)
          .map((plan) => {
            return {
              fnr: plan.arbeidstaker.fnr!!,
              fom: plan.opprettetDato!!,
              virksomhetsnummer: plan.virksomhet?.virksomhetsnummer!!,
            };
          })
      ),
    ];

    if (!unikeArbeidsforhold) {
      serverLogger.info("Hent oppfølgingsplaner: ingen arbeidsforhold å hente");
      return next();
    }

    const arbeidsforholdPromises: any[] = [];

    unikeArbeidsforhold.forEach((params) => {
      if (params) {
        const arbeidsforhold = fetchSingleArbeidsforhold(
          oppfolgingsplanTokenX,
          params.fnr,
          params.virksomhetsnummer,
          params.fom
        );
        arbeidsforholdPromises.push(arbeidsforhold);
      }
    });

    res.stillinger = await Promise.all(arbeidsforholdPromises);
  }

  next();
};
