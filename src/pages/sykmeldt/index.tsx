import { NextPage } from "next";
import React from "react";
import OppfolgingsplanContent from "../../components/landing/OppfolgingsplanContent";
import { useOppfolgingsplanerSM } from "../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import SykmeldtSide from "../../components/blocks/wrappers/SykmeldtSide";
import OppfolgingsdialogerInfoPersonvern from "../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../components/blocks/video/VideoPanel";
import { useNarmesteLedereSM } from "../../api/queries/sykmeldt/narmesteLedereQueriesSM";
import {
  sykmeldtHarGyldigSykmelding,
  sykmeldtHarIngenSendteSykmeldinger,
} from "../../utils/sykmeldingUtils";
import OppfolgingsplanUtenGyldigSykmelding from "../../components/landing/OppfolgingsplanUtenGyldigSykmelding";
import {
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "../../utils/oppfolgingplanUtils";
import OppfolgingsdialogerUtenAktivSykmelding from "../../components/landing/OppfolgingsdialogerUtenAktivSykmelding";

const PageContent = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  if (
    oppfolgingsplaner.isSuccess &&
    sykmeldinger.isSuccess &&
    !sykmeldtHarGyldigSykmelding(sykmeldinger.data)
  ) {
    return (
      <div>
        <OppfolgingsplanUtenGyldigSykmelding
          sykmeldtHarIngenSendteSykmeldinger={sykmeldtHarIngenSendteSykmeldinger(
            sykmeldinger.data
          )}
        />

        {oppfolgingsplaner.data &&
          harTidligereOppfolgingsplaner(oppfolgingsplaner.data) && (
            <OppfolgingsdialogerUtenAktivSykmelding
              oppfolgingsplanerUtenAktivSykmelding={finnTidligereOppfolgingsplaner(
                oppfolgingsplaner.data
              )}
            />
          )}
      </div>
    );
  }

  if (
    oppfolgingsplaner.isSuccess &&
    sykmeldinger.isSuccess &&
    narmesteLedere.isSuccess
  ) {
    return (
      <OppfolgingsplanContent
        oppfolgingsplaner={oppfolgingsplaner.data}
        sykmeldinger={sykmeldinger.data}
        narmesteLedere={narmesteLedere.data}
      />
    );
  }

  return null;
};

const Home: NextPage = () => {
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

      <PageContent />

      <VideoPanel />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
