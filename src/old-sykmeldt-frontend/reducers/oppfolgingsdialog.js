import * as actions from "../actions/oppfolgingsplan/oppfolgingsdialog_actions";
import {
  ARBEIDSOPPGAVE_LAGRET,
  ARBEIDSOPPGAVE_SLETTET,
} from "../actions/oppfolgingsplan/arbeidsoppgave_actions";
import {
  TILTAK_LAGRET,
  TILTAK_SLETTET,
} from "../actions/oppfolgingsplan/tiltak_actions";
import {
  KOMMENTAR_LAGRET,
  KOMMENTAR_SLETTET,
} from "../actions/oppfolgingsplan/kommentar_actions";
import { NULLSTILT_GODKJENNING } from "../actions/oppfolgingsplan/nullstillGodkjenning_actions";
import { DELT_MED_NAV } from "../actions/oppfolgingsplan/delmednav_actions";
import { DELT_MED_FASTLEGE } from "../actions/oppfolgingsplan/delMedFastlege_actions";
import {
  finnNyesteGodkjenning,
  skalDeleMedNav,
} from "../../common/utils/oppfolgingsdialogUtils";
import { toGjennomfoering } from "../../common/utils/arbeidsoppgaveUtils";

const initiellState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  oppretter: false,
  opprettet: false,
  opprettingFeilet: false,
  godkjenner: false,
  godkjent: false,
  godkjenningFeilet: false,
  opprettetId: 0,
  avviser: false,
  avvist: false,
  avvisFeilet: false,
  data: [],
};

