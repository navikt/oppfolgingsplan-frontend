import { NextApiRequest } from "next";
import getIdportenToken from "../idporten/idportenToken";
import { getOppfolgingsplanTokenX } from "../../utils/tokenX";

export const getSyfoOppfolgingsplanserviceTokenFromRequest = async (
  req: NextApiRequest
) => {
  const idPortenToken = await getIdportenToken(req);
  return await getOppfolgingsplanTokenX(idPortenToken);
};
