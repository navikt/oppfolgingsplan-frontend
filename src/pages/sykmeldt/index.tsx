import { NextPage } from "next";
import React from "react";
import OppfolgingsplanContentSM from "../../components/landing/OppfolgingsplanContentSM";
import { useOppfolgingsplanerSM } from "../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import SykmeldtSide from "../../components/blocks/wrappers/sykmeldtside/SykmeldtSide";
import OppfolgingsdialogerInfoPersonvern from "../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../components/blocks/video/VideoPanel";
import { useNarmesteLedereSM } from "../../api/queries/sykmeldt/narmesteLedereQueriesSM";
import {
  sykmeldtHarGyldigSykmelding,
  sykmeldtHarIngenSendteSykmeldinger,
} from "../../utils/sykmeldingUtils";
import OppfolgingsplanUtenGyldigSykmeldingSM from "../../components/landing/OppfolgingsplanUtenGyldigSykmeldingSM";
import {
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "../../utils/oppfolgingplanUtils";
import OppfolgingsdialogerUtenAktivSykmeldingSM from "../../components/landing/OppfolgingsdialogerUtenAktivSykmeldingSM";
import { OPSkeleton } from "../../components/blocks/skeleton/OPSkeleton";

const PageContent = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  if (
    oppfolgingsplaner.isPending ||
    sykmeldinger.isPending ||
    narmesteLedere.isPending
  ) {
    return <OPSkeleton />;
  }

  if (
    oppfolgingsplaner.isSuccess &&
    sykmeldinger.isSuccess &&
    !sykmeldtHarGyldigSykmelding(sykmeldinger.data)
  ) {
    return (
      <div>
        <OppfolgingsplanUtenGyldigSykmeldingSM
          sykmeldtHarIngenSendteSykmeldinger={sykmeldtHarIngenSendteSykmeldinger(
            sykmeldinger.data,
          )}
        />

        {harTidligereOppfolgingsplaner(oppfolgingsplaner.data) && (
          <OppfolgingsdialogerUtenAktivSykmeldingSM
            oppfolgingsplanerUtenAktivSykmelding={finnTidligereOppfolgingsplaner(
              oppfolgingsplaner.data,
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
      <OppfolgingsplanContentSM
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
        oppfolgingsplanInfoLenkUrl="https://www.nav.no/oppfolgingsplan#oppfolging"
      />

      <PageContent />

      <VideoPanel />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
