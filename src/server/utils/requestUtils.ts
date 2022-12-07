import { NextApiRequest } from "next";
import { handleQueryParamError } from "./errors";

export const getSykmeldtFnrFromRequest = (req: NextApiRequest) => {
  const { sykmeldtFnr } = req.query;

  if (typeof sykmeldtFnr !== "string") {
    return handleQueryParamError(sykmeldtFnr);
  }

  return sykmeldtFnr;
};

export const getOppfolgingsplanIdFromRequest = (
  req: NextApiRequest
): string => {
  const { oppfolgingsplanId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  return oppfolgingsplanId;
};

export const getArbeidsoppgaveIdFromRequest = (req: NextApiRequest): string => {
  const { arbeidsoppgaveId } = req.query;

  if (typeof arbeidsoppgaveId !== "string") {
    return handleQueryParamError(arbeidsoppgaveId);
  }

  return arbeidsoppgaveId;
};

export const getTiltakIdFromRequest = (req: NextApiRequest): string => {
  const { tiltakId } = req.query;

  if (typeof tiltakId !== "string") {
    return handleQueryParamError(tiltakId);
  }

  return tiltakId;
};

export const getKommentarIdFromRequest = (req: NextApiRequest): string => {
  const { kommentarId } = req.query;

  if (typeof kommentarId !== "string") {
    return handleQueryParamError(kommentarId);
  }

  return kommentarId;
};
