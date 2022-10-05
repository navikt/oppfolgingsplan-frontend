import { NextPage } from "next";
import React, { useState } from "react";
import {
  useOppfolgingsplanerSM,
  useOppfolgingsplanSM,
} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useOppfolgingsplanRouteId } from "@/common/hooks/routeHooks";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import { BodyLong, Button, Heading } from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import { SpacedPanel } from "@/common/components/wrappers/SpacedPanel";
import { ArbeidsoppgaveForm } from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveForm";
import { useLagreArbeidsoppgaveSM } from "@/common/api/queries/sykmeldt/oppgaveQueriesSM";
import { TILRETTELEGGING } from "@/common/konstanter";

const Arbeidsoppgaver: NextPage = () => {
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const aktivPlan = useOppfolgingsplanSM(oppfolgingsplanId);
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);
  const lagreOppgaveMutation = useLagreArbeidsoppgaveSM();

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
              Legg til én arbeidsoppgave per type oppgave du utfører i din
              stilling, slik at dere kan vurdere hver oppgave separat.
            </BodyLong>
          </>

          {!leggerTilOppgave && (
            <Button
              variant={"secondary"}
              icon={<PlusIcon />}
              onClick={() => setLeggerTilOppgave(true)}
            >
              Legg til ny arbeidsoppgave
            </Button>
          )}

          {leggerTilOppgave && (
            <ArbeidsoppgaveForm
              onSubmit={(data) => {
                lagreOppgaveMutation.mutate({
                  oppfolgingsplanId: oppfolgingsplanId,
                  oppgave: {
                    arbeidsoppgavenavn: data.navnPaaArbeidsoppgaven,
                    gjennomfoering: {
                      kanGjennomfoeres: data.kanGjennomfores,
                      paaAnnetSted: data.tilrettelegging.includes(
                        TILRETTELEGGING.PAA_ANNET_STED
                      ),
                      medMerTid: data.tilrettelegging.includes(
                        TILRETTELEGGING.MED_MER_TID
                      ),
                      medHjelp: data.tilrettelegging.includes(
                        TILRETTELEGGING.MED_HJELP
                      ),
                      kanBeskrivelse: data.kanBeskrivelse,
                      kanIkkeBeskrivelse: data.kanIkkeBeskrivelse,
                    },
                  },
                });
                setLeggerTilOppgave(false);
              }}
              onCancel={() => setLeggerTilOppgave(false)}
            />
          )}
        </SpacedPanel>
      )}
    </OppfolgingsplanPageSM>
  );
};

export default Arbeidsoppgaver;
