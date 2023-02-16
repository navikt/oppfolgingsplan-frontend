import { ReactElement } from "react";
import styled from "styled-components";
import { Button, Chat } from "@navikt/ds-react";
import { hentAktoerNavnInitialer } from "utils/stringUtils";
import { getFullDateFormat } from "utils/dateUtils";
import { useSlettKommentar } from "api/queries/oppfolgingsplan/tiltakQueries";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Kommentar } from "../../../types/oppfolgingsplan";
import { useAudience } from "../../../hooks/routeHooks";

interface Props {
  arbeidstakerFnr: string;
  tiltakId: number;
  kommentarer?: Kommentar[] | null;
}

const StyledChat = styled(Chat)`
  margin-bottom: 1rem;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonRightAligned = styled(Button)`
  display: flex;
  align-self: flex-end;
`;

export const Dialog = ({
  arbeidstakerFnr,
  tiltakId,
  kommentarer,
}: Props): ReactElement | null => {
  const { isAudienceSykmeldt } = useAudience();
  const slettKommentar = useSlettKommentar();
  const aktivPlan = useAktivPlanSM();

  if (!kommentarer || !aktivPlan) return null;
  const isKommentarBelongingToInnloggetAudience = (kommentar: Kommentar) => {
    if (isAudienceSykmeldt) {
      return kommentar.opprettetAv.fnr === arbeidstakerFnr;
    }
    return kommentar.opprettetAv.fnr !== arbeidstakerFnr;
  };

  const aktorNavn = (kommentar: Kommentar) => {
    if (!kommentar.opprettetAv.navn) {
      if (isAudienceSykmeldt) {
        return "Arbeidstaker";
      }
      return "Arbeidsgiver";
    }
    return kommentar.opprettetAv.navn;
  };

  const alleKommentarer = kommentarer
    .sort((k1, k2) => k2.id - k1.id)
    .map((kommentar, index) => {
      const isAktorsKommentar =
        isKommentarBelongingToInnloggetAudience(kommentar);

      return (
        <StyledChat
          key={index}
          avatar={hentAktoerNavnInitialer(
            kommentar.opprettetAv.navn,
            isAudienceSykmeldt
          )}
          name={aktorNavn(kommentar)}
          timestamp={getFullDateFormat(kommentar.opprettetTidspunkt)}
          position={isAktorsKommentar ? "right" : "left"}
        >
          <Chat.Bubble>
            <DialogContent>
              {kommentar.tekst}
              {isAktorsKommentar && (
                <ButtonRightAligned
                  variant="tertiary"
                  loading={slettKommentar.isLoading}
                  onClick={() =>
                    slettKommentar.mutateAsync({
                      tiltakId: tiltakId,
                      kommentarId: kommentar.id,
                    })
                  }
                >
                  Slett
                </ButtonRightAligned>
              )}
            </DialogContent>
          </Chat.Bubble>
        </StyledChat>
      );
    });

  return <div>{alleKommentarer}</div>;
};
