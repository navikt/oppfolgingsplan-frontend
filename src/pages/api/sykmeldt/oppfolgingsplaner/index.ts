import { NextApiRequest, NextApiResponse } from "next";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { fetchOppfolgingsplanerMetaSM } from "../../../../server/data/sykmeldt/fetchOppfolgingsplanerMetaSM";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { mapGodkjenningerSM } from "../../../../server/data/mapping/mapGodkjenningerSM";
import { mapArbeidsoppgaveListeSM } from "../../../../server/data/mapping/mapArbeidsoppgaveListeSM";
import { mapTiltakListeSM } from "../../../../server/data/mapping/mapTiltakListeSM";
import { mapVirksomhetSM } from "../../../../server/data/mapping/mapVirksomhetSM";
import { findNameSM } from "../../../../server/data/mapping/findNameSM";
import { mapArbeidstakerSM } from "../../../../server/data/mapping/mapArbeidstakerSM";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const oppfolgingplanerMeta = await fetchOppfolgingsplanerMetaSM(req);

  const mappedPlaner: Oppfolgingsplan[] =
    oppfolgingplanerMeta?.oppfolgingsplaner.map((oppfolgingsplan) => {
      return {
        id: oppfolgingsplan.id,
        sistEndretDato: oppfolgingsplan.sistEndretDato,
        opprettetDato: oppfolgingsplan.opprettetDato,
        status: oppfolgingsplan.status,
        virksomhet: mapVirksomhetSM(oppfolgingsplan, oppfolgingplanerMeta),
        godkjentPlan: oppfolgingsplan.godkjentPlan,
        godkjenninger: mapGodkjenningerSM(
          oppfolgingsplan,
          oppfolgingplanerMeta
        ),
        arbeidsoppgaveListe: mapArbeidsoppgaveListeSM(
          oppfolgingsplan,
          oppfolgingplanerMeta
        ),
        tiltakListe: mapTiltakListeSM(oppfolgingsplan, oppfolgingplanerMeta),
        avbruttPlanListe: oppfolgingsplan.avbruttPlanListe,
        arbeidsgiver: {
          ...oppfolgingsplan.arbeidsgiver,
          naermesteLeder: oppfolgingplanerMeta.narmesteLedere.find((leder) => {
            return (
              leder.virksomhetsnummer ===
                oppfolgingsplan.virksomhet?.virksomhetsnummer && leder.erAktiv
            );
          }),
        },
        arbeidstaker: mapArbeidstakerSM(oppfolgingsplan, oppfolgingplanerMeta),
        sistEndretAv: {
          ...oppfolgingsplan.sistEndretAv,
          navn: findNameSM(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            oppfolgingsplan.sistEndretAv.fnr
          ),
        },
      };
    }) || [];

  res.status(200).json(mappedPlaner);
};

export default beskyttetApi(handler);
