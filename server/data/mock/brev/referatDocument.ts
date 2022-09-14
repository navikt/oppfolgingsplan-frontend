import { DocumentBuilder } from "@/server/data/mock/builders/documentBuilder";
import { DocumentComponentBuilder } from "@/server/data/mock/builders/documentComponentBuilder";

const headerComponent = new DocumentComponentBuilder()
  .withType("HEADER_H1")
  .withText("Referat fra dialogmote")
  .build();

const date03042021Component = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Sendt 04.april 2021, kl. 12.15")
  .build();

const date11022020Component = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Sendt 03.april 2021, kl. 12.11")
  .build();

const documentHeaderComponent = new DocumentComponentBuilder()
  .withType("HEADER_H2")
  .withText("Tykkmaget Midtpunkt")
  .build();

const tidsted03042021Component = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Dato: Fredag 03. april 2021")
  .withText("Sted: NAV Staden")
  .build();

const fnrComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("F.nr. 16017621150")
  .build();

const deltakereComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Deltakere i møtet")
  .withText("Arbeidstaker: Tykkmaget Midtpunkt")
  .withText("Arbeidsgiver: Forfjamset Taremel")
  .withText("Fra NAV: Elektrisk Myggnetting")
  .build();

const arbeidsgiverComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Arbeidsgiver")
  .withText("SJOKKERENDE ELEKTRIKER")
  .build();

const formalComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText(
    "Formålet med dialogmøtet var å oppsummere situasjonen, drøfte mulighetene for å arbeide og legge en plan for tiden framover."
  )
  .build();

const taushetspliktComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText(
    "Sykdom og diagnose er underlagt taushetsplikt. Derfor er helsen din bare et tema hvis du selv velger å være åpen om den. Av hensyn til personvernet inneholder referatet uansett ikke slike opplysninger."
  )
  .build();

const detteSkjeddeHeaderComponent = new DocumentComponentBuilder()
  .withType("HEADER_H2")
  .withText("Dette skjedde i møtet")
  .build();

const konklusjonComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Konklusjon")
  .withText("Det er gode muligheter for å komme litt tilbake i jobb")
  .build();

const dinOppgaveComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Din oppgave")
  .withText("Tykkmaget må trene 2 ganger i uken")
  .build();

const arbeidsgiverensOppgaveComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Arbeidsgiverens oppgave")
  .withText(
    "Arbeidsgiver sørger for at arbeidstaker har tilgang til treningsrom"
  )
  .build();

const situasjonOgMuligheterComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Situasjon og muligheter")
  .withText("Her er det mange muligheter")
  .build();

const navInformerteComponent = new DocumentComponentBuilder()
  .withType("HEADER_H2")
  .withText("Dette informerte NAV om i møtet")
  .build();

const reisetilskuddComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Reisetilskudd")
  .withText(
    "Du kan få reisetilskudd i stedet for sykepenger hvis det gjør at du kan være i arbeid helt eller delvis. Reisetilskuddet dekker nødvendige ekstra reiseutgifter til og fra jobben mens du er syk, altså transportutgifter utover det du har til vanlig."
  )
  .withKey("REISETILSKUDD")
  .build();

const arbeidsrettetRehabiliteringComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Arbeidsrettet rehabilitering")
  .withText(
    "Du kan få individuell veiledning om helse og livsstil og hjelp til å komme i form.  Det kan gjøre at du finner motivasjon og blir tryggere på deg selv. Slik blir mulighetene dine til å komme i jobb igjen styrket. Du vil få opplæring og får prøvd ut kontakten med arbeidslivet i trygge omgivelser."
  )
  .withKey("ARBEIDSRETTET_REHABILITERING")
  .build();

const okonomiskStotteComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Hjelp til å søke om annen økonomisk støtte")
  .withKey("OKONOMISK_STOTTE")
  .withText(
    "Klarer du ikke å komme tilbake i arbeid før den siste dagen du har rett til sykepenger, trenger vi et nytt dialogmøte. Da vil vi snakke sammen om hvordan du eventuelt kan søke om annen økonomisk støtte fra NAV."
  )
  .build();

const avklaringArbeidsevneComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withTitle("Avklaring av arbeidsevnen")
  .withKey("AVKLARING_ARBEIDSEVNE")
  .withText(
    "Du kan få kartlagt eller prøvd ut arbeidsevnen din. Avklaringen kan skje der du jobber eller på en annen arbeidsplass. Da undersøker vi om du kan utføre jobben med noen tilpasninger, om du kan få påfyll av kompetanse, eller om det er muligheter i et annet yrke. Avklaringen varer som regel i fire uker, men kan forlenges med inntil åtte uker ved behov."
  )
  .build();

const bestRegardsComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Med hilsen")
  .withText("NAV Staden")
  .withText("Elektrisk Myggnetting")
  .withText("elektrisk.myggnetting@nav.no")
  .withText("95959595")
  .build();

export const endretReferatDocument = new DocumentBuilder()
  .withComponent(headerComponent)
  .withComponent(date03042021Component)
  .withComponent(documentHeaderComponent)
  .withComponent(fnrComponent)
  .withComponent(tidsted03042021Component)
  .withComponent(deltakereComponent)
  .withComponent(arbeidsgiverComponent)
  .withComponent(formalComponent)
  .withComponent(taushetspliktComponent)
  .withComponent(detteSkjeddeHeaderComponent)
  .withComponent(konklusjonComponent)
  .withComponent(dinOppgaveComponent)
  .withComponent(arbeidsgiverensOppgaveComponent)
  .withComponent(situasjonOgMuligheterComponent)
  .withComponent(navInformerteComponent)
  .withComponent(reisetilskuddComponent)
  .withComponent(arbeidsrettetRehabiliteringComponent)
  .withComponent(bestRegardsComponent)
  .build();

export const referatDocument = new DocumentBuilder()
  .withComponent(date11022020Component)
  .withComponent(documentHeaderComponent)
  .withComponent(fnrComponent)
  .withComponent(tidsted03042021Component)
  .withComponent(deltakereComponent)
  .withComponent(arbeidsgiverComponent)
  .withComponent(formalComponent)
  .withComponent(taushetspliktComponent)
  .withComponent(detteSkjeddeHeaderComponent)
  .withComponent(konklusjonComponent)
  .withComponent(dinOppgaveComponent)
  .withComponent(arbeidsgiverensOppgaveComponent)
  .withComponent(situasjonOgMuligheterComponent)
  .withComponent(navInformerteComponent)
  .withComponent(okonomiskStotteComponent)
  .withComponent(avklaringArbeidsevneComponent)
  .withComponent(bestRegardsComponent)
  .build();
