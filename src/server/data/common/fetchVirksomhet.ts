import { getVirksomhet } from "server/service/oppfolgingsplanService";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { notNull } from "../../utils/tsUtils";

const findAllVirksomhetsnummer = (oppfolgingsplaner: OppfolgingsplanDTO[]) => {
  const virksomhetsNummer = oppfolgingsplaner
    .map(({ virksomhet }) => {
      return virksomhet?.virksomhetsnummer;
    })
    .filter(notNull);

  return [...new Set(virksomhetsNummer)];
};

export const fetchVirksomhet = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: OppfolgingsplanDTO[]
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
