import {
  MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
  STATUS,
} from "../constants/konstanter";
import {
  ArbeidsgivereForGyldigeSykmeldinger,
  finnArbeidsgivereForGyldigeSykmeldinger,
} from "./sykmeldingUtils";
import { erGyldigDatoIFortiden, getTime } from "./dateUtils";
import { SykmeldingDTO } from "../schema/sykmeldingSchema";
import { OppfolgingsplanDTO } from "../schema/oppfolgingsplanSchema";
import { NarmesteLederDTO } from "../schema/narmestelederSchema";

export const inneholderGodkjenninger = (
  oppfolgingsplan: OppfolgingsplanDTO,
) => {
  return (
    oppfolgingsplan.godkjenninger && oppfolgingsplan.godkjenninger.length > 0
  );
};

export const erSykmeldingGyldigForOppfolgingMedGrensedato = (
  sykmelding: SykmeldingDTO,
  dato: Date,
) => {
  return (
    sykmelding.sykmeldingsperioder.filter((periode) => {
      const tomGrenseDato = new Date(dato);
      tomGrenseDato.setHours(0, 0, 0, 0);
      tomGrenseDato.setMonth(
        tomGrenseDato.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
      );
      return new Date(periode.tom) >= new Date(tomGrenseDato);
    }).length > 0
  );
};

export const erOppfolgingsplanKnyttetTilGyldigSykmeldingAG = (
  oppfolgingsplan: OppfolgingsplanDTO,
  orgnummer: string,
) => {
  return oppfolgingsplan.virksomhet?.virksomhetsnummer === orgnummer;
};

export const erOppfolgingsplanKnyttetTilGyldigSykmelding = (
  oppfolgingsplan: OppfolgingsplanDTO,
  sykmeldinger: SykmeldingDTO[],
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

export const erOppfolgingsplanAktiv = (oppfolgingsplan: OppfolgingsplanDTO) => {
  return (
    !oppfolgingsplan.godkjentPlan ||
    (oppfolgingsplan.status !== STATUS.AVBRUTT &&
      oppfolgingsplan.godkjentPlan.gyldighetstidspunkt?.tom &&
      !erGyldigDatoIFortiden(
        oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom,
      ))
  );
};

export const erOppfolgingsplanTidligere = (
  oppfolgingsplan: OppfolgingsplanDTO,
) => {
  return (
    oppfolgingsplan.godkjentPlan &&
    oppfolgingsplan.status !== STATUS.AVBRUTT &&
    oppfolgingsplan.godkjentPlan.gyldighetstidspunkt?.tom &&
    erGyldigDatoIFortiden(oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom)
  );
};

export const sorterOppfolgingsplanerEtterSluttdato = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
): OppfolgingsplanDTO[] => {
  return oppfolgingsplaner.sort((o1, o2) => {
    const plan1Tom = o1.godkjentPlan?.gyldighetstidspunkt?.tom;
    const plan2Tom = o2.godkjentPlan?.gyldighetstidspunkt?.tom;

    return getTime(plan2Tom) - getTime(plan1Tom);
  });
};

export const finnTidligereOppfolgingsplaner = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
) => {
  return sorterOppfolgingsplanerEtterSluttdato(
    oppfolgingsplaner.filter((oppfolgingsplan) => {
      return erOppfolgingsplanTidligere(oppfolgingsplan);
    }),
  );
};

export const harTidligereOppfolgingsplaner = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
) => {
  return finnTidligereOppfolgingsplaner(oppfolgingsplaner).length > 0;
};

export const harTidligereOppfolgingsplanMedVirksomhet = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  virksomhetsnummer: string,
): boolean => {
  return (
    finnNyesteTidligereOppfolgingsplanMedVirksomhet(
      oppfolgingsplaner,
      virksomhetsnummer,
    ) !== undefined
  );
};

export const finnAktiveOppfolgingsplaner = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  sykmeldinger?: SykmeldingDTO[],
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

export const erAktivOppfolgingsplanOpprettetMedArbeidsgiver = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  virksomhetsnummer: string,
) => {
  return (
    finnAktiveOppfolgingsplaner(oppfolgingsplaner).filter((plan) => {
      return plan.virksomhet?.virksomhetsnummer === virksomhetsnummer;
    }).length > 0
  );
};

export const hentAktivOppfolgingsplanOpprettetMedArbeidsgiver = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  virksomhetsnummer: string,
) => {
  return finnAktiveOppfolgingsplaner(oppfolgingsplaner).filter((plan) => {
    return plan.virksomhet?.virksomhetsnummer === virksomhetsnummer;
  })[0];
};

export const erOppfolgingsplanOpprettbarMedArbeidsgiver = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  arbeidsgiver: ArbeidsgivereForGyldigeSykmeldinger,
) => {
  return (
    arbeidsgiver.erAktivLederIVirksomhet &&
    !erAktivOppfolgingsplanOpprettetMedArbeidsgiver(
      oppfolgingsplaner,
      arbeidsgiver.virksomhetsnummer,
    )
  );
};

export const erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  sykmeldinger: SykmeldingDTO[],
  naermesteLedere: NarmesteLederDTO[],
) => {
  return (
    oppfolgingsplaner.length === 0 &&
    finnArbeidsgivereForGyldigeSykmeldinger(
      sykmeldinger,
      naermesteLedere,
    ).filter((arbeidsgiver) => {
      return arbeidsgiver.erAktivLederIVirksomhet;
    }).length === 0
  );
};

export const erOppfolgingsplanOpprettbarDirekte = (
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[],
  oppfolgingsplaner: OppfolgingsplanDTO[],
) => {
  return (
    arbeidsgivere.length === 1 &&
    !harTidligereOppfolgingsplaner(oppfolgingsplaner)
  );
};

export const finnNyesteTidligereOppfolgingsplanMedVirksomhet = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  virksomhetsnummer: string,
) => {
  return finnTidligereOppfolgingsplaner(oppfolgingsplaner).filter((plan) => {
    return plan.virksomhet.virksomhetsnummer === virksomhetsnummer;
  })[0];
};

export const finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt = (
  oppfolgingsplaner: OppfolgingsplanDTO[],
  virksomhetsnummer: string,
) => {
  return finnAktiveOppfolgingsplaner(oppfolgingsplaner).find(
    (oppfolgingsdialog) => {
      return (
        oppfolgingsdialog.virksomhet.virksomhetsnummer === virksomhetsnummer
      );
    },
  );
};

export const findAktivPlan = (
  aktivPlanId: number,
  allePlaner: OppfolgingsplanDTO[],
) => {
  return allePlaner.find((plan) => plan.id === aktivPlanId);
};
