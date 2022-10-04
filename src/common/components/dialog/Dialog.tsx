import {ReactElement} from "react";
import styled from "styled-components";
import {Button, Chat} from "@navikt/ds-react";
import {hentAktoerNavnInitialer} from "@/common/utils/stringUtils";
import {getFullDateFormat} from "@/common/utils/dateUtils";
import {useSlettKommentarSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {KommentarDTO} from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
    aktorFnr: string;
    tiltakId: number;
    kommentarer?: KommentarDTO[] | null;
}

const StyledChat = styled(Chat)`
  margin-bottom: 1rem;
`

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonRightAligned = styled(Button)`
  display: flex;
  align-self: flex-end;
`

export const Dialog = ({aktorFnr, tiltakId, kommentarer}: Props): ReactElement | null => {
    const slettKommentarMutation = useSlettKommentarSM();
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId)

    if (!kommentarer || !aktivPlan) return null;

    const alleKommentarer = kommentarer.map((kommentar, index) => {
        const isAktorsKommentar = kommentar.opprettetAv.fnr == aktorFnr;

        return <StyledChat
            key={index}
            avatar={hentAktoerNavnInitialer(kommentar.opprettetAv.navn)}
            name={kommentar.opprettetAv.navn}
            timestamp={getFullDateFormat(kommentar.opprettetTidspunkt)}
            avatarBgColor={isAktorsKommentar ? "#ECF399" : "#E0D8E9"}
            backgroundColor={isAktorsKommentar ? "#F9FCCC" : "#EFECF4"}
            position={isAktorsKommentar ? "right" : "left"}
        >
            <Chat.Bubble>
                <DialogContent>
                    {kommentar.tekst}
                    {isAktorsKommentar &&
                        <ButtonRightAligned variant="tertiary" onClick={() => slettKommentarMutation.mutate({
                            oppfolgingsplanId: aktivPlan.id,
                            tiltakId: tiltakId,
                            kommentarId: kommentar.id
                        })}>Slett</ButtonRightAligned>}
                </DialogContent>
            </Chat.Bubble>
        </StyledChat>
    })

    return <div>{alleKommentarer}</div>
}