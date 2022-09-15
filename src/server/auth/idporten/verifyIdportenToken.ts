import { Client, Issuer } from "openid-client";
import { createRemoteJWKSet, jwtVerify } from "jose";

import serverLogger from "@/server/utils/serverLogger";
import serverEnv from "@/server/utils/serverEnv";

let _issuer: Issuer<Client>;
let _remoteJWKSet: ReturnType<typeof createRemoteJWKSet>;

async function issuer(): Promise<Issuer<Client>> {
  if (typeof _issuer === "undefined") {
    _issuer = await Issuer.discover(serverEnv.IDPORTEN_WELL_KNOWN_URL);
  }
  return _issuer;
}

async function jwkSet(): Promise<ReturnType<typeof createRemoteJWKSet>> {
  if (typeof _remoteJWKSet === "undefined") {
    const iss = await issuer();
    _remoteJWKSet = createRemoteJWKSet(new URL(<string>iss.metadata.jwks_uri));
  }

  return _remoteJWKSet;
}

export async function validateToken(bearerToken: string): Promise<boolean> {
  const token = bearerToken.replace("Bearer ", "");
  const verified = await jwtVerify(token, await jwkSet(), {
    issuer: (await issuer()).metadata.issuer,
  });

  if (verified.payload.exp && verified.payload.exp * 1000 <= Date.now()) {
    serverLogger.error({}, "token is expired");
    return false;
  }

  if (verified.payload.client_id !== serverEnv.IDPORTEN_CLIENT_ID) {
    serverLogger.error({}, "client_id does not match app client_id");
    return false;
  }

  if (verified.payload.acr !== "Level4") {
    serverLogger.error({}, "token does not have acr Level4");
    return false;
  }

  return true;
}
