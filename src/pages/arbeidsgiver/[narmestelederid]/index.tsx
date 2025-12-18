import { NextPage } from "next";
import React, { useState } from "react";

import {
  useAktiveOppfolgingsplanerAG,
  useOppfolgingsplanerAG,
  useTidligereOppfolgingsplanerAG,
} from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { SamtaleStotte } from "../../../components/blocks/samtalestotte/SamtaleStotte";
import OpprettModalAG from "../../../components/landing/opprett/OpprettModalAG";
import ArbeidsgiverSide from "../../../components/blocks/wrappers/ArbeidsgiverSide";
import IngenPlanerCardAG from "../../../components/landing/opprett/IngenPlanerCardAG";
import OppfolgingsdialogerInfoPersonvern from "../../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../../components/blocks/video/VideoPanel";
import { OPSkeleton } from "../../../components/blocks/skeleton/OPSkeleton";
import { IkkeTilgangTilAnsattInfoBoks } from "../../../components/blocks/infoboks/IkkeTilgangTilAnsattInfoBoks";
import { useTilgangAG } from "../../../api/queries/arbeidsgiver/tilgangQueriesAG";
import OppfolgingsdialogTeasereAG from "../../../components/landing/teaser/arbeidsgiver/OppfolgingsdialogTeasereAG";
import ReservertSykmeldtMelding from "../../../components/landing/ReservertSykmeldtMeldingAG";
import useShowSMIsReservertInfoForAG from "../../../components/status/utils/useShowSMIsReservertInfoForAG";
import { PilotLinkCardAG } from "../../../components/blocks/pilotuser/PilotLinkCardAG";

const PageContent = () => {
  const allePlaner = useOppfolgingsplanerAG();
  const tilgang = useTilgangAG();
  const { harAktiveOppfolgingsplaner, aktiveOppfolgingsplaner } =
    useAktiveOppfolgingsplanerAG();
  const { harTidligereOppfolgingsplaner, tidligereOppfolgingsplaner } =
    useTidligereOppfolgingsplanerAG();
  const [visOpprettModal, setVisOpprettModal] = useState(false);

  if (allePlaner.isPending || tilgang.isPending) {
    return <OPSkeleton />;
  }

  if (tilgang.data?.harTilgang === false) {
    return <IkkeTilgangTilAnsattInfoBoks />;
  }

  return (
    <>
      {!harAktiveOppfolgingsplaner && (
        <>
          <OpprettModalAG
            visOpprettModal={visOpprettModal}
            setVisOpprettModal={setVisOpprettModal}
          />
          <IngenPlanerCardAG setVisOpprettModal={setVisOpprettModal} />
        </>
      )}
      {harAktiveOppfolgingsplaner && (
        <OppfolgingsdialogTeasereAG
          oppfolgingsplaner={aktiveOppfolgingsplaner}
          tittel={"Aktiv oppfølgingsplan"}
        />
      )}
      {harTidligereOppfolgingsplaner && (
        <OppfolgingsdialogTeasereAG
          oppfolgingsplaner={tidligereOppfolgingsplaner}
          harTidligerOppfolgingsdialoger
          tittel={"Tidligere oppfølgingsplaner"}
        />
      )}
    </>
  );
};

const Home: NextPage = () => {
  const { showSMIsReservertInfo, dismissSMIsReservertInfo } =
    useShowSMIsReservertInfoForAG();

  return (
    <ArbeidsgiverSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
    >
      {showSMIsReservertInfo ? (
        <ReservertSykmeldtMelding onClose={dismissSMIsReservertInfo} />
      ) : (
        <>
          <OppfolgingsdialogerInfoPersonvern
            ingress="Oppfølgingsplanen skal gjøre det lettere å bli i jobben. Hensikten er å finne ut hvilke oppgaver som kan gjøres hvis det blir lagt til rette for det.
                          Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
                          Alle godkjente planer kan ses i Altinn av de hos dere som har tilgang."
            oppfolgingsplanInfoLenkUrl="https://www.nav.no/arbeidsgiver/oppfolgingsplan"
          />

          <PilotLinkCardAG />

          <PageContent />

          <SamtaleStotte />

          <VideoPanel />
        </>
      )}
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
