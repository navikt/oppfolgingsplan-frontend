import { ReactElement } from "react";
import styled from "styled-components";
import { Button, Chat } from "@navikt/ds-react";
import { hentAktoerNavnInitialer } from "@/common/utils/stringUtils";
import { getFullDateFormat } from "@/common/utils/dateUtils";
import { useSlettKommentarSM } from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Kommentar } from "../../../schema/oppfolgingsplanSchema";

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

  const alleKommentarer = kommentarer.map((kommentar, index) => {
    const isAktorsKommentar = kommentar.opprettetAv.fnr == aktorFnr;

    return (
      <StyledChat
        key={index}
        avatar={hentAktoerNavnInitialer(kommentar.opprettetAv.navn)}
        name={kommentar.opprettetAv.navn}
        timestamp={getFullDateFormat(kommentar.opprettetTidspunkt)}
        avatarBgColor={"#F1F1F1"}
        backgroundColor={"#F7F7F7"}
        position={isAktorsKommentar ? "right" : "left"}
      >
        <Chat.Bubble>
          <DialogContent>
            {kommentar.tekst}
            {isAktorsKommentar && (
              <ButtonRightAligned
                variant="tertiary"
                onClick={() =>
                  slettKommentar({
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
