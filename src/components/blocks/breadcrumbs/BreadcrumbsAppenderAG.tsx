import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { createBreadcrumbsAG } from "./index";
import { useNarmesteLederId } from "../../../hooks/routeHooks";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";

export const BreadcrumbsAppenderAG = (): ReactElement => {
  const { pathname } = useRouter();
  const sykmeldtInfo = useDineSykmeldte();
  const narmestelederId = useNarmesteLederId();

  useEffect(() => {
    if (narmestelederId && sykmeldtInfo.data?.navn) {
      setBreadcrumbs(
        createBreadcrumbsAG(pathname, sykmeldtInfo.data?.navn, narmestelederId),
      );
    }
  }, [sykmeldtInfo.data?.navn, narmestelederId, pathname]);

  return <></>;
};
