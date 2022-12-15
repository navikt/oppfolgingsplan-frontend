import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import {
  DineSykmeldteSykmelding,
  Sykmeldt,
} from "../../../schema/sykmeldtSchema";
import { differenceInDays } from "date-fns";

export const MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOLGING = 4;

interface FravaerPeriode {
  fom: Date;
  tom: Date;
}

const mapToPerioderDatesListSorted = (sykmelding: DineSykmeldteSykmelding) => {
  return sykmelding.mulighetForArbeid.perioder
    .map((periode) => {
      return { fom: new Date(periode.fom), tom: new Date(periode.tom) };
    })
    .sort(compareFomDate);
};

function compareFomDate(a: FravaerPeriode, b: FravaerPeriode) {
  if (a.fom < b.fom) {
    return -1;
  }
  if (a.fom > b.fom) {
    return 1;
  }
  return 0;
}

const erOppfolgingsplanGyldigForOppfolgingMedGrensedato = (
  fomLastSykefravar: Date,
  tomOppfolgingsplan: string
) => {
  const tomGrenseDato = new Date(
    fomLastSykefravar.getFullYear(),
    fomLastSykefravar.getMonth(),
    fomLastSykefravar.getDate()
  );

  tomGrenseDato.setHours(0, 0, 0, 0);
  tomGrenseDato.setMonth(
    fomLastSykefravar.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOLGING
  );
  return new Date(tomOppfolgingsplan) >= tomGrenseDato;
};

const getLastSykefravar = (dineSykmeldteMedSykmeldinger: Sykmeldt[]) => {
  let sykefravarList: FravaerPeriode[] = [];

  dineSykmeldteMedSykmeldinger.filter((dineSykmeldte) => {
    dineSykmeldte.sykmeldinger?.filter((sykmelding) => {
      const perioderDatesSorted = mapToPerioderDatesListSorted(sykmelding);

      let currentFravar = {
        fom: perioderDatesSorted[0].fom,
        tom: perioderDatesSorted[0].tom,
      };

      if (perioderDatesSorted.length === 1) {
        sykefravarList.push(currentFravar);
        return sykefravarList;
      }

      for (let i = 1; i < perioderDatesSorted.length; i++) {
        if (
          differenceInDays(
            perioderDatesSorted[i - 1].tom,
            perioderDatesSorted[i].fom
          ) < 16
        ) {
          currentFravar.tom = perioderDatesSorted[i].tom;
          if (i === perioderDatesSorted.length - 1) {
            sykefravarList.push({
              fom: currentFravar.fom,
              tom: currentFravar.tom,
            });
          }
        } else {
          sykefravarList.push({
            fom: currentFravar.fom,
            tom: currentFravar.tom,
          });
          currentFravar.fom = perioderDatesSorted[i].fom;
          currentFravar.tom = perioderDatesSorted[i].tom;
        }
      }
      return sykefravarList;
    });
  });
  return sykefravarList[sykefravarList.length - 1];
};

export const filterValidOppfolgingsplaner = (
  oppfolgingsplaner: Oppfolgingsplan[],
  dineSykmeldteMedSykmeldinger: Sykmeldt[]
): Oppfolgingsplan[] => {
  if (oppfolgingsplaner.length === 0) return [];

  const virksomhetsnummer =
    oppfolgingsplaner[0].virksomhet?.virksomhetsnummer!!;

  const dineSykmeldteMedSykmeldingerPaVirksomhet =
    dineSykmeldteMedSykmeldinger.filter((sykmeldt) => {
      return sykmeldt.orgnummer === virksomhetsnummer;
    });

  const lastSykefravar = getLastSykefravar(
    dineSykmeldteMedSykmeldingerPaVirksomhet
  );

  return oppfolgingsplaner.filter((oppfolgingsplan) => {
    if (oppfolgingsplan.godkjentPlan) {
      return erOppfolgingsplanGyldigForOppfolgingMedGrensedato(
        lastSykefravar.fom,
        oppfolgingsplan.godkjentPlan.gyldighetstidspunkt!!.tom!!
      );
    }
    return erOppfolgingsplanGyldigForOppfolgingMedGrensedato(
      lastSykefravar.fom,
      oppfolgingsplan.sistEndretDato
    );
  });
};
