import { get } from "@/common/api/axios/axios";
import { array } from "zod";
import serverEnv from "@/server/utils/serverEnv";
import { brevSchema } from "./schema/brevSchema";

export async function getBrevAG(accessToken: string, personIdent: string) {
  return array(brevSchema).safeParse(
    await get(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/api/v2/narmesteleder/brev`, {
      accessToken,
      personIdent,
    })
  );
}

export async function getBrevSM(accessToken: string) {
  return array(brevSchema).safeParse(
    await get(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/api/v2/arbeidstaker/brev`, {
      accessToken,
    })
  );
}
