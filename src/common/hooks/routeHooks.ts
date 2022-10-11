import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export type Audience = "Sykmeldt" | "Arbeidsgiver";

export interface IUseAudience {
  audience: Audience;
  isAudienceSykmeldt: boolean;
}

export const useAudience = (): IUseAudience => {
  const router = useRouter();

  const isSykmeldt = router.pathname.startsWith("/sykmeldt");

  return isSykmeldt
    ? {
        audience: "Sykmeldt",
        isAudienceSykmeldt: true,
      }
    : {
        audience: "Arbeidsgiver",
        isAudienceSykmeldt: false,
      };
};

export const useLandingUrl = (): string => {
  const router = useRouter();
  const { isAudienceSykmeldt } = useAudience();
  const { narmestelederid } = router.query;

  if (isAudienceSykmeldt) {
    return "/sykmeldt";
  } else {
    return `/arbeidsgiver/${narmestelederid}`;
  }
};

export const useApiBasePath = (): string => {
  const router = useRouter();
  const { isAudienceSykmeldt } = useAudience();

  if (isAudienceSykmeldt) {
    return `${router.basePath}/api/sykmeldt`;
  } else {
    return `${router.basePath}/api/arbeidsgiver`;
  }
};

interface IParams extends ParsedUrlQuery {
  oppfolgingsdialogId: string;
}

export const useOppfolgingsplanRouteId = (): number => {
  const router = useRouter();
  const { oppfolgingsdialogId } = router.query as IParams;
  return Number(oppfolgingsdialogId);
};

export const useOppfolgingsplanBasePath = (): string => {
  const landingUrl = useLandingUrl();
  const oppfolgingsplanRouteId = useOppfolgingsplanRouteId();

  return `${landingUrl}/${oppfolgingsplanRouteId}`;
};

export const useOppfolgingsplanUrl = (
  oppfolgingsplanId: number,
  page: "arbeidsoppgaver" | "tiltak" | "seplanen" | "godkjenning"
) => {
  const landingPage = useLandingUrl();
  switch (page) {
    case "arbeidsoppgaver":
    case "tiltak":
    case "seplanen":
    case "godkjenning":
      return `${landingPage}/${oppfolgingsplanId}/${page}`;
    default:
      return landingPage;
  }
};
