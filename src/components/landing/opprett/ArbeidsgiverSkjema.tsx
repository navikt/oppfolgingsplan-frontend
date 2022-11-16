import React, { useState } from "react";
import {
  erAktivOppfolgingsplanOpprettetMedArbeidsgiver,
  erOppfolgingsplanOpprettbarMedArbeidsgiver,
  hentAktivOppfolgingsplanOpprettetMedArbeidsgiver,
} from "utils/oppfolgingplanUtils";
import { Alert, BodyShort, Button, Heading, Select } from "@navikt/ds-react";
import Link from "next/link";
import { ArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { useLandingUrl } from "hooks/routeHooks";
import styled from "styled-components";
import { Row } from "components/blocks/wrappers/Row";

const texts = {
  arbeidsgiverSkjema: {
    question: "Hvilken arbeidsgiver skal du lage en plan med?",
    buttonSubmit: "VELG ARBEIDSGIVER",
  },
  velgArbeidsgiverUndertekst: {
    alreadyCreatedPlan:
      "Du har allerede en oppfølgingsplan med denne arbeidsgiveren.",
    noLeader:
      "Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn.",
    leader: "Nærmeste leder er ",
  },
};

const SpacedDiv = styled.div`
  margin-bottom: 1rem;
`;

const SpacedSelect = styled(Select)`
  margin-bottom: 1rem;
`;

interface ArbeidsgiverUndertekstProps {
  oppfolgingsplaner: Oppfolgingsplan[];
  arbeidsgiver: ArbeidsgivereForGyldigeSykmeldinger;
}

export const VelgArbeidsgiverUndertekst = ({
  oppfolgingsplaner,
  arbeidsgiver,
}: ArbeidsgiverUndertekstProps) => {
  const landingUrl = useLandingUrl();

  if (
    erAktivOppfolgingsplanOpprettetMedArbeidsgiver(
      oppfolgingsplaner,
      arbeidsgiver.virksomhetsnummer
    )
  ) {
    const oppfolgingsdialog = hentAktivOppfolgingsplanOpprettetMedArbeidsgiver(
      oppfolgingsplaner,
      arbeidsgiver.virksomhetsnummer
    );
    return (
      <Alert variant="info">
        <div>{texts.velgArbeidsgiverUndertekst.alreadyCreatedPlan}</div>
        <Link
          className="lenke"
          href={`${landingUrl}/${oppfolgingsdialog.id}/arbeidsoppgaver`}
        >
          Gå til planen
        </Link>
      </Alert>
    );
  } else if (!arbeidsgiver.harNaermesteLeder) {
    return (
      <Alert variant="warning">
        {texts.velgArbeidsgiverUndertekst.noLeader}
      </Alert>
    );
  } else if (arbeidsgiver.naermesteLeder) {
    return (
      <BodyShort size={"small"} spacing>
        {`${texts.velgArbeidsgiverUndertekst.leader}${arbeidsgiver.naermesteLeder}`}
      </BodyShort>
    );
  }
  return null;
};

interface ArbeidsgiverSkjemaProps {
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  oppfolgingsplaner: Oppfolgingsplan[];
  isSubmitting: boolean;

  handleClose(): void;

  handleSubmit(virksomhetsnummer: string): void;
}

export const ArbeidsgiverSkjema = ({
  arbeidsgivere,
  oppfolgingsplaner,
  isSubmitting,
  handleClose,
  handleSubmit,
}: ArbeidsgiverSkjemaProps) => {
  const [selectedVirksomhetsnummer, setSelectedVirksomhetsnummer] = useState<
    string | null
  >(null);

  const selectedArbeidsgiver = arbeidsgivere.find(
    (ag) => ag.virksomhetsnummer == selectedVirksomhetsnummer
  );

  return (
    <>
      <Heading spacing size={"medium"} level={"2"}>
        {texts.arbeidsgiverSkjema.question}
      </Heading>

      <SpacedSelect
        label={texts.arbeidsgiverSkjema.question}
        hideLabel={true}
        onChange={(e) => setSelectedVirksomhetsnummer(e.target.value)}
      >
        <option value="">Velg arbeidsgiver</option>
        {arbeidsgivere.map((arbeidsgiver, index) => {
          return (
            <option key={index} value={arbeidsgiver.virksomhetsnummer}>
              {arbeidsgiver.navn}
            </option>
          );
        })}
      </SpacedSelect>

      {selectedVirksomhetsnummer && (
        <SpacedDiv>
          <VelgArbeidsgiverUndertekst
            oppfolgingsplaner={oppfolgingsplaner}
            arbeidsgiver={selectedArbeidsgiver!!}
          />
        </SpacedDiv>
      )}

      <Row>
        <Button
          variant={"primary"}
          loading={isSubmitting}
          disabled={
            !selectedVirksomhetsnummer ||
            !erOppfolgingsplanOpprettbarMedArbeidsgiver(
              oppfolgingsplaner,
              selectedArbeidsgiver!!
            )
          }
          onClick={() => handleSubmit(selectedVirksomhetsnummer!!)}
        >
          {texts.arbeidsgiverSkjema.buttonSubmit}
        </Button>
        <Button variant={"tertiary"} onClick={handleClose}>
          Avbryt
        </Button>
      </Row>
    </>
  );
};

export default ArbeidsgiverSkjema;
