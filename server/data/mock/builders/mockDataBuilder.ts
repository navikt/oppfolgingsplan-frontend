import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";
import { Brev } from "types/shared/brev";
import { Sykmeldt } from "types/shared/sykmeldt";

interface IMockData {
  sykmeldt?: Sykmeldt; //For arbeidsgiver
  brev: Brev[];
  motebehov: MotebehovDTO;
}

export class MockDataBuilder {
  private readonly mockData: IMockData;

  constructor() {
    this.mockData = {
      sykmeldt: undefined,
      brev: [],
      motebehov: { visMotebehov: false, skjemaType: null, motebehov: null },
    };
  }

  withSykmeldt(isSykmeldt: boolean): MockDataBuilder {
    this.mockData.sykmeldt = isSykmeldt
      ? {
          narmestelederId: "123",
          orgnummer: "000111222",
          fnr: "01010112345",
          navn: "Kreativ Hatt",
          aktivSykmelding: true,
        }
      : undefined;
    return this;
  }

  withBrev(brev: Brev): MockDataBuilder {
    this.mockData.brev.push(brev);
    return this;
  }

  withMotebehov(motebehov: MotebehovDTO) {
    this.mockData.motebehov = motebehov;
    return this;
  }

  build(): IMockData {
    return this.mockData;
  }
}
