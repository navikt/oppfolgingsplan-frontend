import {NextApiRequest, NextApiResponse} from "next";
import nc from "next-connect";
import {ncOptions} from "@/server/utils/ncOptions";
import {withSentry} from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import {Tilgang} from "@/types/oppfolgingsplanservice/tilgangType";
import {NextApiResponseTilgangSM} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseTilgangSM";
import {fetchTilgangSM} from "@/server/data/sykmeldt/fetchTilgangSM";

const handler = nc<NextApiRequest, NextApiResponse<Tilgang>>(ncOptions)
    .use(getIdportenToken)
    .use(fetchTilgangSM)
    .get(async (req: NextApiRequest, res: NextApiResponseTilgangSM) => {
        res.status(200).json(res.tilgang);
    });

export default withSentry(handler);
