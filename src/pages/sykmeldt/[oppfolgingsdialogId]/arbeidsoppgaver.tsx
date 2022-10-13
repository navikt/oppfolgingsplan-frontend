import { NextPage } from "next";
import React, { useState } from "react";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
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
  const aktivPlan = useAktivPlanSM();
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);
  const lagreOppgave = useLagreArbeidsoppgaveSM();

  return (
    <OppfolgingsplanPageSM page={Page.ARBEIDSOPPGAVER}>
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
                lagreOppgave({
                  arbeidsoppgavenavn: data.navnPaaArbeidsoppgaven,
                  gjennomfoering: {
                    kanGjennomfoeres: data.kanGjennomfores,
                    paaAnnetSted: data.tilrettelegging
                      ? data.tilrettelegging.includes(
                          TILRETTELEGGING.PAA_ANNET_STED
                        )
                      : false,
                    medMerTid: data.tilrettelegging
                      ? data.tilrettelegging.includes(
                          TILRETTELEGGING.MED_MER_TID
                        )
                      : false,
                    medHjelp: data.tilrettelegging
                      ? data.tilrettelegging.includes(TILRETTELEGGING.MED_HJELP)
                      : false,
                    kanBeskrivelse: data.kanBeskrivelse,
                    kanIkkeBeskrivelse: data.kanIkkeBeskrivelse,
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
