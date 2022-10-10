import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { fetchOppfolgingsplanerSM } from "@/server/data/sykmeldt/fetchOppfolgingsplanerSM";
import { NextApiResponseOppfolgingsplanSM } from "@/server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { fetchPersonSM } from "@/server/data/sykmeldt/fetchPersonSM";
import { fetchVirksomhetSM } from "@/server/data/sykmeldt/fetchVirksomhetSM";
import { fetchKontaktinfoSM } from "@/server/data/sykmeldt/fetchKontaktinfoSM";
import { fetchArbeidsforholdSM } from "@/server/data/sykmeldt/fetchArbeidsforholdSM";

const handler = nc<NextApiRequest, NextApiResponse<Oppfolgingsplan[]>>(
  ncOptions
)
  .use(getIdportenToken)
  .use(fetchOppfolgingsplanerSM)
  .use(fetchVirksomhetSM)
  .use(fetchPersonSM)
  .use(fetchKontaktinfoSM)
  .use(fetchArbeidsforholdSM)
  .get(async (req: NextApiRequest, res: NextApiResponseOppfolgingsplanSM) => {
    const mappedPlaner: Oppfolgingsplan[] = res.oppfolgingsplaner.map(
      (oppfolgingsplan) => {
        return {
          id: oppfolgingsplan.id,
          sistEndretDato: oppfolgingsplan.sistEndretDato,
          opprettetDato: oppfolgingsplan.opprettetDato,
          status: oppfolgingsplan.status,
          virksomhet: {
            virksomhetsnummer:
              oppfolgingsplan.virksomhet?.virksomhetsnummer || null,
            navn:
              res.virksomhet.find(
                (v) =>
                  v.virksomhetsnummer ==
                  oppfolgingsplan.virksomhet?.virksomhetsnummer
              )?.navn || null,
          },
          godkjentPlan: oppfolgingsplan.godkjentPlan,
          godkjenninger: oppfolgingsplan.godkjenninger,
          arbeidsoppgaveListe: oppfolgingsplan.arbeidsoppgaveListe,
          tiltakListe: oppfolgingsplan.tiltakListe,
          avbruttPlanListe: oppfolgingsplan.avbruttPlanListe,
          arbeidsgiver: oppfolgingsplan.arbeidsgiver,
          arbeidstaker: {
            ...oppfolgingsplan.arbeidstaker,
            navn: res.person.navn,
            epost: res.kontaktinfo.epost,
            tlf: res.kontaktinfo.tlf,
            stillinger: res.stillinger
              .filter(
                (stilling) =>
                  stilling.virksomhetsnummer ==
                  oppfolgingsplan.virksomhet?.virksomhetsnummer
              )
              .filter((stilling) => {
                return (
                  !!stilling.fom &&
                  new Date(stilling.fom) <
                    new Date(oppfolgingsplan.opprettetDato)
                );
              }),
          },
          sistEndretAv: oppfolgingsplan.sistEndretAv,
        };
      }
    );

    res.status(200).json(mappedPlaner);
  });

export default withSentry(handler);
