import { getVirksomhetSM } from "server/service/oppfolgingsplanService";
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

export const fetchVirksomhetSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  const alleVirksomhetsnummer = findAllVirksomhetsnummer(oppfolgingsplaner);

  if (alleVirksomhetsnummer.length === 0) {
    return [];
  }

  const virksomhetPromises = alleVirksomhetsnummer.map(async (it) => {
    return await getVirksomhetSM(oppfolgingsplanTokenX, it);
  });

  return Promise.all(virksomhetPromises);
};
