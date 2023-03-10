import axios, { AxiosError, ResponseType } from "axios";
import {
  accessDeniedError,
  ApiErrorException,
  generalError,
  loginRequiredError,
  networkError,
} from "./errors";
import { loginUser } from "../../utils/urlUtils";
import { displayTestScenarioSelector } from "../../environments/publicEnv";
import { v4 as uuidv4 } from "uuid";

interface AxiosOptions {
  accessToken?: string;
  responseType?: ResponseType;
  personIdent?: string;
  orgnummer?: string;
}

export const AUTHORIZATION_HEADER = "Authorization";
export const NAV_PERSONIDENT_HEADER = "nav-personident";
export const ORGNUMMER_HEADER = "orgnummer";
export const TEST_SESSION_ID = "testscenario-session-id";

const defaultRequestHeaders = (
  options?: AxiosOptions
): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.accessToken) {
    headers[AUTHORIZATION_HEADER] = `Bearer ${options.accessToken}`;
  }

  if (options?.personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = options?.personIdent;
  }

  if (options?.orgnummer) {
    headers[ORGNUMMER_HEADER] = options?.orgnummer;
  }

  if (displayTestScenarioSelector && typeof window !== "undefined") {
    let sessionId = localStorage.getItem(TEST_SESSION_ID);
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem(TEST_SESSION_ID, sessionId);
    }
    headers[TEST_SESSION_ID] = sessionId;
  }

  return headers;
};

function handleAxiosError(error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      case 401: {
        loginUser();
        throw new ApiErrorException(
          loginRequiredError(),
          error.response.status
        );
      }
      case 403: {
        throw new ApiErrorException(accessDeniedError(), error.response.status);
      }
      default: {
        throw new ApiErrorException(
          generalError(error.message),
          error.response.status
        );
      }
    }
  } else if (error.request) {
    throw new ApiErrorException(networkError(error.message));
  } else {
    throw new ApiErrorException(generalError(error.message));
  }
}

export const get = <ResponseData>(
  url: string,
  options?: AxiosOptions
): Promise<ResponseData> => {
  return axios
    .get(url, {
      headers: defaultRequestHeaders(options),
      responseType: options?.responseType,
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error.message), error.code);
      }
    });
};

export const post = <ResponseData>(
  url: string,
  data?: unknown,
  options?: AxiosOptions
): Promise<ResponseData> => {
  return axios
    .post(url, data, {
      headers: defaultRequestHeaders(options),
      responseType: options?.responseType,
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error.message), error.code);
      }
    });
};
