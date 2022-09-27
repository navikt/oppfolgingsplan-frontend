import {Kommentar} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {ReactElement} from "react";
import styled from "styled-components";
import {Chat} from "@navikt/ds-react";
import {hentAktoerNavnInitialer} from "@/common/utils/stringUtils";
import {getFullDateFormat} from "@/common/utils/dateUtils";

interface Props {
    arbeidstakerFnr: string;
    kommentarer?: Kommentar[] | null;
}

const StyledChat = styled(Chat)`
  margin-bottom: 1rem;
`

export const Dialog = ({arbeidstakerFnr, kommentarer}: Props): ReactElement | null => {
    if (!kommentarer) return null;

    const alleKommentarer = kommentarer.map((kommentar, index) => {
        const isArbeidstakersKommentar = kommentar.opprettetAv.fnr == arbeidstakerFnr;

        return <StyledChat
            key={index}
            avatar={hentAktoerNavnInitialer(kommentar.opprettetAv.navn)}
            name={kommentar.opprettetAv.navn}
            timestamp={getFullDateFormat(kommentar.opprettetTidspunkt)}
            avatarBgColor={isArbeidstakersKommentar ? "#ECF399" : "#E0D8E9"}
            backgroundColor={isArbeidstakersKommentar ? "#F9FCCC" : "#EFECF4"}
            position={isArbeidstakersKommentar ? "right" : "left"}
        >
            <Chat.Bubble>{kommentar.tekst}</Chat.Bubble>
        </StyledChat>
    })

    return <div>{alleKommentarer}</div>
}