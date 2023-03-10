import { Issuer } from "openid-client";
import serverEnv from "../../../server/utils/serverEnv";

let _issuer: Issuer;

export async function getIssuer(): Promise<Issuer> {
  if (_issuer) return _issuer;
  _issuer = await Issuer.discover(serverEnv.TOKEN_X_WELL_KNOWN_URL);
  return _issuer;
}
