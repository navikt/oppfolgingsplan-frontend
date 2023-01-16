import { ReactElement } from "react";
import styled from "styled-components";
import { Button, Chat } from "@navikt/ds-react";
import { hentAktoerNavnInitialer } from "utils/stringUtils";
import { getFullDateFormat } from "utils/dateUtils";
import { useSlettKommentarSM } from "api/queries/sykmeldt/tiltakQueriesSM";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Kommentar } from "../../../types/oppfolgingsplan";

interface Props {
  aktorFnr: string;
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
  aktorFnr,
  tiltakId,
  kommentarer,
}: Props): ReactElement | null => {
  const slettKommentar = useSlettKommentarSM();
  const aktivPlan = useAktivPlanSM();

  if (!kommentarer || !aktivPlan) return null;

  const alleKommentarer = kommentarer
    .sort((k1, k2) => k2.id - k1.id)
    .map((kommentar, index) => {
      const isAktorsKommentar = kommentar.opprettetAv.fnr == aktorFnr;

      return (
        <StyledChat
          key={index}
          avatar={hentAktoerNavnInitialer(kommentar.opprettetAv.navn)}
          name={kommentar.opprettetAv.navn}
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
