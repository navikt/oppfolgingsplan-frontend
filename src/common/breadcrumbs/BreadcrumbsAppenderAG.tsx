import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { createBreadcrumbsAG } from "@/common/breadcrumbs/index";

export const BreadcrumbsAppenderAG = (): ReactElement => {
  // const { pathname } = useRouter();
  // const narmestelederId = useNarmesteLederId();
  // const dialogmoteData = useDialogmoteDataAG();
  // const sykmeldtName = dialogmoteData.data?.sykmeldt?.navn;
  //
  // useEffect(() => {
  //   if (narmestelederId && sykmeldtName) {
  //     setBreadcrumbs(
  //       createBreadcrumbsAG(pathname, sykmeldtName, narmestelederId)
  //     );
  //   }
  // }, [sykmeldtName, narmestelederId, pathname]);


  //Todo
  return <></>;
};
