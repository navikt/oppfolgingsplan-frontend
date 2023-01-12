import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageAG,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageAG";
import { LagredeArbeidsoppgaver } from "components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { NyArbeidsoppgaveAG } from "../../../../components/arbeidsoppgaver/NyArbeidsoppgaveAG";
import {SpacedDiv} from "../../../../components/blocks/wrappers/SpacedDiv";
import Feilmelding from "../../../../components/blocks/error/Feilmelding";
import {useAktivOppfolgingsplanAG} from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivOppfolgingsplanAG();
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;

  return (
      <>
         {!aktivPlan || !arbeidstakerFnr && (
                <SpacedDiv>
                    <Feilmelding
                        description={
                            "Vi lkarte ikke å hente aktiv oppfølgingsplan eller Oppfolgingsplan mangler arbeidstakers fødselsnummer. Vennligst prøv igjen senere."
                        }
                    />
                </SpacedDiv>
            )}

              {(aktivPlan && arbeidstakerFnr) && (
                  <OppfolgingsplanPageAG page={Page.ARBEIDSOPPGAVER}>
                  <div>
                    <NyArbeidsoppgaveAG/>
                    {aktivPlan.arbeidsoppgaveListe && (
                        <LagredeArbeidsoppgaver
                            arbeidstakerFnr={arbeidstakerFnr}
                            arbeidsoppgaver={aktivPlan.arbeidsoppgaveListe}/>
                    )}
                  </div>
                  </OppfolgingsplanPageAG>
              )}
           </>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Arbeidsoppgaver;
