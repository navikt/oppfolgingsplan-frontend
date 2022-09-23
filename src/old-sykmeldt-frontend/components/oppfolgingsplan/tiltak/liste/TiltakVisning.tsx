import React from 'react';
import TiltakListeRad from './TiltakListeRad';
import {Tiltak} from '@/types/oppfolgingsplanservice/oppfolgingsplanTypes';

interface Props {
    tiltak: Tiltak;
    fnr: string;
}

export const TiltakVisning = ({tiltak, fnr}: Props) => {
    return (() => {
        return (
            <article
                aria-label={tiltak.tiltaknavn}
            >
                <div>
                    <TiltakListeRad
                        tiltak={tiltak}
                        fnr={fnr}
                        sendSlett={() => console.log("TODO")}
                        lagreSkjema={false}
                        visLagreSkjema={() => console.log("TODO")}
                        lagreKommentarSkjema={false}
                        visLagreKommentarSkjema={() => console.log("TODO")}
                    />
                </div>
                {/*{!this.state.visLagreSkjema && (*/}
                {/*    <TiltakInformasjon*/}
                {/*        tiltak={tiltak}*/}
                {/*        fnr={fnr}*/}
                {/*        lagreKommentarSkjema={this.state.lagreKommentarSkjema}*/}
                {/*        skjulLagreKommentarSkjema={this.skjulLagreKommentarSkjema}*/}
                {/*        sendLagreKommentar={sendLagreKommentar}*/}
                {/*        sendSlettKommentar={sendSlettKommentar}*/}
                {/*        oppdaterTiltakFeilet={this.state.visLagringFeilet}*/}
                {/*        varselTekst={this.state.varselTekst}*/}
                {/*        tiltakReducer={tiltakReducer}*/}
                {/*        kommentarReducer={kommentarReducer}*/}
                {/*        feilMelding={feilMelding}*/}
                {/*        visFeilMelding={visFeilMelding}*/}
                {/*        rootUrlImg={rootUrlImg}*/}
                {/*    />*/}
                {/*)}*/}
                {/*{this.state.visLagreSkjema && (*/}
                {/*    <TiltakSkjema*/}
                {/*        sendLagre={this.sendLagre}*/}
                {/*        tiltak={tiltak}*/}
                {/*        form={tiltak.tiltakId.toString()}*/}
                {/*        fnr={fnr}*/}
                {/*        id={tiltak.tiltakId}*/}
                {/*        avbryt={this.vistiltakInformasjon}*/}
                {/*        oppdateringFeilet={(this.state.visLagringFeilet || this.state.visSlettingFeilet) && feilMelding}*/}
                {/*        varselTekst={this.state.varselTekst}*/}
                {/*        visFeilMelding={visFeilMelding}*/}
                {/*        tiltakReducer={tiltakReducer}*/}
                {/*        rootUrlImg={rootUrlImg}*/}
                {/*    />*/}
                {/*)}*/}
                {/*{this.state.visSlettingFeilet && feilMelding && (*/}
                {/*    <TiltakVarselFeilStyled>*/}
                {/*        <TiltakVarselFeil*/}
                {/*            tekst={texts.updateError}*/}
                {/*            onTransitionEnd={() => {*/}
                {/*                this.onTransitionEnd();*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </TiltakVarselFeilStyled>*/}
                {/*)}*/}
            </article>
        );
    })();
}

export default TiltakVisning;
