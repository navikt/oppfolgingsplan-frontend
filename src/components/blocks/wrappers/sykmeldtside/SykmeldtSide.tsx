import React, { ReactElement, ReactNode } from "react";
import { useOppfolgingsplanerSM } from "../../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "../../../../api/queries/sykmeldt/narmesteLedereQueriesSM";
import AppSpinner from "../../spinner/AppSpinner";
import { PageHeading } from "../../heading/PageHeading";
import styles from "./SykmeldtSide.module.css";

interface SideProps {
  title: string;
  heading: string;
  children: ReactNode;
}

const SykmeldtSide = ({
  title,
  heading,
  children,
}: SideProps): ReactElement => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  const PageContent = () => {
    if (
      oppfolgingsplaner.isLoading ||
      sykmeldinger.isLoading ||
      narmesteLedere.isFetching
    ) {
      return <AppSpinner />;
    } else {
      return (
        <>
          <PageHeading title={title} heading={heading} />
          {children}
        </>
      );
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <PageContent />
      </div>
    </div>
  );
};

export default SykmeldtSide;
