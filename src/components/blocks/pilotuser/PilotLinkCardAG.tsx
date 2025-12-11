import { useIsPilotAG } from "../../../api/queries/arbeidsgiver/pilotQueriesAG";
import { nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { useNarmesteLederId } from "../../../hooks/routeHooks";
import { LinkCard } from "@navikt/ds-react";
import { ClipboardLinkIcon } from "@navikt/aksel-icons";

export const PilotLinkCardAG = () => {
  const isPilotUserQuery = useIsPilotAG();
  const narmesteLederId = useNarmesteLederId();

  if (
    isPilotUserQuery.isSuccess &&
    isPilotUserQuery.data == true &&
    narmesteLederId
  ) {
    return (
      <LinkCard className="mb-6 bg-[#E6F1F8]">
        <LinkCard.Icon>
          <ClipboardLinkIcon fontSize="2rem" />
        </LinkCard.Icon>
        <LinkCard.Title>
          <LinkCard.Anchor href={`${nyOppfolgingsplanRoot}/${narmesteLederId}`}>
            Vil du prøve vår nye løsning for oppfølgingsplaner?
          </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          Vi har laget en ny oppfølgingsplan som nå er tilgjengelig for dere som
          bor i Stord. <br /> Klikk her for å prøve den!
        </LinkCard.Description>
      </LinkCard>
    );
  }

  return false;
};
