import { getVirksomhet } from "server/service/oppfolgingsplanService";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { notNull } from "../../utils/tsUtils";

const findAllVirksomhetsnummer = (oppfolgingsplaner: Oppfolgingsplan[]) => {
  const virksomhetsNummer = oppfolgingsplaner
    .map(({ virksomhet }) => {
      return virksomhet?.virksomhetsnummer;
    })
    .filter(notNull);

  return [...new Set(virksomhetsNummer)];
};

export const fetchVirksomhet = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  const alleVirksomhetsnummer = findAllVirksomhetsnummer(oppfolgingsplaner);

  if (alleVirksomhetsnummer.length === 0) {
    return [];
  }

  const virksomhetPromises = alleVirksomhetsnummer.map(async (it) => {
    return await getVirksomhet(oppfolgingsplanTokenX, it);
  });

  return Promise.all(virksomhetPromises);
};
