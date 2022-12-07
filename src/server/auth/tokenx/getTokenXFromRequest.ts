import { NextApiRequest } from "next";
import getIdportenToken2 from "../idporten/idportenToken2";
import { getOppfolgingsplanTokenX } from "../../utils/tokenX";

export const getTokenXTokenFromRequest = async (req: NextApiRequest) => {
  const idPortenToken = await getIdportenToken2(req);
  return await getOppfolgingsplanTokenX(idPortenToken);
};
