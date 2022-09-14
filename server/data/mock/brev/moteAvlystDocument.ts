import { DocumentBuilder } from "@/server/data/mock/builders/documentBuilder";
import { DocumentComponentBuilder } from "@/server/data/mock/builders/documentComponentBuilder";

const helloComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Hei Artig Trane")
  .build();

const meetingCancelledComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText(
    "NAV har tidligere innkalt til dialogmøte som skulle vært avholdt 22.10.2021 klokka 12. Dette møtet er avlyst."
  )
  .build();

const moreTextComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Her kommer en fritekst skrevet av veilederen.")
  .build();

const bestRegardsComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Med hilsen")
  .withText("NAV Staden")
  .withText("Åge Saksbehandler")
  .withText("yolo@nav.no")
  .withText("95959595")
  .build();

export const moteavlystDocument = new DocumentBuilder()
  .withComponent(helloComponent)
  .withComponent(meetingCancelledComponent)
  .withComponent(moreTextComponent)
  .withComponent(bestRegardsComponent)
  .build();
