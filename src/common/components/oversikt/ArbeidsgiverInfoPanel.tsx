import { PanelWrapper } from "@/common/components/oversikt/PanelWrapper";
import { BodyShort, Heading } from "@navikt/ds-react";
import { texts } from "@/common/components/oversikt/texts";
import { Virksomhet } from "../../../schema/oppfolgingsplanSchema";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";

interface Props {
  narmesteLeder?: NarmesteLeder | null;
  virksomhet?: Virksomhet | null;
}

export const ArbeidsgiverInfoPanel = ({ narmesteLeder, virksomhet }: Props) => {
  if (!narmesteLeder && !virksomhet) {
    return null;
  }

  return (
    <PanelWrapper>
      <Heading level="3" size="medium" spacing={true}>
        {texts.arbeidsgiverInfoPanel.title}
      </Heading>
      <BodyShort>{`${texts.arbeidsgiverInfoPanel.labels.virksomhetsnavn} ${virksomhet?.navn}`}</BodyShort>
      <BodyShort
        spacing={true}
      >{`${texts.arbeidsgiverInfoPanel.labels.virksomhetsnummer} ${virksomhet?.virksomhetsnummer}`}</BodyShort>

      {narmesteLeder && (
        <>
          <b>{texts.arbeidsgiverInfoPanel.labels.naermesteLeder.heading}</b>
          {narmesteLeder.navn && (
            <BodyShort>{`${texts.arbeidsgiverInfoPanel.labels.naermesteLeder.name} ${narmesteLeder.navn}`}</BodyShort>
          )}
          {narmesteLeder.tlf && (
            <BodyShort>{`${texts.arbeidsgiverInfoPanel.labels.naermesteLeder.telephone} ${narmesteLeder.tlf}`}</BodyShort>
          )}
          {narmesteLeder.epost && (
            <BodyShort
              spacing={true}
            >{`${texts.arbeidsgiverInfoPanel.labels.naermesteLeder.email} ${narmesteLeder.epost}`}</BodyShort>
          )}
        </>
      )}
    </PanelWrapper>
  );
};
