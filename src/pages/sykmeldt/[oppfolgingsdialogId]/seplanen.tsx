import {NextPage} from "next";
import {OppfolgingsplanStepper} from "@/common/stepper/OppfolgingsplanStepper";
import React from "react";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import AppSpinner from "@/common/spinner/AppSpinner";
import {Heading} from "@navikt/ds-react";

const textOverskrift = (arbeidsgiver: string) => {
    return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const Seplanen: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId)

    //Todo fiks noe bra abstraksjon for lasting og feilhåndtering
    if (!aktivPlan) {
        return <AppSpinner/>
    }

    return (
        <div>
            <Heading spacing={true} level="1" size="large">{textOverskrift(aktivPlan.virksomhet.navn)}</Heading>

            <OppfolgingsplanStepper activeStep={3}/>

            <Heading spacing={true} level="2" size="medium">Oppfølgingsplan</Heading>

        </div>)
}

export default Seplanen