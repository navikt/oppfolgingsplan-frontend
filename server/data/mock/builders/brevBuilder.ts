import { BrevType, DocumentComponent } from "types/client/brev";
import { Brev } from "types/shared/brev";
import { v4 as uuidv4 } from "uuid";

export class BrevBuilder {
  private readonly brev: Brev;

  constructor() {
    this.brev = {
      uuid: uuidv4(),
      deltakerUuid: "324",
      createdAt: new Date().toISOString(),
      brevType: "INNKALT",
      digitalt: null,
      lestDato: null,
      videoLink: null,
      fritekst: "Yoyo",
      sted: "Ørsta Rådhus",
      tid: new Date().toISOString(),
      document: [],
      virksomhetsnummer: "234",
      svar: null,
    };
  }

  witUuid(uuid: string): BrevBuilder {
    this.brev.uuid = uuid;
    return this;
  }

  withBrevtype(brevType: BrevType): BrevBuilder {
    this.brev.brevType = brevType;
    return this;
  }

  withCreatedAt(createdAt: Date): BrevBuilder {
    this.brev.createdAt = createdAt.toISOString();
    return this;
  }

  withTid(tid: Date): BrevBuilder {
    this.brev.tid = tid.toISOString();
    return this;
  }

  withDocument(document: DocumentComponent[]) {
    this.brev.document = document;
    return this;
  }

  build(): Brev {
    return this.brev;
  }
}
