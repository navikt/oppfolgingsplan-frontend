import { NextPage } from "next";
import React, { useState } from "react";
import {
  useAktiveOppfolgingsplanerAG,
  useOpprettOppfolgingsplanAG,
  useTidligereOppfolgingsplanerAG,
} from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { beskyttetSideUtenProps } from "auth/beskyttetSide";
import OppfolgingsdialogerInfoPersonvern from "../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../components/blocks/video/VideoPanel";
import ArbeidsgiverSide from "../../components/blocks/wrappers/ArbeidsgiverSide";
import BaserTidligereSkjema from "../../components/landing/opprett/BaserTidligereSkjema";
import IngenPlanerCard from "../../components/landing/opprett/IngenPlanerCard";
import OpprettModal from "../../components/landing/opprett/OpprettModal";
import OppfolgingsdialogTeasere from "../../components/landing/teaser/OppfolgingsdialogTeasere";

const Home: NextPage = () => {
  const { harAktiveOppfolgingsplaner, aktiveOppfolgingsplaner } =
    useAktiveOppfolgingsplanerAG();
  const { harTidligereOppfolgingsplaner, tidligereOppfolgingsplaner } =
    useTidligereOppfolgingsplanerAG();
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanAG();
  const [visOpprettModal, setVisOpprettModal] = useState(false);

  return (
    <ArbeidsgiverSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
    >
      <OppfolgingsdialogerInfoPersonvern
        ingress="Oppfølgingsplanen skal gjøre det lettere å bli i jobben. Hensikten er å finne ut hvilke oppgaver som kan gjøres hvis det blir lagt til rette for det.
        Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
        Alle godkjente planer kan ses i Altinn av de hos dere som har tilgang."
      />

      {!harAktiveOppfolgingsplaner && (
        <>
          <OpprettModal
            visOpprettModal={visOpprettModal}
            setVisOpprettModal={setVisOpprettModal}
            modalContent={
              <BaserTidligereSkjema
                isLoading={opprettOppfolgingsplan.isLoading}
                onSubmit={(kopierplan) =>
                  opprettOppfolgingsplan
                    .mutateAsync(kopierplan)
                    .then(() => setVisOpprettModal(false))
                }
                handleClose={() => setVisOpprettModal(false)}
              />
            }
          />
          <IngenPlanerCard
            title={"Det finnes ingen aktiv oppfølgingsplan"}
            description={
              "Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene og noen forslag til hva som skal til for å klare dem."
            }
            isLoading={opprettOppfolgingsplan.isLoading}
            onClick={() =>
              !harTidligereOppfolgingsplaner
                ? opprettOppfolgingsplan.mutate(false)
                : setVisOpprettModal(true)
            }
          />
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

      <VideoPanel />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
