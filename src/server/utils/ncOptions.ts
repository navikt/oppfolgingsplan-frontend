import { Options } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import serverLogger from "@/server/utils/serverLogger";
import {
  ApiErrorException,
  defaultErrorTexts,
  ErrorType,
} from "@/common/api/axios/errors";

export const ncOptions: Options<NextApiRequest, NextApiResponse> = {
  onError: (
    err: ApiErrorException,
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    serverLogger.error(
      err,
      err.error && err.error.type
        ? "Api request failed: ".concat(err.error.type.toString())
        : "Api request failed"
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
