import { NextApiRequest, NextApiResponse } from "next";
import { fetchOppfolgingsplanerMetaAG } from "../../../../../server/data/arbeidsgiver/fetchOppfolgingsplanerMetaAG";
import { mapOppfolgingsplanMetaToOppfolgingsplaner } from "../../../../../server/data/mapping/mapOppfolgingsplanMetaToOppfolgingsplaner";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const oppfolgingplanerMeta = await fetchOppfolgingsplanerMetaAG(req);

  res
    .status(200)
    .json(mapOppfolgingsplanMetaToOppfolgingsplaner(oppfolgingplanerMeta));
};

export default beskyttetApi(handler);
