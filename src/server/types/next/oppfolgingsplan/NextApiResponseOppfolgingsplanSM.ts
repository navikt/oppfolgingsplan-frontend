import { NextApiResponse } from "next";
import {
  Oppfolgingsplan,
  Person,
  Virksomhet,
} from "../../../../schema/oppfolgingsplanSchema";
import { Kontaktinfo } from "../../../../schema/kontaktinfoSchema";

export interface NextApiResponseOppfolgingsplanSM extends NextApiResponse {
  person: Person;
  oppfolgingsplaner: Oppfolgingsplan[];
  virksomhet: Virksomhet[];
  kontaktinfo: Kontaktinfo;
}
