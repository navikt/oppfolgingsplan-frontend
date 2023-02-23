import { ArbeidstakerInfo } from "./ArbeidstakerInfo";
import { ArbeidsgiverInfo } from "./ArbeidsgiverInfo";
import { ArbeidsoppgaveList } from "./arbeidsoppgaver/ArbeidsoppgaveList";
import { BodyShort, Heading } from "@navikt/ds-react";
import { texts } from "./texts";
import { TiltakList } from "./tiltak/TiltakList";
import { Oppfolgingsplan } from "../../types/oppfolgingsplan";
import { useInnloggetFnr } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

interface Props {
  oppfolgingsplan?: Oppfolgingsplan;
}

export const OppfolgingsplanOversikt = ({ oppfolgingsplan }: Props) => {
  const innloggetFnr = useInnloggetFnr(oppfolgingsplan);

  if (!oppfolgingsplan) {
    return null;
  }

  const atNavn = oppfolgingsplan?.arbeidstaker.navn;
  const agNavn = oppfolgingsplan?.arbeidsgiver?.naermesteLeder?.navn;

  return (
    <div>
      <Heading level="2" size="large">
        {texts.oppfolgingsplanOversikt.title}
      </Heading>
      {atNavn && agNavn && (
        <BodyShort>
          {`${texts.oppfolgingsplanOversikt.mellom} ${atNavn} ${texts.oppfolgingsplanOversikt.og} ${agNavn}`}
        </BodyShort>
      )}
      <ArbeidstakerInfo arbeidstaker={oppfolgingsplan?.arbeidstaker} />
      <ArbeidsgiverInfo
        narmesteLeder={oppfolgingsplan?.arbeidsgiver?.naermesteLeder}
        virksomhet={oppfolgingsplan?.virksomhet}
      />
      {oppfolgingsplan.arbeidsoppgaveListe && innloggetFnr && (
        <ArbeidsoppgaveList
          arbeidsoppgaver={oppfolgingsplan.arbeidsoppgaveListe}
          arbeidstakerFnr={oppfolgingsplan.arbeidstaker.fnr}
        />
      )}
      {oppfolgingsplan.tiltakListe && (
        <TiltakList oppfolgingsplan={oppfolgingsplan} />
      )}
    </div>
  );
};
