import { NextApiResponse } from "next";
import {
  Oppfolgingsplan,
  Person,
  Virksomhet,
} from "../../../../schema/oppfolgingsplanSchema";

export interface NextApiResponseOppfolgingsplanSM extends NextApiResponse {
  person: Person;
  oppfolgingsplaner: Oppfolgingsplan[];
  virksomhet: Virksomhet[];
}
