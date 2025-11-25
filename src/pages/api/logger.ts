import { loggingRoute } from "@navikt/next-logger/pages";

import { beskyttetApi } from "../../server/auth/beskyttetApi";

export default beskyttetApi(loggingRoute);
