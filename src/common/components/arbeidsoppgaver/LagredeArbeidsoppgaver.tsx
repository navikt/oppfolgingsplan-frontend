import {ArbeidsoppgaveList} from "@/common/components/oversikt/arbeidsoppgaver/ArbeidsoppgaveList";
import React from "react";
import {Arbeidsoppgave} from "../../../schema/oppfolgingsplanSchema";

interface Props {
    arbeidsoppgaver: Arbeidsoppgave[];
}

export const LagredeArbeidsoppgaver = ({arbeidsoppgaver}: Props) => {

    return <ArbeidsoppgaveList arbeidsoppgaver={arbeidsoppgaver}/>;
};
