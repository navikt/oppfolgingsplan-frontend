import { useIsPilotSM } from "../../../api/queries/sykmeldt/pilotQueriesSM";
import { nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { LinkCard } from "@navikt/ds-react";
import { ClipboardLinkIcon } from "@navikt/aksel-icons";

export const PilotLinkCardSM = () => {
  const isPilotUserQuery = useIsPilotSM();

  if (isPilotUserQuery.isSuccess && isPilotUserQuery.data == true) {
    return (
      <LinkCard className="mb-6 bg-[#E6F1F8]">
        <LinkCard.Icon>
          <ClipboardLinkIcon fontSize="2rem" />
        </LinkCard.Icon>
        <LinkCard.Title>
          <LinkCard.Anchor href={`${nyOppfolgingsplanRoot}/sykmeldt`}>
            Vi har laget en ny oppfølgingsplan!
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
