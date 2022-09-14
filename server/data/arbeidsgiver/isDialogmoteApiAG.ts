import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import serverEnv from "@/common/utils/serverEnv";
import { isDevelopment, isMockBackend, isOpplaering } from "@/common/publicEnv";
import { pdfMock } from "@/server/data/mock/brev/pdfMock";
import { get, post } from "@/common/api/axios/axios";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { SvarRespons } from "types/shared/brev";
import { getTokenX } from "@/server/auth/tokenx";

const brevApiAG = (path?: string): string => {
  const host = `${serverEnv.ISDIALOGMOTE_HOST}/api/v2/narmesteleder/brev`;

  return path ? `${host}${path}` : host;
};

export const fetchBrevPdfAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse & { pdf: any }, //todo better typing and response PDF
  next: () => void
) => {
  if (isMockBackend) {
    res.pdf = pdfMock;
  } else {
    const tokenX = await getTokenX(
      req.idportenToken,
      serverEnv.ISDIALOGMOTE_CLIENT_ID
    );

    const { uuid } = req.query;
    res.pdf = await get(brevApiAG(`/${uuid}/pdf`), {
      accessToken: tokenX,
      responseType: "arraybuffer",
    });
  }

  next();
};

export const postBrevLestAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isDevelopment) {
    const { uuid } = req.query;
    const brevToUpdate = activeMockAG.brev.find((b) => b.uuid === uuid);
    brevToUpdate!!.lestDato = new Date().toISOString();
  }
  if (isMockBackend || isOpplaering) {
    return next();
  } else {
    const tokenX = await getTokenX(
      req.idportenToken,
      serverEnv.ISDIALOGMOTE_CLIENT_ID
    );

    const { uuid } = req.query;
    await post(brevApiAG(`/${uuid}/les`), undefined, {
      accessToken: tokenX,
    });
  }

  next();
};

export const postBrevSvarAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isDevelopment) {
    const { uuid } = req.query;
    const brevToUpdate = activeMockAG.brev.find((b) => b.uuid === uuid);
    const svar: SvarRespons = req.body;
    brevToUpdate!!.svar = {
      svarType: svar.svarType,
      svarTekst: svar.svarTekst,
      svarTidspunkt: new Date().toISOString(),
    };
  }
  if (isMockBackend || isOpplaering) {
    return next();
  } else {
    const tokenX = await getTokenX(
      req.idportenToken,
      serverEnv.ISDIALOGMOTE_CLIENT_ID
    );

    const { uuid } = req.query;
    const svar: SvarRespons = req.body;
    await post(brevApiAG(`/${uuid}/respons`), svar, {
      accessToken: tokenX,
    });
  }

  next();
};
