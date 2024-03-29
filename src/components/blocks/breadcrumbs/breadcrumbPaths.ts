import {
  basePath,
  dineSykemeldteRoot,
  dittSykefravarRoot,
  minSideRoot,
} from "../../../environments/publicEnv";

// Breadcrumbs for sykmeldt
export function baseBreadcrumbSM() {
  return [
    {
      url: minSideRoot,
      title: "Min side",
    },
    {
      url: dittSykefravarRoot,
      title: "Ditt sykefravær",
    },
  ];
}

export function landingBreadcrumbSM() {
  return [
    ...baseBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`,
      title: "Oppfølgingsplaner",
    },
  ];
}

export function oppfolgingsplanBreadcrumbSM() {
  return [
    ...landingBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`, //url-field is not in use but the api requires a non-empty string
      title: "Oppfølgingsplan",
    },
  ];
}

// Breadcrumbs for arbeidsgiver
export function dineSykemeldteBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string,
) {
  const dineSykemeldteBreadcrumb = {
    url: dineSykemeldteRoot,
    title: "Dine sykmeldte",
  };

  return [
    dineSykemeldteBreadcrumb,
    {
      url: `${dineSykemeldteRoot}/${narmestelederId}`,
      title: sykmeldtName,
    },
  ];
}

export function landingBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string,
) {
  return [
    ...dineSykemeldteBreadcrumbAG(sykmeldtName, narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`,
      title: "Oppfølgingsplaner",
    },
  ];
}

export function oppfolgingsplanBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string,
) {
  return [
    ...landingBreadcrumbAG(sykmeldtName, narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Oppfølgingsplan",
    },
  ];
}
