import { GrantBody, GrantExtras, TokenSet } from "openid-client";
import { getClient } from "./tokenx.client";

export const grant = async (
  subject_token: string,
  audience: string
): Promise<TokenSet> => {
  const client = await getClient();

  const body: GrantBody = {
    grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
    client_assertion_type:
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    audience: audience,
    subject_token,
  };

  const extras: GrantExtras = {
    clientAssertionPayload: {
      aud: client.issuer.metadata.token_endpoint,
      nbf: Math.floor(Date.now() / 1000),
    },
  };

  return client.grant(body, extras);
};
