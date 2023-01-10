import Feilmelding from "components/blocks/error/Feilmelding";
import React, { useState } from "react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";
import ArbeidsgiverSkjema from "./ArbeidsgiverSkjema";
import BaserTidligereSkjema from "./BaserTidligereSkjema";
import { Oppfolgingsplan } from "types/oppfolgingsplan";

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  isLoading: boolean;

  handleClose(): void;

  onSubmit(kopierPlan: boolean, virksomhetsnummer: string): void;
}

const OpprettModalContentSM = ({
  oppfolgingsplaner,
  arbeidsgivere,
  isLoading,
  handleClose,
  onSubmit,
}: Props) => {
  const [valgtVirksomhetsnummer, setValgtVirksomhetsnummer] =
    useState<string>();
  const manglerNarmesteLeder =
    arbeidsgivere.length === 1 && !arbeidsgivere[0].harNaermesteLeder;
  if (arbeidsgivere.length === 1) {
    setValgtVirksomhetsnummer(arbeidsgivere[0].virksomhetsnummer);
  }

  return (
    <>
      {(() => {
        if (manglerNarmesteLeder) {
          return (
            <Feilmelding
              title={"Kan ikke opprette ny plan"}
              description={
                "Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn"
              }
            />
          );
        } else if (!valgtVirksomhetsnummer) {
          return (
            <ArbeidsgiverSkjema
              arbeidsgivere={arbeidsgivere}
              oppfolgingsplaner={oppfolgingsplaner}
              isSubmitting={isLoading}
              handleSubmit={(virksomhetsnummer: string) => {
                setValgtVirksomhetsnummer(virksomhetsnummer);
              }}
              handleClose={handleClose}
            />
          );
        } else {
          return (
            <BaserTidligereSkjema
              isLoading={isLoading}
              onSubmit={(kopierplan) =>
                onSubmit(kopierplan, valgtVirksomhetsnummer)
              }
              handleClose={handleClose}
            />
          );
        }
      })()}
    </>
  );
};

export default OpprettModalContentSM;
