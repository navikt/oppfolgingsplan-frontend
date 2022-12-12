import { pinoLoggingRoute } from "@navikt/next-logger";
import { beskyttetApi } from "../../server/auth/beskyttetApi";

export default beskyttetApi(pinoLoggingRoute);
