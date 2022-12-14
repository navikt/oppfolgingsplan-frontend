import { NextApiRequest, NextApiResponse } from "next";
import {
  Oppfolgingsplan,
  Person,
  Stilling,
  Virksomhet,
} from "../../../../schema/oppfolgingsplanSchema";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { fetchOppfolgingsplanerMetaAG } from "../../../../server/data/arbeidsgiver/fetchOppfolgingsplanerMetaAG";
import { Kontaktinfo } from "../../../../schema/kontaktinfoSchema";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";
import { mapOppfolgingsplanMetaToOppfolgingsplaner } from "../../../../server/data/mapping/mapOppfolgingsplanMetaToOppfolgingsplaner";

export interface OppfolgingsplanMeta {
  person: Person;
  oppfolgingsplaner: Oppfolgingsplan[];
  virksomhet: Virksomhet[];
  kontaktinfo: Kontaktinfo;
  stillinger: Stilling[];
  narmesteLedere: NarmesteLeder[];
}

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
