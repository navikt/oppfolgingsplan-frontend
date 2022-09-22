import {NextPage} from "next";
import React from "react";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {useOppfolgingsplanerSM, useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {OppfolgingsplanPageSM, Page} from "@/common/pagewrappers/OppfolgingsplanPageSM";

const Tiltak: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const oppfolgingsplaner = useOppfolgingsplanerSM()
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId, oppfolgingsplaner.data)

    return (
        <OppfolgingsplanPageSM isLoading={oppfolgingsplaner.isLoading} isError={oppfolgingsplaner.isError}
                               oppfolgingsplan={aktivPlan} page={Page.TILTAK}>
            hei
        </OppfolgingsplanPageSM>
    )
}

export default Tiltak