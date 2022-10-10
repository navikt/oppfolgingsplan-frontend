import { NextApiResponse } from "next";
import {
  Oppfolgingsplan,
  Person,
  Stilling,
  Virksomhet,
} from "../../../../schema/oppfolgingsplanSchema";
import { Kontaktinfo } from "../../../../schema/kontaktinfoSchema";

export interface NextApiResponseOppfolgingsplanSM extends NextApiResponse {
  person: Person;
  oppfolgingsplaner: Oppfolgingsplan[];
  virksomhet: Virksomhet[];
  kontaktinfo: Kontaktinfo;
  stillinger: Stilling[];
}
