import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { TokenSet } from "openid-client";

export interface IAuthenticatedRequest extends NextApiRequest {
  cookies: NextApiRequestCookies;
  idportenToken: string;
}
