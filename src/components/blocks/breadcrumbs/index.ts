import {
  landingBreadcrumbAG,
  landingBreadcrumbSM,
  oppfolgingsplanBreadcrumbAG,
  oppfolgingsplanBreadcrumbSM,
} from "./breadcrumbPaths";

export function createBreadcrumbsAG(
  pathname: string,
  sykmeldtName: string,
  narmestelederid: string,
) {
  switch (pathname) {
    case "/arbeidsgiver/[narmestelederid]":
      return landingBreadcrumbAG(sykmeldtName, narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/[oppfolgingsdialogId]/arbeidsoppgaver":
    case "/arbeidsgiver/[narmestelederid]/[oppfolgingsdialogId]/tiltak":
    case "/arbeidsgiver/[narmestelederid]/[oppfolgingsdialogId]/seplanen":
    case "/arbeidsgiver/[narmestelederid]/[oppfolgingsdialogId]":
      return oppfolgingsplanBreadcrumbAG(sykmeldtName, narmestelederid);
    default:
      return [];
  }
}

export function createBreadcrumbsSM(pathname: string) {
  switch (pathname) {
    case "/sykmeldt":
      return landingBreadcrumbSM();
    case "/sykmeldt/[oppfolgingsdialogId]/arbeidsoppgaver":
    case "/sykmeldt/[oppfolgingsdialogId]/tiltak":
    case "/sykmeldt/[oppfolgingsdialogId]/seplanen":
    case "/sykmeldt/[oppfolgingsdialogId]":
      return oppfolgingsplanBreadcrumbSM();
    default:
      return [];
  }
}
