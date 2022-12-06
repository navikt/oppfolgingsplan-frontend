import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "server/api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import { ApiErrorException, loginRequiredError } from "api/axios/errors";
import { validateToken } from "./verifyIdportenToken";
import { logger } from "@navikt/next-logger";

async function getIdportenToken(
  req: IAuthenticatedRequest,
  _res: NextApiResponse,
  next: (e?: Error) => void
) {
  if (isMockBackend) {
    return next();
  }

  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    logger.warn("Missing Bearer token, redirecting to login");
    throw new ApiErrorException(loginRequiredError());
  }

  if (!(await validateToken(bearerToken))) {
    logger.warn("Failed to validate bearer token, redirecting to login");
    throw new ApiErrorException(loginRequiredError());
  }

  req.idportenToken = bearerToken.replace("Bearer ", "");
  next();
}

export default getIdportenToken;
