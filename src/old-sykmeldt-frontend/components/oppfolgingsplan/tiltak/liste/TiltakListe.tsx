import React from 'react';
import TiltakVisning from "./TiltakVisning";
import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

interface Props {
    liste: Tiltak[];
    fnr: string;
}

const TiltakListe = ({
                         liste,
                         fnr,
                     }: Props) => {
    return (
        <div className="oppfolgingsdialogtabell">
            {liste.map((element) => {
                return (
                    <TiltakVisning
                        key={element.tiltakId}
                        tiltak={element}
                        fnr={fnr}
                    />
                );
            })}
        </div>
    );
};

export default TiltakListe;
