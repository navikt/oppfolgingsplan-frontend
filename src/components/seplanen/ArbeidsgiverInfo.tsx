import { ContentWrapper } from "./ContentWrapper";
import { Heading } from "@navikt/ds-react";
import { texts } from "./texts";
import { TextWithLabel } from "./TextWithLabel";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";
import { VirksomhetDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  narmesteLeder?: NarmesteLederDTO | null;
  virksomhet?: VirksomhetDTO | null;
}

export const ArbeidsgiverInfo = ({ narmesteLeder, virksomhet }: Props) => {
  if (!narmesteLeder && !virksomhet) {
    return null;
  }

  return (
    <ContentWrapper>
      <Heading level="3" size="medium" spacing={true}>
        {texts.arbeidsgiverInfo.title}
      </Heading>
      <TextWithLabel
        text={virksomhet?.navn}
        label={texts.arbeidsgiverInfo.labels.virksomhetsnavn}
      />
      <TextWithLabel
        text={virksomhet?.virksomhetsnummer}
        label={texts.arbeidsgiverInfo.labels.virksomhetsnummer}
        spacing={true}
      />

      {narmesteLeder && (
        <>
          <b>{texts.arbeidsgiverInfo.labels.naermesteLeder.heading}</b>
          <TextWithLabel
            text={narmesteLeder?.navn}
            label={texts.arbeidsgiverInfo.labels.naermesteLeder.name}
          />
          <TextWithLabel
            text={narmesteLeder?.tlf}
            label={texts.arbeidsgiverInfo.labels.naermesteLeder.telephone}
          />
          <TextWithLabel
            text={narmesteLeder?.epost}
            label={texts.arbeidsgiverInfo.labels.naermesteLeder.email}
          />
        </>
      )}
    </ContentWrapper>
  );
};