const oppfolgingsdialoger = (state = initiellState, action = {}) => {
  switch (action.type) {
    case NULLSTILT_GODKJENNING: {
      const data = state.data.map((dialog) => {
        if (dialog.id === Number(action.id)) {
          return Object.assign({}, dialog, {
            godkjenninger: [],
            arbeidstaker: Object.assign({}, dialog.arbeidstaker),
            arbeidsgiver: Object.assign({}, dialog.arbeidsgiver, {
              naermesteLeder: Object.assign(
                {},
                dialog.arbeidsgiver.naermesteLeder
              ),
            }),
          });
        }
        return dialog;
      });

      return Object.assign({}, state, {
        data,
      });
    }
    case actions.OPPFOLGINGSDIALOGER_HENTET:
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      });
    case actions.HENTER_OPPFOLGINGSDIALOGER:
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
      });
    case actions.HENT_OPPFOLGINGSDIALOGER_FEILET:
      return Object.assign({}, state, {
        henter: false,
        hentet: false,
        hentingFeilet: true,
      });
    case actions.OPPRETTER_OPPFOLGINGSDIALOG: {
      return Object.assign({}, state, {
        oppretter: true,
        opprettet: false,
        opprettingFeilet: false,
      });
    }
    case actions.OPPFOLGINGSDIALOG_OPPRETTET: {
      return Object.assign({}, state, {
        oppretter: false,
        opprettet: true,
        opprettingFeilet: false,
        opprettetId: action.data,
      });
    }
    case actions.OPPRETT_OPPFOLGINGSDIALOG_FEILET: {
      return Object.assign({}, state, {
        oppretter: false,
        opprettingFeilet: true,
      });
    }
    case actions.GODKJENNER_DIALOG: {
      return Object.assign({}, state, {
        godkjenner: true,
        godkjenningFeilet: false,
        godkjent: false,
      });
    }
    case DELT_MED_FASTLEGE: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (Number(action.id) === oppfolgingsdialog.id) {
          return Object.assign({}, oppfolgingsdialog, {
            godkjentPlan: Object.assign({}, oppfolgingsdialog.godkjentPlan, {
              deltMedFastlege: true,
              deltMedFastlegeTidspunkt: new Date(),
            }),
          });
        }
        return oppfolgingsdialog;
      });
      return Object.assign({}, state, {
        data,
      });
    }
    case DELT_MED_NAV: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (Number(action.id) === oppfolgingsdialog.id) {
          return Object.assign({}, oppfolgingsdialog, {
            godkjentPlan: Object.assign({}, oppfolgingsdialog.godkjentPlan, {
              deltMedNAV: true,
              deltMedNAVTidspunkt: new Date(),
            }),
          });
        }
        return oppfolgingsdialog;
      });
      return Object.assign({}, state, {
        data,
      });
    }
    case actions.DIALOG_GODKJENT: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (Number(action.id) === oppfolgingsdialog.id) {
          if (
            oppfolgingsdialog.godkjenninger.length > 0 &&
            finnNyesteGodkjenning(oppfolgingsdialog.godkjenninger).godkjent
          ) {
            return Object.assign({}, oppfolgingsdialog, {
              godkjenninger: [],
              status: "AKTIV",
              godkjentPlan: {
                opprettetTidspunkt: new Date(),
                gyldighetstidspunkt: {
                  fom: action.gyldighetstidspunkt.fom,
                  tom: action.gyldighetstidspunkt.tom,
                  evalueres: action.gyldighetstidspunkt.evalueres,
                },
                deltMedNAV: skalDeleMedNav(action.delMedNav, oppfolgingsdialog),
                deltMedNAVTidspunkt: skalDeleMedNav(
                  action.delMedNav,
                  oppfolgingsdialog
                )
                  ? new Date()
                  : null,
              },
            });
          }

          return Object.assign({}, oppfolgingsdialog, {
            godkjenninger: [
              {
                godkjent: true,
                godkjenningsTidspunkt: new Date(),
                godkjentAv: oppfolgingsdialog.arbeidstaker,
                gyldighetstidspunkt: {
                  fom: action.gyldighetstidspunkt.fom,
                  tom: action.gyldighetstidspunkt.tom,
                  evalueres: action.gyldighetstidspunkt.evalueres,
                },
                delMedNav: action.delMedNav,
              },
            ],
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });
      return Object.assign({}, state, {
        data,
        godkjenner: false,
        godkjenningFeilet: false,
        godkjent: true,
      });
    }
    case actions.GODKJENN_DIALOG_FEILET: {
      return Object.assign({}, state, {
        godkjenner: false,
        godkjenningFeilet: true,
      });
    }

    case actions.AVVISER_DIALOG: {
      return Object.assign({}, state, {
        avviser: true,
        avvist: false,
        avvisFeilet: false,
      });
    }
    case ARBEIDSOPPGAVE_LAGRET: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (oppfolgingsdialog.id === Number(action.id)) {
          if (!action.arbeidsoppgave.arbeidsoppgaveId) {
            const nyArbeidsoppgave = Object.assign({}, action.arbeidsoppgave, {
              arbeidsoppgaveId: action.data,
              arbeidsoppgavenavn: action.arbeidsoppgave.arbeidsoppgavenavn,
              sistEndretAv: oppfolgingsdialog.arbeidstaker,
              opprettetDato: new Date(),
              sistEndretDato: new Date(),
              erVurdertAvSykmeldt: true,
              opprettetAv: oppfolgingsdialog.arbeidstaker,
              gjennomfoering: toGjennomfoering(action.arbeidsoppgave),
            });
            return Object.assign({}, oppfolgingsdialog, {
              arbeidsoppgaveListe: [
                ...oppfolgingsdialog.arbeidsoppgaveListe,
                nyArbeidsoppgave,
              ],
              sistEndretAv: oppfolgingsdialog.arbeidstaker,
              sistEndretDato: new Date(),
            });
          }
          const arbeidsoppgaveListe = [
            ...oppfolgingsdialog.arbeidsoppgaveListe,
          ].map((arbeidsoppgave) => {
            if (
              Number(action.arbeidsoppgave.arbeidsoppgaveId) ===
              arbeidsoppgave.arbeidsoppgaveId
            ) {
              return Object.assign({}, arbeidsoppgave, {
                sistEndretAv: oppfolgingsdialog.arbeidstaker,
                sistEndretDato: new Date(),
                arbeidsoppgavenavn: action.arbeidsoppgave.arbeidsoppgavenavn,
                erVurdertAvSykmeldt: true,
                gjennomfoering: toGjennomfoering(action.arbeidsoppgave),
              });
            }
            return arbeidsoppgave;
          });
          return Object.assign({}, oppfolgingsdialog, {
            arbeidsoppgaveListe,
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });

      return Object.assign({}, state, {
        data,
      });
    }

    case TILTAK_LAGRET: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (oppfolgingsdialog.id === Number(action.id)) {
          if (!action.tiltak.tiltakId) {
            const nyttTiltak = Object.assign({}, action.tiltak, {
              tiltakId: action.data,
              tiltaknavn: action.tiltak.tiltaknavn,
              beskrivelse: action.tiltak.beskrivelse,
              beskrivelseIkkeAktuelt: action.tiltak.beskrivelseIkkeAktuelt,
              sistEndretAv: oppfolgingsdialog.arbeidstaker,
              opprettetDato: new Date(),
              sistEndretDato: new Date(),
              opprettetAv: oppfolgingsdialog.arbeidstaker,
              gjennomfoering: action.tiltak.gjennomfoering,
              status: action.tiltak.status,
              fom: action.tiltak.fom,
              tom: action.tiltak.tom,
              kommentarer: [],
            });
            return Object.assign({}, oppfolgingsdialog, {
              tiltakListe: [nyttTiltak, ...oppfolgingsdialog.tiltakListe],
              sistEndretAv: oppfolgingsdialog.arbeidstaker,
              sistEndretDato: new Date(),
            });
          }
          const tiltakListe = [...oppfolgingsdialog.tiltakListe].map(
            (tiltak) => {
              if (Number(action.tiltak.tiltakId) === tiltak.tiltakId) {
                return Object.assign({}, tiltak, {
                  sistEndretAv: oppfolgingsdialog.arbeidstaker,
                  sistEndretDato: new Date(),
                  tiltaknavn: action.tiltak.tiltaknavn,
                  beskrivelse: action.tiltak.beskrivelse,
                  beskrivelseIkkeAktuelt: action.tiltak.beskrivelseIkkeAktuelt,
                  gjennomfoering: action.tiltak.gjennomfoering,
                  status: action.tiltak.status,
                  fom: action.tiltak.fom,
                  tom: action.tiltak.tom,
                });
              }
              return tiltak;
            }
          );
          return Object.assign({}, oppfolgingsdialog, {
            tiltakListe,
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });

      return Object.assign({}, state, {
        data,
      });
    }
    case TILTAK_SLETTET: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (oppfolgingsdialog.id === Number(action.id)) {
          const tiltakListe = oppfolgingsdialog.tiltakListe.filter((tiltak) => {
            return action.tiltakId !== tiltak.tiltakId;
          });
          return Object.assign({}, oppfolgingsdialog, {
            tiltakListe,
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });

      return Object.assign({}, state, {
        data,
      });
    }
    case ARBEIDSOPPGAVE_SLETTET: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (oppfolgingsdialog.id === Number(action.id)) {
          const arbeidsoppgaveListe =
            oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
              return (
                action.arbeidsoppgaveId !== arbeidsoppgave.arbeidsoppgaveId
              );
            });
          return Object.assign({}, oppfolgingsdialog, {
            arbeidsoppgaveListe,
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });

      return Object.assign({}, state, {
        data,
      });
    }
    case KOMMENTAR_LAGRET: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (oppfolgingsdialog.id === Number(action.id)) {
          const tiltakListe = [...oppfolgingsdialog.tiltakListe].map(
            (tiltak) => {
              if (tiltak.tiltakId === Number(action.tiltakId)) {
                if (!action.kommentar.kommentarId) {
                  const nyKommentar = Object.assign({}, action.kommentar, {
                    id: action.data,
                    tekst: action.kommentar.tekst,
                    opprettetTidspunkt: new Date(),
                    opprettetAv: oppfolgingsdialog.arbeidstaker,
                    sistEndretAv: oppfolgingsdialog.arbeidstaker,
                  });
                  return Object.assign({}, tiltak, {
                    kommentarer: [nyKommentar, ...tiltak.kommentarer],
                    sistEndretAv: oppfolgingsdialog.arbeidstaker,
                    sistEndretDato: new Date(),
                  });
                }
              }
              return tiltak;
            }
          );
          return Object.assign({}, oppfolgingsdialog, {
            tiltakListe,
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });
      return Object.assign({}, state, {
        data,
      });
    }
    case KOMMENTAR_SLETTET: {
      const data = state.data.map((oppfolgingsdialog) => {
        if (oppfolgingsdialog.id === Number(action.id)) {
          const tiltakListe = [...oppfolgingsdialog.tiltakListe].map(
            (tiltak) => {
              if (tiltak.tiltakId === Number(action.tiltakId)) {
                const kommentarer = [...tiltak.kommentarer].filter(
                  (kommentar) => {
                    return action.kommentarId !== kommentar.id;
                  }
                );
                return Object.assign({}, tiltak, {
                  kommentarer,
                  sistEndretAv: oppfolgingsdialog.arbeidstaker,
                  sistEndretDato: new Date(),
                });
              }
              return tiltak;
            }
          );
          return Object.assign({}, oppfolgingsdialog, {
            tiltakListe,
            sistEndretAv: oppfolgingsdialog.arbeidstaker,
            sistEndretDato: new Date(),
          });
        }
        return oppfolgingsdialog;
      });
      return Object.assign({}, state, {
        data,
      });
    }
    case actions.DIALOG_AVVIST: {
      return Object.assign({}, state, {
        data,
        avviser: false,
        avvist: true,
        avvisFeilet: false,
      });
    }
    case actions.AVVIS_DIALOG_FEILET: {
      return Object.assign({}, state, {
        godkjenner: false,
        avvist: false,
        avvisFeilet: true,
      });
    }
    default:
      return state;
  }
};

export default oppfolgingsdialoger;
