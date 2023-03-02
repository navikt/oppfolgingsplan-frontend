import React, { useEffect } from "react";
import ArbeidsgiverSkjemaForm from "./ArbeidsgiverSkjema";
import BaserTidligereSkjema from "./BaserTidligereSkjema";
import { Modal } from "@navikt/ds-react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "../../../utils/sykmeldingUtils";
import styled from "styled-components";
import { useOpprettOppfolgingsplanSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { finnNyesteTidligereOppfolgingsplanMedVirksomhet } from "../../../utils/oppfolgingplanUtils";
import Feilmelding from "../../../components/blocks/error/Feilmelding";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { useKopierOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

const FormContainer = styled.div`
  padding: 2rem;
`;

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  visOpprettModal: boolean;

  setVisOpprettModal(vis: boolean): void;
}

const OpprettModalSM = ({
  oppfolgingsplaner,
  arbeidsgivere,
  visOpprettModal,
  setVisOpprettModal,
}: Props) => {
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanSM();
  const kopierOppfolgingsplan = useKopierOppfolgingsplan();

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("body");
    }
  }, []);

  const manglerNarmesteLeder =
    arbeidsgivere.length === 1 && !arbeidsgivere[0].harNaermesteLeder;

  const opprett = (kopierTidligerePlan: boolean, virksomhetsnummer: string) => {
    if (kopierTidligerePlan) {
      const oppfolgingsplan = finnNyesteTidligereOppfolgingsplanMedVirksomhet(
        oppfolgingsplaner,
        virksomhetsnummer
      );
      if (oppfolgingsplan) {
        kopierOppfolgingsplan.mutate(oppfolgingsplan.id);
      } else {
        //Om det skjedde noe rart og man ikke fikk opp den tidligere planen, så bare lag en ny.
        opprettOppfolgingsplan.mutate(virksomhetsnummer);
      }
    } else {
      opprettOppfolgingsplan.mutate(virksomhetsnummer);
    }
  };

  return (
    <Modal
      open={visOpprettModal}
      aria-label="Opprett oppfølgingsplan"
      onClose={() => {
        setVisOpprettModal(false);
      }}
    >
      <FormContainer>
        <Modal.Content>
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
            } else if (arbeidsgivere.length > 1) {
              return (
                <ArbeidsgiverSkjemaForm
                  arbeidsgivere={arbeidsgivere}
                  oppfolgingsplaner={oppfolgingsplaner}
                  isSubmitting={opprettOppfolgingsplan.isLoading}
                  handleSubmit={(
                    kopierTidligerePlan: boolean,
                    virksomhetsnummer: string
                  ) => {
                    opprett(kopierTidligerePlan, virksomhetsnummer);
                  }}
                  handleClose={() => setVisOpprettModal(false)}
                />
              );
            } else {
              return (
                <BaserTidligereSkjema
                  isLoading={opprettOppfolgingsplan.isLoading}
                  onSubmit={(kopierTidligerePlan) =>
                    opprett(
                      kopierTidligerePlan,
                      arbeidsgivere[0].virksomhetsnummer
                    )
                  }
                  handleClose={() => setVisOpprettModal(false)}
                />
              );
            }
          })()}
        </Modal.Content>
      </FormContainer>
    </Modal>
  );
};

export default OpprettModalSM;
