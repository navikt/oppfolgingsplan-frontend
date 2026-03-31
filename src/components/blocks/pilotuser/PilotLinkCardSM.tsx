import { useIsPilotSM } from "../../../api/queries/sykmeldt/pilotQueriesSM";
import { nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { LinkCard } from "@navikt/ds-react";
import { RocketFillIcon } from "@navikt/aksel-icons";

export const PilotLinkCardSM = () => {
  const isPilotUserQuery = useIsPilotSM();

  if (isPilotUserQuery.isSuccess && isPilotUserQuery.data == true) {
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
          <LinkCard.Anchor href={`${nyOppfolgingsplanRoot}/sykmeldt`}>
            Prøv vår nye løsning for oppfølgingsplan!
          </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          På grunn av din geografiske lokasjon er du og din arbeidsgiver valgt
          ut til å prøve den nye planen. Klikk her for å gå til ny
          oppfølgingsplan.
        </LinkCard.Description>
      </LinkCard>
    );
  }

  return false;
};
