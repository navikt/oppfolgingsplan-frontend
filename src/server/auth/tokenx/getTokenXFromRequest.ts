import { NextApiRequest } from "next";
import getIdportenToken from "../idporten/idportenToken";
import { getTokenX } from "./index";
import serverEnv from "../../utils/serverEnv";

export const getSyfoOppfolgingsplanserviceTokenFromRequest = async (
  req: NextApiRequest,
): Promise<string> => {
  const idportenToken = await getIdportenToken(req);
  return await getTokenX(
    idportenToken,
    serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID,
  );
};

export const getOppfolgingsplanBackendTokenFromRequest = async (
  req: NextApiRequest,
): Promise<string> => {
  const idportenToken = await getIdportenToken(req);
  return await getTokenX(
    idportenToken,
    serverEnv.OPPFOLGINGSPLAN_BACKEND_CLIENT_ID,
  );
};

export const getDineSykmeldteTokenFromRequest = async (
  req: NextApiRequest,
): Promise<string> => {
  const idportenToken = await getIdportenToken(req);
  return await getTokenX(
    idportenToken,
    serverEnv.SYKMELDINGER_ARBEIDSGIVER_CLIENT_ID,
  );
};
