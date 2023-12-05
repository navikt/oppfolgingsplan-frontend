import { NextApiRequest } from "next";
import {
  ApiErrorException,
  loginRequiredError,
} from "../../../api/axios/errors";
import { validateToken } from "./verifyIdportenToken";
import { isMockBackend } from "../../utils/serverEnv";

async function getIdportenToken(req: NextApiRequest) {
  if (isMockBackend) {
    return "sometoken";
  }

  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    throw new ApiErrorException(loginRequiredError(), 401);
  }

  if (!(await validateToken(bearerToken))) {
    throw new ApiErrorException(
      loginRequiredError(
        "Failed to validate bearer token, redirecting to login",
      ),
      401,
    );
  }

  return bearerToken.replace("Bearer ", "");
}

export default getIdportenToken;
