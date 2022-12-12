import { getArbeidsforholdSM } from "server/service/oppfolgingsplanService";
import {
  Oppfolgingsplan,
  Stilling,
} from "../../../schema/oppfolgingsplanSchema";
import { notNull } from "../../utils/tsUtils";

interface ArbeidsforholdQueryParams {
  fnr: string;
  fom: string;
  virksomhetsnummer: string;
}

export const fetchArbeidsforholdSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
): Promise<Stilling[]> => {
  const unikeArbeidsforhold: ArbeidsforholdQueryParams[] = [
    ...new Set(
      oppfolgingsplaner
        .map((it) => {
          if (!it.arbeidstaker.fnr || !it.virksomhet?.virksomhetsnummer) return;
          return {
            fnr: it.arbeidstaker.fnr,
            fom: it.opprettetDato,
            virksomhetsnummer: it.virksomhet.virksomhetsnummer,
          };
        })
        .filter(notNull)
    ),
  ];

  if (unikeArbeidsforhold.length === 0) {
    return [];
  }

  return (
    await Promise.all(
      unikeArbeidsforhold.map(async ({ fnr, virksomhetsnummer, fom }) => {
        const arbeidsforhold = await getArbeidsforholdSM(
          oppfolgingsplanTokenX,
          fnr,
          virksomhetsnummer,
          fom
        );

        return arbeidsforhold.map(({ yrke, prosent }) => ({
          yrke,
          prosent,
          virksomhetsnummer,
          fom,
        }));
      })
    )
  ).flat();
};
