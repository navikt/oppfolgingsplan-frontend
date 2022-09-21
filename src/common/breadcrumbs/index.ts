import {
  aktivOppfolgingsplanBreadcrumbSM,
  landingBreadcrumbAG,
  landingBreadcrumbSM,
  motebehovBreadcrumbAG,
  moteinnkallingBreadcrumbAG,
  referatBreadcrumbAG,
} from "./breadcrumbPaths";

export function createBreadcrumbsAG(
  pathname: string,
  sykmeldtName: string,
  narmestelederid: string
) {
  switch (pathname) {
    case "/arbeidsgiver/[narmestelederid]":
      return landingBreadcrumbAG(sykmeldtName, narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]":
      return referatBreadcrumbAG(sykmeldtName, narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/moteinnkalling":
      return moteinnkallingBreadcrumbAG(sykmeldtName, narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/motebehov/meld":
    case "/arbeidsgiver/[narmestelederid]/motebehov/svar":
      return motebehovBreadcrumbAG(sykmeldtName, narmestelederid);
    default:
      return [];
  }
}

export function createBreadcrumbsSM(pathname: string) {
  switch (pathname) {
    case "/sykmeldt":
      return landingBreadcrumbSM();
    case "/sykmeldt/[oppfolgingsdialogId]":
      return aktivOppfolgingsplanBreadcrumbSM();
    default:
      return [];
  }
}
