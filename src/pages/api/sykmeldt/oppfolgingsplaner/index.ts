import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { NextApiResponseOppfolgingsplanSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import {
  Oppfolgingsplan,
  Person,
} from "../../../../schema/oppfolgingsplanSchema";
import { fetchPersonSM } from "server/data/sykmeldt/fetchPersonSM";
import { fetchVirksomhetSM } from "server/data/sykmeldt/fetchVirksomhetSM";
import { fetchKontaktinfoSM } from "server/data/sykmeldt/fetchKontaktinfoSM";
import { fetchArbeidsforholdSM } from "server/data/sykmeldt/fetchArbeidsforholdSM";
import { fetchNarmesteLedereSM } from "server/data/sykmeldt/fetchNarmesteLedereSM";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";
import { getOppfolgingsplanTokenX } from "../../../../server/utils/tokenX";
import { IAuthenticatedRequest } from "../../../../server/api/IAuthenticatedRequest";
import { getOppfolgingsplanerSM } from "../../../../server/service/oppfolgingsplanService";
import { isMockBackend } from "../../../../environments/publicEnv";
import activeMockSM from "../../../../server/data/mock/activeMockSM";

const findNarmesteLeder = (
  fnr?: string,
  virksomhetsnummer?: string | null,
  narmesteLedere?: NarmesteLeder[]
): NarmesteLeder | undefined => {
  return narmesteLedere?.find(
    (leder) =>
      leder.fnr == fnr &&
      leder.virksomhetsnummer == virksomhetsnummer &&
      leder.erAktiv
  );
};

const findName = (
  narmesteLedere: NarmesteLeder[],
  sykmeldt: Person,
  fnrToFind?: string | null
): string => {
  if (sykmeldt.fnr == fnrToFind) {
    return sykmeldt.navn;
  }

  const lederWithFnr = narmesteLedere.find((leder) => leder.fnr == fnrToFind);

  if (lederWithFnr) return lederWithFnr.navn;

  return "";
};

const handler = nc<NextApiRequest, NextApiResponse<Oppfolgingsplan[]>>(
  ncOptions
)
  .use(getIdportenToken)
  .use(
    async (
      req: IAuthenticatedRequest,
      res: NextApiResponseOppfolgingsplanSM,
      next
    ) => {
      if (isMockBackend) {
        res.oppfolgingsplaner = activeMockSM.oppfolgingsplaner;
        res.virksomhet = activeMockSM.virksomhet;
        res.person = activeMockSM.person;
        res.stillinger = [...activeMockSM.stillinger];
        res.kontaktinfo = activeMockSM.kontaktinfo;
        res.narmesteLedere = activeMockSM.narmesteLedere;
      } else {
        const oppfolgingsplanTokenx = await getOppfolgingsplanTokenX(
          req.idportenToken
        );
        const oppfolgingsplaner = await getOppfolgingsplanerSM(
          oppfolgingsplanTokenx
        );

        res.oppfolgingsplaner = oppfolgingsplaner;

        if (oppfolgingsplaner.length > 0) {
          const virksomhetPromise = fetchVirksomhetSM(
            oppfolgingsplanTokenx,
            oppfolgingsplaner
          );
          const personPromise = fetchPersonSM(
            oppfolgingsplanTokenx,
            oppfolgingsplaner
          );
          const kontaktinfoPromise = fetchKontaktinfoSM(
            oppfolgingsplanTokenx,
            oppfolgingsplaner
          );
          const arbeidsforholdPromise = fetchArbeidsforholdSM(
            oppfolgingsplanTokenx,
            oppfolgingsplaner
          );
          const narmesteLederePromise = fetchNarmesteLedereSM(
            oppfolgingsplanTokenx,
            oppfolgingsplaner
          );

          const [
            virksomhet,
            person,
            kontaktinfo,
            arbeidsforhold,
            narmesteLedere,
          ] = await Promise.all([
            virksomhetPromise,
            personPromise,
            kontaktinfoPromise,
            arbeidsforholdPromise,
            narmesteLederePromise,
          ]);

          res.person = person;
          res.stillinger = arbeidsforhold;
          res.virksomhet = virksomhet;
          res.kontaktinfo = kontaktinfo;
          res.narmesteLedere = narmesteLedere;
        }
      }
      next();
    }
  )
  .get(async (req: NextApiRequest, res: NextApiResponseOppfolgingsplanSM) => {
    const mappedPlaner: Oppfolgingsplan[] = res.oppfolgingsplaner.map(
      (oppfolgingsplan) => {
        const aktivNarmesteLeder = findNarmesteLeder(
          res.narmesteLedere.find(
            (leder) =>
              leder.virksomhetsnummer ==
              oppfolgingsplan.virksomhet?.virksomhetsnummer
          )?.fnr,
          oppfolgingsplan.virksomhet?.virksomhetsnummer,
          res.narmesteLedere
        );

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
          godkjenninger:
            oppfolgingsplan.godkjenninger &&
            oppfolgingsplan.godkjenninger.map((godkjenning) => {
              return {
                ...godkjenning,
                godkjentAv: {
                  ...godkjenning.godkjentAv,
                  navn: findName(
                    res.narmesteLedere,
                    res.person,
                    godkjenning.godkjentAv.fnr
                  ),
                },
              };
            }),
          arbeidsoppgaveListe:
            oppfolgingsplan.arbeidsoppgaveListe &&
            oppfolgingsplan.arbeidsoppgaveListe.map((oppgave) => {
              return {
                ...oppgave,
                opprettetAv: {
                  ...oppgave.opprettetAv,
                  navn: findName(
                    res.narmesteLedere,
                    res.person,
                    oppgave.opprettetAv.fnr
                  ),
                },
                sistEndretAv: {
                  ...oppgave.sistEndretAv,
                  navn: findName(
                    res.narmesteLedere,
                    res.person,
                    oppgave.sistEndretAv.fnr
                  ),
                },
              };
            }),
          tiltakListe:
            oppfolgingsplan.tiltakListe &&
            oppfolgingsplan.tiltakListe.map((tiltak) => {
              return {
                ...tiltak,
                opprettetAv: {
                  ...tiltak.opprettetAv,
                  navn: findName(
                    res.narmesteLedere,
                    res.person,
                    tiltak.opprettetAv.fnr
                  ),
                },
                sistEndretAv: {
                  ...tiltak.sistEndretAv,
                  navn: findName(
                    res.narmesteLedere,
                    res.person,
                    tiltak.sistEndretAv.fnr
                  ),
                },
                kommentarer:
                  tiltak.kommentarer &&
                  tiltak.kommentarer.map((kommentar) => {
                    return {
                      ...kommentar,
                      opprettetAv: {
                        ...kommentar.opprettetAv,
                        navn: findName(
                          res.narmesteLedere,
                          res.person,
                          kommentar.opprettetAv.fnr
                        ),
                      },
                      sistEndretAv: {
                        ...kommentar.sistEndretAv,
                        navn: findName(
                          res.narmesteLedere,
                          res.person,
                          kommentar.sistEndretAv.fnr
                        ),
                      },
                    };
                  }),
              };
            }),
          avbruttPlanListe: oppfolgingsplan.avbruttPlanListe,
          arbeidsgiver: {
            ...oppfolgingsplan.arbeidsgiver,
            naermesteLeder: aktivNarmesteLeder,
          },
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
          sistEndretAv: {
            ...oppfolgingsplan.sistEndretAv,
            navn: findName(
              res.narmesteLedere,
              res.person,
              oppfolgingsplan.sistEndretAv.fnr
            ),
          },
        };
      }
    );

    res.status(200).json(mappedPlaner);
  });

export default withSentry(handler);
