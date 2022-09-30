import {NextPage} from "next";
import React from "react";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {useOppfolgingsplanerSM, useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {OppfolgingsplanPageSM, Page} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import {TiltakContent} from "../../../sykmeldt/components/tiltak/tiltakContent";

const Tiltak: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const oppfolgingsplaner = useOppfolgingsplanerSM()
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId)

    return (
        <OppfolgingsplanPageSM isLoading={oppfolgingsplaner.isLoading} isError={oppfolgingsplaner.isError}
                               oppfolgingsplan={aktivPlan} page={Page.TILTAK}>
            {aktivPlan && <TiltakContent oppfolgingsplan={aktivPlan}/>}
        </OppfolgingsplanPageSM>
    )
}

export default Tiltak