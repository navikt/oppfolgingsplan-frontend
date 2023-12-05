import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  useAktiveOppfolgingsplanerAG,
  useOppfolgingsplanerAG,
  useTidligereOppfolgingsplanerAG,
} from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import ReservertSykmeldtMelding from "../../../components/landing/ReservertSykmeldtMelding";
import { SamtaleStotte } from "../../../components/blocks/samtalestotte/SamtaleStotte";
import { useKontaktinfo } from "../../../api/queries/kontaktinfo/kontaktinfoQueries";
import { useNarmesteLederId } from "../../../hooks/routeHooks";
import OppfolgingsdialogTeasere from "../../../components/landing/teaser/OppfolgingsdialogTeasere";
import OpprettModalAG from "../../../components/landing/opprett/OpprettModalAG";
import ArbeidsgiverSide from "../../../components/blocks/wrappers/ArbeidsgiverSide";
import IngenPlanerCardAG from "../../../components/landing/opprett/IngenPlanerCardAG";
import OppfolgingsdialogerInfoPersonvern from "../../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../../components/blocks/video/VideoPanel";
import { OPSkeleton } from "../../../components/blocks/skeleton/OPSkeleton";
import { IkkeTilgangTilAnsattInfoBoks } from "../../../components/blocks/infoboks/IkkeTilgangTilAnsattInfoBoks";
import { useTilgangAG } from "../../../api/queries/arbeidsgiver/tilgangQueriesAG";

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
        <OppfolgingsdialogTeasere
          oppfolgingsplaner={aktiveOppfolgingsplaner}
          tittel={"Aktiv oppfølgingsplan"}
        />
      )}
      {harTidligereOppfolgingsplaner && (
        <OppfolgingsdialogTeasere
          oppfolgingsplaner={tidligereOppfolgingsplaner}
          harTidligerOppfolgingsdialoger
          tittel={"Tidligere oppfølgingsplaner"}
        />
      )}
    </>
  );
};

const Home: NextPage = () => {
  const narmesteLederId = useNarmesteLederId();
  const sykmeldtesKontaktinfo = useKontaktinfo();
  const [visReservertInfoboks, setVisReservertInfoboks] = useState(false);

  useEffect(() => {
    const hasSeenReservertInfo = sessionStorage?.getItem(
      `${narmesteLederId}-seen-varsel`,
    );
    if (
      sykmeldtesKontaktinfo.isSuccess &&
      !sykmeldtesKontaktinfo.data.skalHaVarsel &&
      !hasSeenReservertInfo
    ) {
      setVisReservertInfoboks(true);
    }
  }, [
    narmesteLederId,
    sykmeldtesKontaktinfo.data?.skalHaVarsel,
    sykmeldtesKontaktinfo.isSuccess,
  ]);

  const setHasReadReservertInfoBoks = () => {
    sessionStorage?.setItem(`${narmesteLederId}-seen-varsel`, "true");
    setVisReservertInfoboks(false);
  };

  return (
    <ArbeidsgiverSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
    >
      {visReservertInfoboks && (
        <ReservertSykmeldtMelding onClose={setHasReadReservertInfoBoks} />
      )}
      {!visReservertInfoboks && (
        <>
          <OppfolgingsdialogerInfoPersonvern
            ingress="Oppfølgingsplanen skal gjøre det lettere å bli i jobben. Hensikten er å finne ut hvilke oppgaver som kan gjøres hvis det blir lagt til rette for det.
                          Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
                          Alle godkjente planer kan ses i Altinn av de hos dere som har tilgang."
          />

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
