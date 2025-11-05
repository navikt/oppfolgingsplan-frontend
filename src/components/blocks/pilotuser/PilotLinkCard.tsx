import { LinkCard } from "@navikt/ds-react";
import { BandageIcon } from "@navikt/aksel-icons";

interface Props {
  url: string;
}

export const PilotLinkCard = ({ url }: Props) => {
  return (
    <LinkCard className="mb-6">
      <LinkCard.Icon>
        <BandageIcon fontSize="2rem" />
      </LinkCard.Icon>
      <LinkCard.Title>
        <LinkCard.Anchor href={url}>
          Vil du prøve den nye oppfølgingsplanen?
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        Vi har nylig lansert en ny oppfølgingsplan. Klikk her for å prøve den!
      </LinkCard.Description>
    </LinkCard>
  );
};
