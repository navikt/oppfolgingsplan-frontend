import {
  MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
  STATUS,
} from "../konstanter";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "./sykmeldingUtils";
import { erGyldigDatoIFortiden } from "./dateUtils";

export const hentGodkjenningsTidspunkt = (oppfolgingsplan) => {
  return oppfolgingsplan.godkjenninger.filter((godkjenning) => {
    return godkjenning.godkjent === true;
  })[0].gyldighetstidspunkt;
};

export const finnNyesteGodkjenning = (godkjenninger) => {
  return godkjenninger.sort((g1, g2) => {
    return (
      new Date(g2.godkjenningsTidspunkt) - new Date(g1.godkjenningsTidspunkt)
    );
  })[0];
};

export const harNaermesteLeder = (oppfolgingsdialog) => {
  return oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr;
};

export const erIkkeOppfolgingsdialogUtfylt = (oppfolgingsplan) => {
  return (
    oppfolgingsplan.arbeidsoppgaveListe.length === 0 ||
    oppfolgingsplan.tiltakListe.length === 0
  );
};

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

export const inneholderGodkjentPlan = (oppfolgingsdialog) => {
  return oppfolgingsdialog.godkjentPlan;
};

export function getOppfolgingsdialog(oppfolgingsdialoger, id) {
  return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
    return oppfolgingsdialog.id.toString() === id.toString();
  })[0];
}

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

export const finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt = (
  oppfolgingsdialoger,
  virksomhetsnummer
) => {
  return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger).filter(
    (oppfolgingsdialog) => {
      return (
        oppfolgingsdialog.virksomhet.virksomhetsnummer === virksomhetsnummer
      );
    }
  )[0];
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

export const isEmpty = (array) => {
  return array.length === 0;
};

const idAlleredeFunnet = (planer, id) => {
  return (
    planer.filter((plan) => {
      return plan.id === id;
    }).length > 0
  );
};

export const oppgaverOppfoelgingsdialoger = (
  oppfolgingsdialoger,
  sykmeldinger
) => {
  const oppfolgingdialogerKnyttetTilGyldigSykmelding =
    oppfolgingsdialoger.filter((plan) => {
      return erOppfolgingsdialogKnyttetTilGyldigSykmelding(plan, sykmeldinger);
    });
  const avventendeGodkjenninger =
    oppfolgingdialogerKnyttetTilGyldigSykmelding.filter((plan) => {
      return (
        plan.godkjenninger.length > 0 &&
        plan.arbeidstaker.fnr !==
          finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr &&
        finnNyesteGodkjenning(plan.godkjenninger).godkjent
      );
    });
  const nyePlaner = oppfolgingdialogerKnyttetTilGyldigSykmelding.filter(
    (plan) => {
      return (
        plan.arbeidstaker.sistInnlogget === null &&
        plan.status === STATUS.UNDER_ARBEID &&
        plan.sistEndretAv.fnr !== plan.arbeidstaker.fnr &&
        !idAlleredeFunnet(avventendeGodkjenninger, plan.id)
      );
    }
  );

  return {
    nyePlaner,
    avventendeGodkjenninger,
  };
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

export const finnNyesteTidligereOppfolgingsdialogMedVirksomhet = (
  oppfolgingsdialoger,
  virksomhetsnummer
) => {
  return finnTidligereOppfolgingsdialoger(oppfolgingsdialoger).filter(
    (oppfolgingdialog) => {
      return (
        oppfolgingdialog.virksomhet.virksomhetsnummer === virksomhetsnummer
      );
    }
  )[0];
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

export const skalDeleMedNav = (delMedNav, oppfolgingsdialog) => {
  return (
    delMedNav ||
    oppfolgingsdialog.godkjenninger.find((godkjenning) => {
      return godkjenning.delMedNav;
    })
  );
};

export const erArbeidstakerEgenLeder = (oppfolgingsdialog) => {
  return (
    oppfolgingsdialog.arbeidstaker &&
    oppfolgingsdialog.arbeidsgiver.naermesteLeder &&
    oppfolgingsdialog.arbeidstaker.fnr ===
      oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr
  );
};
