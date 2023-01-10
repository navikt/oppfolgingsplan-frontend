import { NextPage } from "next";
import React, { useState } from "react";
import OppfolgingsplanContent from "../../components/landing/OppfolgingsplanContent";
import {
  useAktiveOppfolgingsplanerSM,
  useOppfolgingsplanerSM,
  useOpprettOppfolgingsplanSM,
  useTidligereOppfolgingsplanerSM,
} from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { beskyttetSideUtenProps } from "auth/beskyttetSide";
import SykmeldtSide from "../../components/blocks/wrappers/SykmeldtSide";
import OppfolgingsdialogerInfoPersonvern from "../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../components/blocks/video/VideoPanel";
import {
  erOppfolgingsplanOpprettbarDirekte,
  finnTidligereOppfolgingsplaner,
} from "utils/oppfolgingplanUtils";
import OppfolgingsdialogTeasere from "components/landing/teaser/OppfolgingsdialogTeasere";
import OpprettModal from "components/landing/opprett/OpprettModal";
import IngenPlanerCard from "components/landing/opprett/IngenPlanerCard";
import OpprettModalContentSM from "components/landing/opprett/OpprettModalContentSM";
import { useNarmesteLedereSM } from "api/queries/sykmeldt/narmesteLedereQueriesSM";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";

const Home: NextPage = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();
  const { harAktiveOppfolgingsplaner, aktiveOppfolgingsplaner } =
    useAktiveOppfolgingsplanerSM();
  const { harTidligereOppfolgingsplaner, tidligereOppfolgingsplaner } =
    useTidligereOppfolgingsplanerSM();
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanSM();
  const [visOpprettModal, setVisOpprettModal] = useState(false);

  const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
    sykmeldinger.data!!,
    narmesteLedere.data!!
  );

  return (
    <SykmeldtSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
    >
      <OppfolgingsdialogerInfoPersonvern
        ingress="Oppfølgingsplanen skal gjøre det lettere for deg å bli i jobben. Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for det.
        Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
        Alle godkjente planer kan ses i Altinn av de på arbeidsplassen din som har tilgang."
      />

      <OppfolgingsplanContent
        oppfolgingsplaner={oppfolgingsplaner.data!!}
        sykmeldinger={sykmeldinger.data!!}
      >
        <>
          <OpprettModal
            visOpprettModal={visOpprettModal}
            setVisOpprettModal={setVisOpprettModal}
            modalContent={
              <OpprettModalContentSM
                oppfolgingsplaner={oppfolgingsplaner.data!!}
                arbeidsgivere={arbeidsgivereForSykmeldinger!!}
                isLoading={opprettOppfolgingsplan.isLoading}
                onSubmit={(kopierplan, virksomhetsnummer) =>
                  opprettOppfolgingsplan
                    .mutateAsync({
                      kopierTidligerePlan: kopierplan,
                      virksomhetsnummer: virksomhetsnummer,
                    })
                    .then(() => setVisOpprettModal(false))
                }
                handleClose={() => setVisOpprettModal(false)}
              />
            }
          />

          {!harAktiveOppfolgingsplaner && (
            <>
              <IngenPlanerCard
                title={"Det finnes ingen aktiv oppfølgingsplan"}
                description={
                  "Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene og noen forslag til hva som skal til for å klare dem."
                }
                isLoading={opprettOppfolgingsplan.isLoading}
                onClick={() =>
                  erOppfolgingsplanOpprettbarDirekte(
                    arbeidsgivereForSykmeldinger!!,
                    oppfolgingsplaner.data!!
                  )
                    ? opprettOppfolgingsplan.mutate({
                        kopierTidligerePlan: false,
                        virksomhetsnummer:
                          arbeidsgivereForSykmeldinger!![0].virksomhetsnummer,
                      })
                    : setVisOpprettModal(true)
                }
              />
            </>
          )}
          {harAktiveOppfolgingsplaner && (
            <OppfolgingsdialogTeasere
              oppfolgingsplaner={aktiveOppfolgingsplaner}
              tittel={
                aktiveOppfolgingsplaner.length > 1
                  ? "Aktive oppfølgingsplaner"
                  : "Aktiv oppfølgingsplan"
              }
            />
          )}
          {harTidligereOppfolgingsplaner && (
            <OppfolgingsdialogTeasere
              oppfolgingsplaner={finnTidligereOppfolgingsplaner(
                tidligereOppfolgingsplaner
              )}
              harTidligerOppfolgingsdialoger
              tittel={"Tidligere oppfølgingsplaner"}
            />
          )}
        </>
      </OppfolgingsplanContent>

      <VideoPanel />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
