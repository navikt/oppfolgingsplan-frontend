import {NextPage} from "next";
import React, {useState} from "react";
import {useOppfolgingsplanerSM, useOppfolgingsplanSM,} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {OppfolgingsplanPageSM, Page,} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import {BodyLong, Button, Heading} from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import {SpacedPanel} from "@/common/components/wrappers/SpacedPanel";

const Arbeidsoppgaver: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const oppfolgingsplaner = useOppfolgingsplanerSM();
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId);
    const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

    return (
        <OppfolgingsplanPageSM
            isLoading={oppfolgingsplaner.isLoading}
            isError={oppfolgingsplaner.isError}
            oppfolgingsplan={aktivPlan}
            page={Page.ARBEIDSOPPGAVER}
        >
            {aktivPlan && (
                <SpacedPanel border={true}>
                    <>
                        <Heading spacing size="medium" level="3">
                            Beskriv en arbeidsoppgave
                        </Heading>
                        <BodyLong spacing size="medium">
                            Legg til én arbeidsoppgave per type oppgave du utfører i din stilling, slik at dere kan
                            vurdere hver oppgave separat.
                        </BodyLong>
                    </>

                    {!leggerTilOppgave && (
                        <Button
                            variant={"secondary"}
                            icon={<PlusIcon/>}
                            onClick={() => console.log("todo")}
                        >
                            Legg til ny arbeidsoppgave
                        </Button>
                    )}
                </SpacedPanel>
            )}
        </OppfolgingsplanPageSM>
    );
};

export default Arbeidsoppgaver;
