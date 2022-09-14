import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import {
  ApiErrorException,
  loginRequiredError,
} from "@/common/api/axios/errors";
import { validateToken } from "./verifyIdportenToken";

async function getIdportenToken(
  req: IAuthenticatedRequest,
  _res: NextApiResponse,
  next: (e?: Error) => void
) {
  if (isMockBackend) {
    return next();
  }

  const bearerToken = req.headers["authorization"];

  if (!bearerToken || !(await validateToken(bearerToken))) {
    throw new ApiErrorException(loginRequiredError());
  }

  req.idportenToken = bearerToken.replace("Bearer ", "");
  next();
}

export default getIdportenToken;
