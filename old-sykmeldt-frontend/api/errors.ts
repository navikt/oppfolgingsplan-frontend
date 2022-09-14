export const defaultErrorTexts = {
  accessDenied: 'Du har ikke tilgang til å utføre denne handlingen.',
  generalError: 'Det skjedde en uventet feil. Vennligst prøv igjen senere.',
  networkError: 'Vi har problemer med nettet, prøv igjen senere.',
  loginRequired: 'Handlingen krever at du logger på.',
};

export enum ErrorType {
  ACCESS_DENIED = 'ACCESS_DENIED',
  GENERAL_ERROR = 'GENERAL_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  LOGIN_REQUIRED = 'LOGIN_REQUIRED',
}

export class ApiErrorException extends Error {
  constructor(public readonly error: ApiError, public readonly code?: number) {
    super(error.message);
  }
}

export interface ApiError {
  type: ErrorType;
  message: string;
  defaultErrorMsg: string;
}

export const generalError = (error: Error): ApiError => ({
  type: ErrorType.GENERAL_ERROR,
  message: error.message,
  defaultErrorMsg: defaultErrorTexts.generalError,
});

export const loginRequiredError = (error: Error): ApiError => ({
  type: ErrorType.LOGIN_REQUIRED,
  message: error.message,
  defaultErrorMsg: defaultErrorTexts.loginRequired,
});

export const accessDeniedError = (error: Error): ApiError => {
  return {
    type: ErrorType.ACCESS_DENIED,
    message: error.message,
    defaultErrorMsg: defaultErrorTexts.accessDenied,
  };
};

export const networkError = (error: Error): ApiError => ({
  type: ErrorType.NETWORK_ERROR,
  message: error.message,
  defaultErrorMsg: defaultErrorTexts.networkError,
});
