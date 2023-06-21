import React, { useState } from "react";
import {
  erAktivOppfolgingsplanOpprettetMedArbeidsgiver,
  erOppfolgingsplanOpprettbarMedArbeidsgiver,
  harTidligereOppfolgingsplanMedVirksomhet,
  hentAktivOppfolgingsplanOpprettetMedArbeidsgiver,
} from "../../../utils/oppfolgingplanUtils";
import {
  Alert,
  BodyShort,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Select,
} from "@navikt/ds-react";
import Link from "next/link";
import { ArbeidsgivereForGyldigeSykmeldinger } from "../../../utils/sykmeldingUtils";
import { useLandingUrl } from "../../../hooks/routeHooks";
import { Row } from "../../blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

const texts = {
  arbeidsgiverSkjema: {
    question: "Hvilken arbeidsgiver skal du lage en plan med?",
    optionValue: "Velg arbeidsgiver",
    buttonSubmit: "Velg arbeidsgiver",
  },
  velgArbeidsgiverUndertekst: {
    alreadyCreatedPlan:
      "Du har allerede en oppfølgingsplan med denne arbeidsgiveren.",
    noLeader:
      "Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn.",
    leader: "Nærmeste leder er ",
  },
  baserPaTidligereText: {
    question: "Ønsker du å basere den nye planen på den som gjaldt sist?",
    answer: {
      yes: "Ja, ta utgangspunkt i den tidligere planen",
      no: "Nei, start en ny plan der vi ikke har fylt ut noe",
    },
    buttonSubmit: "Start",
  },
};

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

  handleSubmit(kopierTidligerePlan: boolean, virksomhetsnummer: string): void;
}

export const ArbeidsgiverSkjema = ({
  arbeidsgivere,
  oppfolgingsplaner,
  isSubmitting,
  handleClose,
  handleSubmit,
}: ArbeidsgiverSkjemaProps) => {
  const [selectedVirksomhet, setSelectedVirksomhet] =
    useState<ArbeidsgivereForGyldigeSykmeldinger | null>(null);
  const [kopierTidligerePlan, setKopierTidligerePlan] = useState(false);

  return (
    <>
      <Heading spacing size={"medium"} level={"2"}>
        {texts.arbeidsgiverSkjema.question}
      </Heading>

      <Select
        className="pb-4"
        label={texts.arbeidsgiverSkjema.question}
        hideLabel={true}
        onChange={(e) =>
          setSelectedVirksomhet(
            arbeidsgivere.find(
              (ag) => ag.virksomhetsnummer === e.target.value
            ) ?? null
          )
        }
      >
        <option value="">{texts.arbeidsgiverSkjema.optionValue}</option>
        {arbeidsgivere.map((arbeidsgiver, index) => {
          return (
            <option key={index} value={arbeidsgiver.virksomhetsnummer}>
              {arbeidsgiver.navn}
            </option>
          );
        })}
      </Select>

      {selectedVirksomhet && (
        <>
          <div className="mb-10">
            <VelgArbeidsgiverUndertekst
              oppfolgingsplaner={oppfolgingsplaner}
              arbeidsgiver={selectedVirksomhet}
            />
          </div>
          {harTidligereOppfolgingsplanMedVirksomhet(
            oppfolgingsplaner,
            selectedVirksomhet.virksomhetsnummer
          ) &&
            !erAktivOppfolgingsplanOpprettetMedArbeidsgiver(
              oppfolgingsplaner,
              selectedVirksomhet.virksomhetsnummer
            ) && (
              <div className="mb-10">
                <RadioGroup
                  className="pb-4"
                  legend={texts.baserPaTidligereText.question}
                  onChange={(val: boolean) => setKopierTidligerePlan(val)}
                  value={kopierTidligerePlan}
                >
                  <Radio value={true}>
                    {texts.baserPaTidligereText.answer.yes}
                  </Radio>
                  <Radio value={false}>
                    {texts.baserPaTidligereText.answer.no}
                  </Radio>
                </RadioGroup>
              </div>
            )}
        </>
      )}

      <Row>
        {selectedVirksomhet &&
          harTidligereOppfolgingsplanMedVirksomhet(
            oppfolgingsplaner,
            selectedVirksomhet.virksomhetsnummer
          ) && (
            <Button
              variant={"primary"}
              onClick={() =>
                selectedVirksomhet?.virksomhetsnummer
                  ? handleSubmit(
                      kopierTidligerePlan,
                      selectedVirksomhet?.virksomhetsnummer
                    )
                  : {}
              }
              loading={isSubmitting}
              disabled={
                !selectedVirksomhet ||
                !erOppfolgingsplanOpprettbarMedArbeidsgiver(
                  oppfolgingsplaner,
                  selectedVirksomhet
                )
              }
            >
              {texts.baserPaTidligereText.buttonSubmit}
            </Button>
          )}

        {selectedVirksomhet &&
          !harTidligereOppfolgingsplanMedVirksomhet(
            oppfolgingsplaner,
            selectedVirksomhet.virksomhetsnummer
          ) && (
            <Button
              variant={"primary"}
              onClick={() =>
                selectedVirksomhet?.virksomhetsnummer
                  ? handleSubmit(false, selectedVirksomhet?.virksomhetsnummer)
                  : {}
              }
              loading={isSubmitting}
              disabled={
                !selectedVirksomhet ||
                !erOppfolgingsplanOpprettbarMedArbeidsgiver(
                  oppfolgingsplaner,
                  selectedVirksomhet
                )
              }
            >
              {texts.arbeidsgiverSkjema.buttonSubmit}
            </Button>
          )}

        <Button variant={"tertiary"} onClick={handleClose}>
          Avbryt
        </Button>
      </Row>
    </>
  );
};

export default ArbeidsgiverSkjema;
