import { DocumentBuilder } from "@/server/data/mock/builders/documentBuilder";
import { DocumentComponentBuilder } from "@/server/data/mock/builders/documentComponentBuilder";

const headerComponent = new DocumentComponentBuilder()
  .withType("HEADER_H1")
  .withText("Innkalling til dialogmøte")
  .build();

const meetingTimeComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Møtetidspunkt")
  .withText("20. mai 2025, Storgata 4")
  .build();

const meetingPlaceComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Møtested")
  .withText("Videomøte på Teams")
  .build();

const videoLinkComponent = new DocumentComponentBuilder()
  .withType("LINK")
  .withTitle("Lenke til videomøte")
  .withText("https://teams.microsoft.com/l/osv.osv.osv")
  .build();

const welcomeComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText(
    "Velkommen til dialogmøte mellom deg, arbeidsgiveren din og en veileder fra NAV. I møtet skal vi snakke om situasjonen din og bli enige om en plan som kan hjelpe deg videre."
  )
  .build();

const contactUsComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText(
    "Hvis vårt forslag til møtetidspunkt, møtested eller møteform ikke passer, ber vi om at du tar kontakt for å diskutere alternativer. I så fall kan du sende epost eller ringe undertegnede på telefon. Vi minner om at det ikke må sendes sensitive personopplysninger over e-post eller SMS."
  )
  .build();

const doctorComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText(
    "Etter reglene kan NAV be sykmelder eller annet helsepersonell om å delta i møtet. Til dette møtet har vi ikke sett behov for det."
  )
  .build();

const oppfolgingsplanComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Før møtet")
  .withText(
    "Det er viktig at dere fyller ut oppfølgingsplanen sammen og deler den med NAV. Det gir oss et godt utgangspunkt for å snakke om hva som fungerer, hva som har blitt forsøkt, og hvilke muligheter som finnes framover."
  )
  .build();

const bestRegardsComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Med hilsen")
  .withText("NAV Staden")
  .withText("Åge Saksbehandler")
  .withText("yolo@nav.no")
  .withText("95959595")
  .build();

export const moteinnkallingDocument = new DocumentBuilder()
  .withComponent(headerComponent)
  .withComponent(meetingTimeComponent)
  .withComponent(meetingPlaceComponent)
  .withComponent(videoLinkComponent)
  .withComponent(welcomeComponent)
  .withComponent(contactUsComponent)
  .withComponent(doctorComponent)
  .withComponent(oppfolgingsplanComponent)
  .withComponent(bestRegardsComponent)
  .build();
