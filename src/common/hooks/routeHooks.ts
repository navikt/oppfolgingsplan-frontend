import { useRouter } from "next/router";

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

