import { logger } from "@navikt/next-logger";
import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "./idporten/verifyIdportenToken";
import { isMockBackend } from "../../environments/publicEnv";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

const UUID =
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const ORGNR = /\b[0-9a-f]{9}\b/g;
const FNR = /\b[0-9]{11}\b/g;
export function cleanPathForMetric(
  value: string | undefined
): string | undefined {
  return value
    ?.replace(UUID, "[uuid]")
    .replace(ORGNR, "[orgnr]")
    .replace(FNR, "[fnr]");
}

export function beskyttetApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res) {
    try {
      if (!isMockBackend) {
        const bearerToken: string | null | undefined =
          req.headers["authorization"];

        if (!bearerToken) {
          return res.status(401).json({ message: "Access denied" });
        }

        if (!(await validateToken(bearerToken))) {
          logger.warn("kunne ikke validere idportentoken i beskyttetApi");
          return res.status(401).json({ message: "Access denied" });
        }
      }

      return await handler(req, res);
    } catch (error: any) {
      if (error.code === 401 || error.code === 403) {
        res.status(401).json({ message: "Access denied" });
      } else {
        if (error.code) {
          logger.error(
            `${req.method} ${cleanPathForMetric(req.url)} returned code: ${
              error.code
            }, message: ${error.message}`
          );
        } else {
          logger.error(
            `${req.method} ${cleanPathForMetric(
              req.url
            )} returned error message: ${error.message}`
          );
        }

        res.status(500).end();
      }
    }
  };
}
