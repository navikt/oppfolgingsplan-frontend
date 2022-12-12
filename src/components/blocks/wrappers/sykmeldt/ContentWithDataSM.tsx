import { useTilgangSM } from "../../../../api/queries/sykmeldt/tilgangQueriesSM";
import { useOppfolgingsplanerSM } from "../../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "../../../../api/queries/sykmeldt/narmesteLedereQueriesSM";
import React, { ReactNode } from "react";
import { SpacedDiv } from "../SpacedDiv";
import Feilmelding from "../../error/Feilmelding";
import { AdresseSperreInfoBoks } from "../../infoboks/AdresseSperreInfoBoks";
import AppSpinner from "../../spinner/AppSpinner";

interface Props {
  children: ReactNode;
}

export const ContentWithDataSM = ({ children }: Props) => {
  const tilgang = useTilgangSM();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  if (
    oppfolgingsplaner.isError ||
    sykmeldinger.isError ||
    tilgang.isError ||
    narmesteLedere.isError
  ) {
    return (
      <SpacedDiv>
        <Feilmelding
          title="Beklager, vi fikk en teknisk feil"
          description="Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere."
        />
      </SpacedDiv>
    );
  } else if (
    !sykmeldinger.isError &&
    (tilgang.fetchStatus == "fetching" ||
      oppfolgingsplaner.isLoading ||
      sykmeldinger.isLoading ||
      narmesteLedere.fetchStatus == "fetching")
  ) {
    return <AppSpinner />;
  } else if (tilgang.data && !tilgang.data.harTilgang) {
    return <AdresseSperreInfoBoks />;
  } else {
    return <>{children}</>;
  }
};
