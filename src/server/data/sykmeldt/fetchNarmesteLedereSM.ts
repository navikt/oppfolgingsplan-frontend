import {isMockBackend} from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import {
    NextApiResponseNarmesteLedereSM
} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";
import {handleQueryParamError, handleSchemaParsingError} from "@/server/utils/errors";
import {getNarmesteLedere} from "@/server/service/oppfolgingsplanService";
import {getOppfolgingsplanTokenX} from "@/server/utils/tokenX";
import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";

export const fetchNarmesteLedereSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponseNarmesteLedereSM,
    next: () => void
) => {
    const { sykmeldtFnr } = req.query;

    if (typeof sykmeldtFnr !== 'string') {
        return handleQueryParamError(sykmeldtFnr);
    }

    if (isMockBackend) {
        res.narmesteLedere = activeMockSM.narmesteLedere
    } else {
        const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);
        const narmesteLedereResponse = await getNarmesteLedere(oppfolgingsplanTokenX, sykmeldtFnr);

        if (narmesteLedereResponse.success) {
            res.narmesteLedere = narmesteLedereResponse.data;
        } else {
            handleSchemaParsingError("Sykmeldt", "NarmesteLedere", narmesteLedereResponse.error);
        }
    }

    next();
};