import { NextApiRequest } from "next";
import getIdportenToken from "../idporten/idportenToken";
import {
  getOppfolgingsplanTokenX,
  getSykmeldingerArbeidsgiverTokenX,
} from "../../utils/tokenX";

export const getSyfoOppfolgingsplanserviceTokenFromRequest = async (
  req: NextApiRequest
): Promise<string> => {
  const idPortenToken = await getIdportenToken(req);
  return await getOppfolgingsplanTokenX(idPortenToken);
};

export const getDineSykmeldteTokenFromRequest = async (
  req: NextApiRequest
): Promise<string> => {
  const idPortenToken = await getIdportenToken(req);
  return await getSykmeldingerArbeidsgiverTokenX(idPortenToken);
};
