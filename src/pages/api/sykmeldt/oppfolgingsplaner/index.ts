import { NextApiRequest, NextApiResponse } from "next";
import { fetchOppfolgingsplanerMetaSM } from "../../../../server/data/sykmeldt/fetchOppfolgingsplanerMetaSM";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { mapOppfolgingsplanMetaToOppfolgingsplaner } from "../../../../server/data/mapping/mapOppfolgingsplanMetaToOppfolgingsplaner";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const oppfolgingplanerMeta = await fetchOppfolgingsplanerMetaSM(req);

  res
    .status(200)
    .json(mapOppfolgingsplanMetaToOppfolgingsplaner(oppfolgingplanerMeta));
};

export default beskyttetApi(handler);
