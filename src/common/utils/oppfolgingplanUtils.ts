import {
  MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
  STATUS,
} from "../konstanter";
import {
  ArbeidsgivereForGyldigeSykmeldinger,
  finnArbeidsgivereForGyldigeSykmeldinger,
} from "./sykmeldingUtils";
import { erGyldigDatoIFortiden, getTime } from "./dateUtils";
import { Oppfolgingsplan } from "../../schema/oppfolgingsplanSchema";
import { Sykmelding } from "../../schema/sykmeldingSchema";
import { NarmesteLeder } from "../../schema/narmestelederSchema";

export const inneholderGodkjenninger = (oppfolgingsplan: Oppfolgingsplan) => {
  return (
    oppfolgingsplan.godkjenninger && oppfolgingsplan.godkjenninger.length > 0
  );
};

export const inneholderGodkjenningerAvArbeidstaker = (
  oppfolgingsplan: Oppfolgingsplan
) => {
  return (
    oppfolgingsplan.godkjenninger &&
    oppfolgingsplan.godkjenninger.length > 0 &&
    oppfolgingsplan.godkjenninger[0].godkjent &&
    oppfolgingsplan.godkjenninger[0].godkjentAv.fnr ===
      oppfolgingsplan.arbeidstaker.fnr
  );
};

export const erSykmeldingGyldigForOppfolgingMedGrensedato = (
  sykmelding: Sykmelding,
  dato: Date
) => {
  return (
    sykmelding.sykmeldingsperioder.filter((periode) => {
      const tomGrenseDato = new Date(dato);
      tomGrenseDato.setHours(0, 0, 0, 0);
      tomGrenseDato.setMonth(
        tomGrenseDato.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING
      );
      return new Date(periode.tom) >= new Date(tomGrenseDato);
    }).length > 0
  );
};

export const erOppfolgingsplanKnyttetTilGyldigSykmelding = (
  oppfolgingsplan: Oppfolgingsplan,
  sykmeldinger: Sykmelding[]
) => {
  const dagensDato = new Date();
  return (
    sykmeldinger.filter((sykmelding) => {
      return (
        oppfolgingsplan.virksomhet?.virksomhetsnummer ===
          sykmelding.organisasjonsinformasjon.orgnummer &&
        erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato)
      );
    }).length > 0
  );
};

export const erOppfolgingsplanAktiv = (oppfolgingsplan: Oppfolgingsplan) => {
  return (
    !oppfolgingsplan.godkjentPlan ||
    (oppfolgingsplan.status !== STATUS.AVBRUTT &&
      oppfolgingsplan.godkjentPlan.gyldighetstidspunkt?.tom &&
      !erGyldigDatoIFortiden(
        oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom
      ))
  );
};

export const erOppfolgingsplanTidligere = (
  oppfolgingsplan: Oppfolgingsplan
) => {
  return (
    oppfolgingsplan.godkjentPlan &&
    oppfolgingsplan.status !== STATUS.AVBRUTT &&
    oppfolgingsplan.godkjentPlan.gyldighetstidspunkt?.tom &&
    erGyldigDatoIFortiden(oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom)
  );
};

export const sorterOppfolgingsplanerEtterSluttdato = (
  oppfolgingsplaner: Oppfolgingsplan[]
): Oppfolgingsplan[] => {
  return oppfolgingsplaner.sort((o1, o2) => {
    const plan1Tom = o1.godkjentPlan?.gyldighetstidspunkt?.tom;
    const plan2Tom = o2.godkjentPlan?.gyldighetstidspunkt?.tom;

    return getTime(plan2Tom) - getTime(plan1Tom);
  });
};

export const finnTidligereOppfolgingsplaner = (
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  return sorterOppfolgingsplanerEtterSluttdato(
    oppfolgingsplaner.filter((oppfolgingsplan) => {
      return erOppfolgingsplanTidligere(oppfolgingsplan);
    })
  );
};

export const harTidligereOppfolgingsplaner = (
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  return finnTidligereOppfolgingsplaner(oppfolgingsplaner).length > 0;
};

export const finnAktiveOppfolgingsplaner = (
  oppfolgingsplaner: Oppfolgingsplan[],
  sykmeldinger?: Sykmelding[]
) => {
  if (!sykmeldinger) {
    return oppfolgingsplaner.filter((plan) => {
      return !plan.godkjentPlan || erOppfolgingsplanAktiv(plan);
    });
  }
  return oppfolgingsplaner.filter((plan) => {
    return (
      erOppfolgingsplanKnyttetTilGyldigSykmelding(plan, sykmeldinger) &&
      (!plan.godkjentPlan ||
        (plan.status !== STATUS.AVBRUTT &&
          plan.godkjentPlan.gyldighetstidspunkt?.tom &&
          !erGyldigDatoIFortiden(plan.godkjentPlan.gyldighetstidspunkt.tom)))
    );
  });
};

