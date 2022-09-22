import {NextPage} from "next";
import React from "react";
import {useOppfolgingsplanerSM, useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {OppfolgingsplanPageSM, Page} from "@/common/pagewrappers/OppfolgingsplanPageSM";

const Arbeidsoppgaver: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const oppfolgingsplaner = useOppfolgingsplanerSM()
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId, oppfolgingsplaner.data)

    return (
        <OppfolgingsplanPageSM isLoading={oppfolgingsplaner.isLoading} isError={oppfolgingsplaner.isError}
                               oppfolgingsplan={aktivPlan} page={Page.ARBEIDSOPPGAVER}>
            hei
        </OppfolgingsplanPageSM>
    )
}

export default Arbeidsoppgaver