export const defaultErrorTexts = {
  accessDenied: "Du har ikke tilgang til å utføre denne handlingen.",
  generalError: "Det skjedde en uventet feil. Vennligst prøv igjen senere.",
  networkError: "Vi har problemer med nettet, prøv igjen senere.",
  loginRequired: "Handlingen krever at du logger på.",
};

export enum ErrorType {
  ACCESS_DENIED = "ACCESS_DENIED",
  GENERAL_ERROR = "GENERAL_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  LOGIN_REQUIRED = "LOGIN_REQUIRED",
}

export class ApiErrorException extends Error {
  constructor(
    public readonly error: ApiError,
    public readonly code?: number,
  ) {
    super(error.message);
  }
}

export interface ApiError {
  type: ErrorType;
  message: string;
  defaultErrorMsg: string;
}

export const generalError = (message?: string): ApiError => ({
  type: ErrorType.GENERAL_ERROR,
  message: message || defaultErrorTexts.generalError,
  defaultErrorMsg: defaultErrorTexts.generalError,
});

export const loginRequiredError = (message?: string): ApiError => ({
  type: ErrorType.LOGIN_REQUIRED,
  message: message || defaultErrorTexts.loginRequired,
  defaultErrorMsg: defaultErrorTexts.loginRequired,
});

export const accessDeniedError = (message?: string): ApiError => {
  return {
    type: ErrorType.ACCESS_DENIED,
    message: message || defaultErrorTexts.accessDenied,
    defaultErrorMsg: defaultErrorTexts.accessDenied,
  };
};

export const networkError = (message?: string): ApiError => ({
  type: ErrorType.NETWORK_ERROR,
  message: message || defaultErrorTexts.networkError,
  defaultErrorMsg: defaultErrorTexts.networkError,
});
