import { ReactElement } from "react";
import { Button, Chat } from "@navikt/ds-react";
import { hentAktoerNavnInitialer } from "../../../utils/stringUtils";
import { getFullDateFormat } from "../../../utils/dateUtils";
import { useSlettKommentar } from "../../../api/queries/oppfolgingsplan/tiltakQueries";
import { Kommentar } from "../../../types/oppfolgingsplan";
import { useAudience } from "../../../hooks/routeHooks";
import {
  aktorHarOpprettetElement,
  getAktorNavn,
} from "../../../utils/textContextUtils";

interface Props {
  arbeidstakerFnr: string;
  tiltakId: number;
  kommentarer?: Kommentar[] | null;
}

export const Dialog = ({
  arbeidstakerFnr,
  tiltakId,
  kommentarer,
}: Props): ReactElement | null => {
  const { isAudienceSykmeldt } = useAudience();
  const slettKommentar = useSlettKommentar();

  if (!kommentarer) return null;

  const alleKommentarer = kommentarer
    .sort((k1, k2) => k2.id - k1.id)
    .map((kommentar, index) => {
      const isAktorsKommentar = aktorHarOpprettetElement(
        isAudienceSykmeldt,
        arbeidstakerFnr,
        kommentar.opprettetAv.fnr,
      );

      return (
        <Chat
          className="mb-4"
          key={index}
          avatar={hentAktoerNavnInitialer(
            kommentar.opprettetAv.navn,
            isAudienceSykmeldt,
          )}
          name={getAktorNavn(isAudienceSykmeldt, kommentar.opprettetAv.navn)}
          timestamp={getFullDateFormat(kommentar.opprettetTidspunkt)}
          position={isAktorsKommentar ? "right" : "left"}
        >
          <Chat.Bubble>
            <div className="flex flex-col">
              {kommentar.tekst}
              {isAktorsKommentar && (
                <Button
                  className="flex self-end"
                  variant="tertiary"
                  loading={slettKommentar.isPending}
                  onClick={() =>
                    slettKommentar.mutateAsync({
                      tiltakId: tiltakId,
                      kommentarId: kommentar.id,
                    })
                  }
                >
                  Slett
                </Button>
              )}
            </div>
          </Chat.Bubble>
        </Chat>
      );
    });

  return <div>{alleKommentarer}</div>;
};
