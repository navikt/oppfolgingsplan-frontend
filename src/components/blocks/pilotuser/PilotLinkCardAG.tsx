import { useIsPilotAG } from "../../../api/queries/arbeidsgiver/pilotQueriesAG";
import { nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { useNarmesteLederId } from "../../../hooks/routeHooks";
import { LinkCard } from "@navikt/ds-react";
import { RocketFillIcon } from "@navikt/aksel-icons";

export const PilotLinkCardAG = () => {
  const isPilotUserQuery = useIsPilotAG();
  const narmesteLederId = useNarmesteLederId();

  if (
    isPilotUserQuery.isSuccess &&
    isPilotUserQuery.data == true &&
    narmesteLederId
  ) {
    return (
      <LinkCard
        style={{
          backgroundColor: "var(--ax-bg-info-soft)",
          marginBottom: "1.5rem",
        }}
      >
        <LinkCard.Icon>
          <RocketFillIcon fontSize="2rem" aria-hidden />
        </LinkCard.Icon>
        <LinkCard.Title>
          <LinkCard.Anchor href={`${nyOppfolgingsplanRoot}/${narmesteLederId}`}>
            Vil du prøve vår nye løsning for oppfølgingsplaner?
          </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          Vi har laget en ny oppfølgingsplan som nå er tilgjengelig for dere som
          bor på Vestlandet. Klikk her for å prøve den!
        </LinkCard.Description>
      </LinkCard>
    );
  }

  return false;
};
