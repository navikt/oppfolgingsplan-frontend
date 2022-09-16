import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { createBreadcrumbsSM } from "@/common/breadcrumbs/index";

export const BreadcrumbsAppenderSM = (): ReactElement => {
  const { pathname } = useRouter();

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbsSM(pathname));
  }, [pathname]);

  return <></>;
};
