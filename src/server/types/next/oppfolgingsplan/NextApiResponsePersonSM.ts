import { NextApiResponse } from "next";
import { Person } from "../../../../schema/oppfolgingsplanSchema";

export interface NextApiResponsePersonSM extends NextApiResponse {
  person: Person;
}
