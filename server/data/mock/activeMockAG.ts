import { MockDataBuilder } from "@/server/data/mock/builders/mockDataBuilder";
import { BrevBuilder } from "@/server/data/mock/builders/brevBuilder";
import { MotebehovBuilder } from "@/server/data/mock/builders/motebehovBuilder";
import {
  endretReferatDocument,
  referatDocument,
} from "@/server/data/mock/brev/referatDocument";

const activeMockAG = new MockDataBuilder()
  .withSykmeldt(true)
  .withBrev(
    new BrevBuilder()
      .witUuid("777")
      .withBrevtype("REFERAT")
      .withCreatedAt(new Date(2021, 3, 3))
      .withTid(new Date(2021, 3, 3))
      .withDocument(referatDocument)
      .build()
  )
  .withBrev(
    new BrevBuilder()
      .witUuid("888")
      .withBrevtype("REFERAT_ENDRET")
      .withCreatedAt(new Date(2021, 3, 4))
      .withTid(new Date(2021, 3, 3))
      .withDocument(endretReferatDocument)
      .build()
  )
  .withMotebehov(
    new MotebehovBuilder()
      .withVisMotebehov(true)
      .withSkjematype("SVAR_BEHOV")
      .build()
  )
  .build();

export default activeMockAG;
