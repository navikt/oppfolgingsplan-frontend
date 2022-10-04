import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export interface IAuthenticatedRequest extends NextApiRequest {
  cookies: NextApiRequestCookies;
  idportenToken: string;
}
