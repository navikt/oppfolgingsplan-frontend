import {
  OppfolgingsplanDTO,
  VirksomhetDTO,
} from "../../schema/oppfolgingsplanSchema";
import { KontaktinfoDTO } from "../../schema/kontaktinfoSchema";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";
import { PersonV3DTO } from "../../schema/personSchemas";

export interface OppfolgingsplanMeta {
  person: PersonV3DTO;
  oppfolgingsplaner: OppfolgingsplanDTO[];
  virksomhet: VirksomhetDTO[];
  kontaktinfo: KontaktinfoDTO;
  narmesteLedere: NarmesteLederDTO[];
}
