import React from 'react';
import OppfolgingsdialogTidligereUtenSykmelding from "./OppfolgingsdialogTidligereUtenSykmelding";
import {Heading} from "@navikt/ds-react";
import {OppfolgingsplanDTO} from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
    oppfolgingsplanerUtenAktivSykmelding: OppfolgingsplanDTO[]
}

const OppfolgingsdialogerUtenAktivSykmelding = ({oppfolgingsplanerUtenAktivSykmelding}: Props) => {
    return (
        <div>
            <Heading size={"medium"} level={"2"}>Tidligere oppfølgingsplaner</Heading>
            <div>
                {oppfolgingsplanerUtenAktivSykmelding.map((oppfolgingsplan, idx) => {
                    return <OppfolgingsdialogTidligereUtenSykmelding oppfolgingsplanUtenAktivSykmelding={oppfolgingsplan} key={idx}/>;
                })}
            </div>
        </div>
    );
};

export default OppfolgingsdialogerUtenAktivSykmelding;
