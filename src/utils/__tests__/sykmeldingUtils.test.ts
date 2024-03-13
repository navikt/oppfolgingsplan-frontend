import {
  ArbeidsgivereForGyldigeSykmeldinger,
  finnArbeidsgivereForGyldigeSykmeldinger,
} from "../sykmeldingUtils";
import { SykmeldingDTO } from "../../schema/sykmeldingSchema";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";
import { expect } from "@jest/globals";
import { leggTilDagerPaDato } from "../dateUtils";

describe("finnArbeidsgivereForGyldigeSykmeldinger", () => {
  it("should return an array of unique employers for valid sick notes", () => {
    const sykmeldinger: SykmeldingDTO[] = [
      {
        id: "1",
        fnr: "123",
        sykmeldingsperioder: [
          {
            fom: leggTilDagerPaDato(new Date(), -100).toISOString(),
            tom: leggTilDagerPaDato(new Date(), 100).toISOString(),
          },
        ],
        organisasjonsinformasjon: { orgnummer: "123", orgNavn: "Org1" },
      },
      {
        id: "2",
        fnr: "123",
        sykmeldingsperioder: [
          {
            fom: leggTilDagerPaDato(new Date(), -33).toISOString(),
            tom: leggTilDagerPaDato(new Date(), 33).toISOString(),
          },
        ],
        organisasjonsinformasjon: { orgnummer: "123", orgNavn: "Org1" },
      },
    ];
    const naermesteLedere: NarmesteLederDTO[] = [
      {
        fnr: "123",
        virksomhetsnummer: "123",
        navn: "Leder1",
        aktivTom: null,
        epost: null,
        tlf: null,
        sistInnlogget: null,
        samtykke: null,
        erAktiv: true,
      },
      {
        fnr: "22223",
        virksomhetsnummer: "123",
        navn: "Leder2",
        aktivTom: null,
        epost: null,
        tlf: null,
        sistInnlogget: null,
        samtykke: null,
        erAktiv: false,
      },
    ];
    const expected: ArbeidsgivereForGyldigeSykmeldinger[] = [
      {
        virksomhetsnummer: "123",
        organisasjonsnavn: "Org1",
        erAktivLederIVirksomhet: true,
        naermesteLederNavn: "Leder1",
      },
    ];

    const result = finnArbeidsgivereForGyldigeSykmeldinger(
      sykmeldinger,
      naermesteLedere,
    );

    expect(result).toEqual(expected);
  });
});
