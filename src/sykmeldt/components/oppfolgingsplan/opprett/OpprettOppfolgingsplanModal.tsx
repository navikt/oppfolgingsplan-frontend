import React, { useEffect } from "react";
import ArbeidsgiverSkjemaForm from "./ArbeidsgiverSkjema";
import BaserTidligereSkjema from "./BaserTidligereSkjema";
import { Modal } from "@navikt/ds-react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "@/common/utils/sykmeldingUtils";
import Feilmelding from "@/common/components/error/Feilmelding";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import styled from "styled-components";
import {
  useKopierOppfolgingsplanSM,
  useOpprettOppfolgingsplanSM,
} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldtFnr } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { finnNyesteTidligereOppfolgingsplanMedVirksomhet } from "@/common/utils/oppfolgingplanUtils";

const texts = {
  errorNoLeader: {
    title: "Kan ikke opprette ny plan",
    message:
      "Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn",
  },
  errorNoGodkjentPlan: {
    title: "Kan ikke opprette ny plan",
    message: "Fant ingen tidligere godkjent plan med virksomhet",
  },
};

const FormContainer = styled.div`
  padding: 2rem;
`;

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  visOpprettingModal: boolean;

  setVisOpprettingModal(vis: boolean): void;
}

const OpprettOppfolgingsplanModal = ({
  oppfolgingsplaner,
  arbeidsgivere,
  visOpprettingModal,
  setVisOpprettingModal,
}: Props) => {
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanSM();
  const kopierOppfolgingsplan = useKopierOppfolgingsplanSM();

  const sykmeldtFnr = useSykmeldtFnr();

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
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
        kopierOppfolgingsplan(oppfolgingsplan.id);
      } else {
        //Om det skjedde noe rart og man ikke fikk opp den tidligere planen, så bare lag en ny.
        opprettOppfolgingsplan({
          sykmeldtFnr: sykmeldtFnr!!,
          virksomhetsnummer: virksomhetsnummer,
        });
      }
    } else {
      opprettOppfolgingsplan({
        sykmeldtFnr: sykmeldtFnr!!,
        virksomhetsnummer: virksomhetsnummer,
      });
    }
  };

  return (
    <Modal
      open={visOpprettingModal}
      aria-label="Opprett oppfølgingsplan"
      onClose={() => {
        setVisOpprettingModal(false);
      }}
    >
      <FormContainer>
        <Modal.Content>
          {(() => {
            if (manglerNarmesteLeder) {
              return (
                <Feilmelding
                  title={texts.errorNoLeader.title}
                  description={texts.errorNoLeader.message}
                />
              );
            } else if (arbeidsgivere.length > 1) {
              return (
                <ArbeidsgiverSkjemaForm
                  arbeidsgivere={arbeidsgivere}
                  oppfolgingsplaner={oppfolgingsplaner}
                  handleSubmit={(virksomhetsnummer: string) => {
                    opprettOppfolgingsplan({
                      sykmeldtFnr: sykmeldtFnr!!,
                      virksomhetsnummer: virksomhetsnummer,
                    });
                    setVisOpprettingModal(false);
                  }}
                  handleClose={() => setVisOpprettingModal(false)}
                />
              );
            } else {
              return (
                <BaserTidligereSkjema
                  onSubmit={(kopierplan) =>
                    opprett(kopierplan, arbeidsgivere[0].virksomhetsnummer)
                  }
                  handleClose={() => setVisOpprettingModal(false)}
                />
              );
            }
          })()}
        </Modal.Content>
      </FormContainer>
    </Modal>
  );
};

export default OpprettOppfolgingsplanModal;
