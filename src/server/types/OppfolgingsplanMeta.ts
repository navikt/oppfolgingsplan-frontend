import {
  OppfolgingsplanDTO,
  VirksomhetDTO,
} from "../../schema/oppfolgingsplanSchema";
import { KontaktinfoDTO } from "../../schema/kontaktinfoSchema";
import { NarmesteLeder } from "../../schema/narmestelederSchema";
import { PersonV3DTO } from "../../schema/personSchemas";
import { Stilling } from "../../types/oppfolgingsplan";

export interface OppfolgingsplanMeta {
  person: PersonV3DTO;
  oppfolgingsplaner: OppfolgingsplanDTO[];
  virksomhet: VirksomhetDTO[];
  kontaktinfo: KontaktinfoDTO;
  stillinger: Stilling[];
  narmesteLedere: NarmesteLeder[];
}
