import {NextPage} from "next";
import {OppfolgingsplanStepper} from "@/common/stepper/OppfolgingsplanStepper";
import React from "react";
import {Heading} from "@navikt/ds-react";
import {useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import AppSpinner from "@/common/spinner/AppSpinner";

const textOverskrift = (arbeidsgiver: string) => {
    return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const Arbeidsoppgaver: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId)

    //Todo fiks noe bra abstraksjon for lasting og feilhåndtering
    if (!aktivPlan) {
        return <AppSpinner/>
    }

    return (
        <div>
            <Heading spacing={true} level="1" size="large">{textOverskrift(aktivPlan.virksomhet.navn)}</Heading>

            <OppfolgingsplanStepper activeStep={1}/>

            <Heading spacing={true} level="2" size="medium">Arbeidsoppgaver</Heading>

        </div>)
}

export default Arbeidsoppgaver