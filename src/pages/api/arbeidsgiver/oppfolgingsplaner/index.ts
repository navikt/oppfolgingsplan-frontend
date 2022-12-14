import { NextApiRequest, NextApiResponse } from "next";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { fetchOppfolgingsplanerMetaAG } from "../../../../server/data/arbeidsgiver/fetchOppfolgingsplanerMetaAG";
import { mapOppfolgingsplanMetaToOppfolgingsplaner } from "../../../../server/data/mapping/mapOppfolgingsplanMetaToOppfolgingsplaner";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const oppfolgingplanerMeta = await fetchOppfolgingsplanerMetaAG(req);

  res
    .status(200)
    .json(mapOppfolgingsplanMetaToOppfolgingsplaner(oppfolgingplanerMeta));
};

export default beskyttetApi(handler);
