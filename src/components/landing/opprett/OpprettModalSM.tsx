import React from "react";
import ArbeidsgiverSkjemaForm from "./ArbeidsgiverSkjema";
import BaserTidligereSkjema from "./BaserTidligereSkjema";
import { Modal } from "@navikt/ds-react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "../../../utils/sykmeldingUtils";
import { useOpprettOppfolgingsplanSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { finnNyesteTidligereOppfolgingsplanMedVirksomhet } from "../../../utils/oppfolgingplanUtils";
import Feilmelding from "../../../components/blocks/error/Feilmelding";
import { useKopierOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplaner: OppfolgingsplanDTO[];
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

  const manglerNarmesteLeder =
    arbeidsgivere.length === 1 && !arbeidsgivere[0].erAktivLederIVirksomhet;

  const opprett = (kopierTidligerePlan: boolean, virksomhetsnummer: string) => {
    if (kopierTidligerePlan) {
      const oppfolgingsplan = finnNyesteTidligereOppfolgingsplanMedVirksomhet(
        oppfolgingsplaner,
        virksomhetsnummer,
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

  const getHeaderText = () => {
    if (manglerNarmesteLeder) {
      return "Kan ikke opprette ny plan";
    } else if (arbeidsgivere.length > 1) {
      return "Hvilken arbeidsgiver skal du lage en plan med?";
    } else {
      return "Ønsker du å basere den nye planen på den som gjaldt sist?";
    }
  };

  const ModalContent = () => {
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
          isSubmitting={opprettOppfolgingsplan.isPending}
          handleSubmit={(
            kopierTidligerePlan: boolean,
            virksomhetsnummer: string,
          ) => {
            opprett(kopierTidligerePlan, virksomhetsnummer);
          }}
          handleClose={() => setVisOpprettModal(false)}
        />
      );
    } else {
      return (
        <BaserTidligereSkjema
          isLoading={opprettOppfolgingsplan.isPending}
          onSubmit={(kopierTidligerePlan) =>
            opprett(kopierTidligerePlan, arbeidsgivere[0].virksomhetsnummer)
          }
          handleClose={() => setVisOpprettModal(false)}
        />
      );
    }
  };

  return (
    <Modal
      open={visOpprettModal}
      aria-label="Opprett oppfølgingsplan"
      onClose={() => {
        setVisOpprettModal(false);
      }}
      header={{ heading: getHeaderText() }}
    >
      <Modal.Body>
        <ModalContent />
      </Modal.Body>
    </Modal>
  );
};

export default OpprettModalSM;
