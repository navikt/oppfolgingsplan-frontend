import {
  OppfolgingsplanDTO,
  VirksomhetDTO,
} from "../../schema/oppfolgingsplanSchema";
import { KontaktinfoDTO } from "../../schema/kontaktinfoSchema";
import { PersonDTO } from "../../schema/personSchemas";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";

export interface OppfolgingsplanMeta {
  person: PersonDTO;
  oppfolgingsplaner: OppfolgingsplanDTO[];
  virksomhet: VirksomhetDTO[];
  kontaktinfo: KontaktinfoDTO;
  narmesteLedere: NarmesteLederDTO[];
}