//todo må vi ha det siste innlogging greiene?
export const finnBrukersSisteInnlogging = (
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  const innlogginger = oppfolgingsplaner.map((oppfolgingsplan) => {
    return oppfolgingsplan.arbeidstaker.sistInnlogget
      ? new Date(oppfolgingsplan.arbeidstaker.sistInnlogget).getTime()
      : new Date().getTime();
  });
  return new Date(Math.max.apply(null, innlogginger));
};

export const erAktivOppfolgingsplanOpprettetMedArbeidsgiver = (
  oppfolgingsplaner: Oppfolgingsplan[],
  virksomhetsnummer: string
) => {
  return (
    finnAktiveOppfolgingsplaner(oppfolgingsplaner).filter((plan) => {
      return plan.virksomhet?.virksomhetsnummer === virksomhetsnummer;
    }).length > 0
  );
};

export const hentAktivOppfolgingsplanOpprettetMedArbeidsgiver = (
  oppfolgingsplaner: Oppfolgingsplan[],
  virksomhetsnummer: string
) => {
  return finnAktiveOppfolgingsplaner(oppfolgingsplaner).filter((plan) => {
    return plan.virksomhet?.virksomhetsnummer === virksomhetsnummer;
  })[0];
};

export const erOppfolgingsplanOpprettbarMedArbeidsgiver = (
  oppfolgingsplaner: Oppfolgingsplan[],
  arbeidsgiver: ArbeidsgivereForGyldigeSykmeldinger
) => {
  return (
    arbeidsgiver.harNaermesteLeder &&
    !erAktivOppfolgingsplanOpprettetMedArbeidsgiver(
      oppfolgingsplaner,
      arbeidsgiver.virksomhetsnummer
    )
  );
};

export const erOppfolgingsplanOpprettbarMedMinstEnArbeidsgiver = (
  oppfolgingsplaner: Oppfolgingsplan[],
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[]
) => {
  return (
    arbeidsgivere.filter((arbeidsgiver) => {
      return erOppfolgingsplanOpprettbarMedArbeidsgiver(
        oppfolgingsplaner,
        arbeidsgiver
      );
    }).length > 0
  );
};

export const erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere = (
  oppfolgingsplaner: Oppfolgingsplan[],
  sykmeldinger: Sykmelding[],
  naermesteLedere: NarmesteLeder[]
) => {
  return (
    oppfolgingsplaner.length === 0 &&
    finnArbeidsgivereForGyldigeSykmeldinger(
      sykmeldinger,
      naermesteLedere
    ).filter((arbeidsgiver) => {
      return arbeidsgiver.harNaermesteLeder;
    }).length === 0
  );
};

export const erOppfolgingsplanOpprettbarDirekte = (
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[],
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  return (
    arbeidsgivere.length === 1 &&
    !harTidligereOppfolgingsplaner(oppfolgingsplaner)
  );
};

//Todo vurder om dette kan fjernes eller endres
export const finnGodkjenteplanerAvbruttAvMotpartSidenSistInnlogging = (
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  if (!oppfolgingsplaner) {
    return [];
  }
  const sisteInnlogging = finnBrukersSisteInnlogging(oppfolgingsplaner);
  return oppfolgingsplaner
    .filter((oppfolgingsplan) => {
      const avbruttplan =
        oppfolgingsplan.godkjentPlan &&
        oppfolgingsplan.godkjentPlan.avbruttPlan;
      return (
        oppfolgingsplan.status === STATUS.AVBRUTT &&
        oppfolgingsplan.arbeidsgiver?.naermesteLeder &&
        avbruttplan?.av.fnr ===
          oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr &&
        new Date(sisteInnlogging) < new Date(avbruttplan.tidspunkt)
      );
    })
    .sort((o1, o2) => {
      return (
        getTime(o2.godkjentPlan?.avbruttPlan?.tidspunkt) -
        getTime(o1.godkjentPlan?.avbruttPlan?.tidspunkt)
      );
    });
};

export const finnNyesteTidligereOppfolgingsplanMedVirksomhet = (
  oppfolgingsplaner: Oppfolgingsplan[],
  virksomhetsnummer: string
) => {
  return finnTidligereOppfolgingsdialoger(oppfolgingsplaner).filter((plan) => {
    return plan.virksomhet?.virksomhetsnummer === virksomhetsnummer;
  })[0];
};

export const finnTidligereOppfolgingsdialoger = (
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  return sorterOppfolgingsplanerEtterSluttdato(
    oppfolgingsplaner.filter((oppfolgingsdialog) => {
      return erOppfolgingsplanTidligere(oppfolgingsdialog);
    })
  );
};
