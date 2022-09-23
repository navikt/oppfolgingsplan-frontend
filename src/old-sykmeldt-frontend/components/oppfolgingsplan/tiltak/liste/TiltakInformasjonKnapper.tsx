import React, {useState} from 'react';
import styled from 'styled-components';
import ButtonEditIcon from '../../../app/buttons/ButtonEditIcon';
import ButtonDeleteIcon from '../../../app/buttons/ButtonDeleteIcon';
import ButtonComment from '../../../app/buttons/ButtonComment';
import MiniSpinner from '../../../MiniSpinner';
import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

const TiltakButtonsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  padding-top: 1em;
`;

interface Props {
    tiltak: Tiltak;
    fnr: string;
    lagreSkjema: boolean;

    visLagreSkjema(event: any): void;

    sendSlett(event: any, tiltakId: any): void;

    lagreKommentarSkjema: boolean;

    visLagreKommentarSkjema(event: any): void
}

const TiltakInformasjonKnapper = ({
                                      tiltak,
                                      fnr,
                                      lagreSkjema,
                                      visLagreSkjema,
                                      sendSlett,
                                      lagreKommentarSkjema,
                                      visLagreKommentarSkjema,
                                  }: Props) => {
    const [sletter, setSletter] = useState(false);
    const aktoerHarOpprettetElement = fnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr);
    return (
        <TiltakButtonsRow>
            <div>
                {!lagreSkjema && aktoerHarOpprettetElement && (
                    <ButtonEditIcon
                        click={(event) => {
                            visLagreSkjema(event);
                        }}
                    />
                )}
            </div>
            <div>
                {aktoerHarOpprettetElement && (
                    <div>
                        {sletter ? (
                            <MiniSpinner/>
                        ) : (
                            <ButtonDeleteIcon
                                click={(event) => {
                                    setSletter(true);
                                    sendSlett(event, tiltak.tiltakId);
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
            <div>
                {!lagreKommentarSkjema && (
                    <ButtonComment
                        count={tiltak.kommentarer?.length}
                        click={(event) => {
                            visLagreKommentarSkjema(event);
                        }}
                    />
                )}
            </div>
        </TiltakButtonsRow>
    );
};

export default TiltakInformasjonKnapper;
