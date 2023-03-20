import {
  createArbeidsoppgave,
  createGjennomforing,
} from "../factories/oppfolgingsplan";
import { sykmeldtPerson } from "./person";

export const gjennomfoeringWithTilrettelegging = createGjennomforing();
export const arbeidsoppgaveCreatedBySM = createArbeidsoppgave({
  sistEndretAv: sykmeldtPerson,
  opprettetAv: sykmeldtPerson,
  gjennomfoering: gjennomfoeringWithTilrettelegging,
});
