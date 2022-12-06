import { Options } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ApiErrorException,
  defaultErrorTexts,
  ErrorType,
} from "api/axios/errors";
import { logger } from "@navikt/next-logger";

export const errorHandler: Options<NextApiRequest, NextApiResponse> = {
  onError: (
    err: ApiErrorException,
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    logger.error(
      `API request failed: ${err.error.type} - ${err.error.message}`,
      err.error
    );

    if (err.error) {
      switch (err.error.type) {
        case ErrorType.LOGIN_REQUIRED: {
          return res.status(401).end(err.error.defaultErrorMsg);
        }
        default:
          return res.status(500).end(err.error.defaultErrorMsg);
      }
    }

    return res.status(500).end(defaultErrorTexts.generalError);
  },
};
