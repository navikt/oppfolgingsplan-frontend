import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { ArbeidstakerInfo } from "@/common/components/oversikt/ArbeidstakerInfo";
import { ArbeidsgiverInfo } from "./ArbeidsgiverInfo";
import { ArbeidsoppgaveList } from "./arbeidsoppgaver/ArbeidsoppgaveList";
import { BodyShort, Heading } from "@navikt/ds-react";
import { texts } from "@/common/components/oversikt/texts";
import { TiltakList } from "@/common/components/oversikt/tiltak/TiltakList";

interface Props {
  oppfolgingsplan?: Oppfolgingsplan;
}

export const OppfolgingsplanOversikt = ({ oppfolgingsplan }: Props) => {
  if (!oppfolgingsplan) {
    return null;
  }

  const atNavn = oppfolgingsplan?.arbeidstaker.navn;
  const atFnr = oppfolgingsplan?.arbeidstaker.fnr;
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
      {oppfolgingsplan.arbeidsoppgaveListe && atFnr && (
        <ArbeidsoppgaveList
          arbeidstakerFnr={atFnr}
          arbeidsoppgaver={oppfolgingsplan.arbeidsoppgaveListe}
        />
      )}
      <TiltakList />
    </div>
  );
};
