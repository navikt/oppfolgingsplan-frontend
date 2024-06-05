import {
  OppfolgingsplanDTO,
  VirksomhetDTO,
} from "../../schema/oppfolgingsplanSchema";
import { KontaktinfoDTO } from "../../schema/kontaktinfoSchema";
import { PersonV3DTO } from "../../schema/personSchemas";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";

export interface OppfolgingsplanMeta {
  person: PersonV3DTO;
  oppfolgingsplaner: OppfolgingsplanDTO[];
  virksomhet: VirksomhetDTO[];
  kontaktinfo: KontaktinfoDTO;
  narmesteLedere: NarmesteLederDTO[];
}
