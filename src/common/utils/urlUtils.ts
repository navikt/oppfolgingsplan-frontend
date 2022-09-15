export const isLocal = () => {
  return window.location.host.indexOf('localhost') > -1;
};

export const isPreProd = () => {
  return window.location.href.indexOf('www-gcp.dev') > -1;
};

export const isProd = () => {
  return window.location.href.indexOf('www.nav') > -1;
};

export const isLabs = () => {
  return window.location.href.indexOf('.labs.nais.') > -1;
};

export const getSykefravaerUrl = () => {
  return isLabs() ? process.env.SYKEFRAVAER_LABS_URL : process.env.REACT_APP_SYKEFRAVAER_ROOT;
};

export const loginUser = () => {
  if (typeof window === "undefined") return;

  window.location.href = `/syk/oppfolgingsplaner/oauth2/login?redirect=${window.location.pathname}`;
};
