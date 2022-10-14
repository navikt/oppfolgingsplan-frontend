import {
  MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
  STATUS,
} from "../konstanter";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "./sykmeldingUtils";
import { erGyldigDatoIFortiden } from "./dateUtils";

export const inneholderGodkjenninger = (oppfolgingsdialog) => {
  return oppfolgingsdialog.godkjenninger.length > 0;
};

export const inneholderGodkjenningerAvArbeidstaker = (oppfolgingsdialog) => {
  return (
    oppfolgingsdialog.godkjenninger.length > 0 &&
    oppfolgingsdialog.godkjenninger[0].godkjent &&
    oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr ===
      oppfolgingsdialog.arbeidstaker.fnr
  );
};

export const erSykmeldingGyldigForOppfolgingMedGrensedato = (
  sykmelding,
  dato
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

export const erOppfolgingsdialogKnyttetTilGyldigSykmelding = (
  oppfolgingsdialog,
  sykmeldinger
) => {
  const dagensDato = new Date();
  return (
    sykmeldinger.filter((sykmelding) => {
      return (
        oppfolgingsdialog.virksomhet.virksomhetsnummer ===
          sykmelding.organisasjonsinformasjon.orgnummer &&
        erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato)
      );
    }).length > 0
  );
};

export const erOppfolgingsdialogAktiv = (oppfolgingsdialog) => {
  return (
    !oppfolgingsdialog.godkjentPlan ||
    (oppfolgingsdialog.status !== STATUS.AVBRUTT &&
      !erGyldigDatoIFortiden(
        oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
      ))
  );
};

export const erOppfolgingsdialogTidligere = (oppfolgingsdialog) => {
  return (
    oppfolgingsdialog.godkjentPlan &&
    erGyldigDatoIFortiden(
      oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
    ) &&
    oppfolgingsdialog.status !== STATUS.AVBRUTT
  );
};

export const sorterOppfolgingsdialogerEtterSluttdato = (
  oppfolgingsdialoger
) => {
  return oppfolgingsdialoger.sort((o1, o2) => {
    return (
      new Date(o2.godkjentPlan.gyldighetstidspunkt.tom) -
      new Date(o1.godkjentPlan.gyldighetstidspunkt.tom)
    );
  });
};

export const finnTidligereOppfolgingsdialoger = (oppfolgingsdialoger) => {
  return sorterOppfolgingsdialogerEtterSluttdato(
    oppfolgingsdialoger.filter((oppfolgingsdialog) => {
      return erOppfolgingsdialogTidligere(oppfolgingsdialog);
    })
  );
};

export const harTidligereOppfolgingsdialoger = (oppfolgingsplaner) => {
  return finnTidligereOppfolgingsdialoger(oppfolgingsplaner).length > 0;
};

export const finnAktiveOppfolgingsdialoger = (
  oppfolgingsdialoger,
  sykmeldinger
) => {
  if (!sykmeldinger) {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
      return (
        !oppfolgingsdialog.godkjentPlan ||
        erOppfolgingsdialogAktiv(oppfolgingsdialog)
      );
    });
  }
  return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
    return (
      erOppfolgingsdialogKnyttetTilGyldigSykmelding(
        oppfolgingsdialog,
        sykmeldinger
      ) &&
      (!oppfolgingsdialog.godkjentPlan ||
        (oppfolgingsdialog.status !== STATUS.AVBRUTT &&
          !erGyldigDatoIFortiden(
            oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
          )))
    );
  });
};

export const finnBrukersSisteInnlogging = (oppfolgingsplaner) => {
  const innlogginger = oppfolgingsplaner.map((oppfolgingsplan) => {
    return new Date(oppfolgingsplan.arbeidstaker.sistInnlogget);
  });
  return new Date(Math.max.apply(null, innlogginger));
};

export const erAktivOppfolgingsdialogOpprettetMedArbeidsgiver = (
  oppfolgingsdialoger,
  virksomhetsnummer
) => {
  return (
    finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((dialog) => {
      return dialog.virksomhet.virksomhetsnummer === virksomhetsnummer;
    }).length > 0
  );
};

export const hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver = (
  oppfolgingsdialoger,
  virksomhetsnummer
) => {
  return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter((dialog) => {
    return dialog.virksomhet.virksomhetsnummer === virksomhetsnummer;
  })[0];
};

export const erOppfolgingsdialogOpprettbarMedArbeidsgiver = (
  oppfolgingsdialoger,
  arbeidsgiver
) => {
  return (
    arbeidsgiver.harNaermesteLeder &&
    !erAktivOppfolgingsdialogOpprettetMedArbeidsgiver(
      oppfolgingsdialoger,
      arbeidsgiver.virksomhetsnummer
    )
  );
};

export const erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver = (
  oppfolgingsdialoger,
  arbeidsgivere
) => {
  return (
    arbeidsgivere.filter((arbeidsgiver) => {
      return erOppfolgingsdialogOpprettbarMedArbeidsgiver(
        oppfolgingsdialoger,
        arbeidsgiver
      );
    }).length > 0
  );
};

export const erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere = (
  oppfolgingsdialoger,
  sykmeldinger,
  naermesteLedere
) => {
  return (
    oppfolgingsdialoger.length === 0 &&
    finnArbeidsgivereForGyldigeSykmeldinger(
      sykmeldinger,
      naermesteLedere
    ).filter((arbeidsgiver) => {
      return arbeidsgiver.harNaermesteLeder;
    }).length === 0
  );
};

export const erOppfolgingsplanOpprettbarDirekte = (
  arbeidsgivere,
  oppfolgingsplaner
) => {
  return (
    arbeidsgivere.length === 1 &&
    !harTidligereOppfolgingsdialoger(oppfolgingsplaner)
  );
};

export const finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging = (
  oppfolgingsplaner
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
        oppfolgingsplan.arbeidsgiver.naermesteLeder &&
        avbruttplan.av.fnr ===
          oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr &&
        new Date(sisteInnlogging) < new Date(avbruttplan.tidspunkt)
      );
    })
    .sort((o1, o2) => {
      return (
        new Date(o2.godkjentPlan.avbruttPlan.tidspunkt) -
        new Date(o2.godkjentPlan.avbruttPlan.tidspunkt)
      );
    });
};

export const finnOppfolgingsdialogMotpartNavn = (oppfolgingsdialog) => {
  return oppfolgingsdialog.virksomhet.navn;
};

export const finnSistEndretAvNavn = (oppfolgingsplan) => {
  return oppfolgingsplan.sistEndretAv.navn;
};
