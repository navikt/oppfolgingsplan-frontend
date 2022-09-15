import { get, post } from "@/common/api/axios/axios";

import serverEnv from "@/server/utils/serverEnv";
import { motebehovSchema } from "./schema/motebehovSchema";

export async function getMotebehovAG(
  accessToken: string,
  fnr: string,
  orgnummer: string
) {
  const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/motebehov?fnr=${fnr}&virksomhetsnummer=${orgnummer}`;

  return motebehovSchema.safeParse(
    await get(url, {
      accessToken,
    })
  );
}

export async function getMotebehovSM(accessToken: string) {
  return motebehovSchema.safeParse(
    await get(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov`,
      {
        accessToken,
      }
    )
  );
}
