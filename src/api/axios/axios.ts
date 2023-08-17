import axios, { AxiosError, ResponseType } from "axios";
import { loginUser } from "../../utils/urlUtils";
import { displayTestScenarioSelector } from "../../environments/publicEnv";
import { v4 as uuidv4 } from "uuid";
import { logError, RequestOrigin } from "../../utils/logUtils";
import axiosBetterStacktrace from "axios-better-stacktrace";

axiosBetterStacktrace(axios);

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

function handleError(error: AxiosError, requestOrigin: RequestOrigin) {
  if (error.response && error.response.status === 401) {
    loginUser();
  } else {
    logError(error, requestOrigin);
    throw error;
  }
}

export const get = <ResponseData>(
  url: string,
  requestOrigin: RequestOrigin,
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
      handleError(error, requestOrigin);
    });
};

export const post = <ResponseData>(
  url: string,
  requestOrigin: RequestOrigin,
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
      handleError(error, requestOrigin);
    });
};
