import {
  Oppfolgingsplan,
  Person,
  Stilling,
  Virksomhet,
} from "../../schema/oppfolgingsplanSchema";
import { Kontaktinfo } from "../../schema/kontaktinfoSchema";
import { NarmesteLeder } from "../../schema/narmestelederSchema";

export interface OppfolgingsplanMeta {
  person: Person;
  oppfolgingsplaner: Oppfolgingsplan[];
  virksomhet: Virksomhet[];
  kontaktinfo: Kontaktinfo;
  stillinger: Stilling[];
  narmesteLedere: NarmesteLeder[];
}
