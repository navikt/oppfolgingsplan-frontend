import React from "react";
import PropTypes from "prop-types";
import { KANGJENNOMFOERES, STATUS_TILTAK } from "@/common/konstanter";
import { toDateMedMaanedNavn } from "@/common/utils/datoUtils";
import { capitalizeFirstLetter } from "@/common/utils/textUtils";
import { sorterTiltakerEtterStatus } from "@/common/utils/tiltakUtils";
import { sorterArbeidsoppgaverEtterOpprettet } from "@/common/utils/arbeidsoppgaveUtils";
import {
  arbeidsoppgavePt,
  oppfolgingsplanPt,
  personPt,
  stillingPt,
  tiltakPt,
  virksomhetPt,
} from "../../../../propTypes/opproptypes";
import {
  HakeGronnLysImage,
  HakeOransjeImage,
  KryssRoedImage,
  VarseltrekantImage,
} from "@/common/images/imageComponents";
import { Tag } from "@navikt/ds-react";

const texts = {
  informasjonPanelOverskrift: {
    title: "Oppfølgingsplan",
  },
  informasjonPanelArbeidsgiver: {
    title: "Arbeidsgivers kontaktinformasjon",
    labels: {
      virksomhetsnavn: "Bedriftens navn:",
      virksomhetsnummer: "Org.nr:",
      naermesteLeder: {
        heading: "Nærmeste leder",
        name: "Navn:",
        telephone: "Tlf:",
        email: "Epost:",
      },
    },
  },
  informasjonPanelTiltak: {
    title: "Tiltak",
    status: {
      avtalt: "Avtalt",
      ikkeAktuelt: "Ikke aktuelt",
      foreslatt: "Foreslått",
    },
  },
  informasjonPanelSykmeldt: {
    title: "Den sykmeldtes kontaktinformasjon",
    labels: {
      name: "Navn:",
      fnr: "F.nr:",
      telephone: "Tlf:",
      email: "Epost:",
    },
  },
  informasjonPanelArbeidsoppgaverEtterGjennomfoering: {
    titles: {
      kan: "Arbeidsoppgaver som kan gjøres",
      tilrettelegging: "Arbeidsoppgaver som kan gjøres med tilrettelegging",
      kanIkke: "Arbeidsoppgaver som ikke kan gjøres",
      ikkeVurdert: "Arbeidsoppgaver som ikke er blitt vurdert",
    },
    labels: {
      sted: "Fra annet sted",
      tid: "Med mer tid",
      hjelp: "Med hjelp/hjelpemiddel",
    },
  },
  tiltakBeskrivelse: {
    label: "Beskrivelse",
  },
  tiltakOppfoelging: {
    label: "OPPFØLGING OG GJENNOMFØRING",
  },
  tiltakBeskrivelseIkkeAktuelt: {
    label: "ARBEIDSGIVERS VURDERING",
  },
  tiltakForeslaattAv: {
    label: "FORESLÅTT AV",
  },
};
const textInformasjonPanelOverskriftParagraph = (arbeidstaker, leader) => {
  return `Mellom ${arbeidstaker} og ${leader}`;
};

export const InformasjonPanelOverskrift = ({ oppfolgingsdialog }) => {
  return (
    <div className="panel godkjennPlanOversiktInformasjon__panel">
      <h2>{texts.informasjonPanelOverskrift.title}</h2>
      <p>
        {textInformasjonPanelOverskriftParagraph(
          oppfolgingsdialog.arbeidstaker.navn,
          oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn
        )}
      </p>
    </div>
  );
};
InformasjonPanelOverskrift.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
};

export const InformasjonPanelArbeidsgiver = ({
  naermesteLeder,
  virksomhet,
}) => {
  return (
    <div className="informasjonPanel">
      <h3>{texts.informasjonPanelArbeidsgiver.title}</h3>
      <dl className="godkjennPlanOversiktInformasjon__panel__info">
        <div>
          <dt>{texts.informasjonPanelArbeidsgiver.labels.virksomhetsnavn}</dt>
          <dd>{virksomhet.navn}</dd>
        </div>
        <div>
          <dt>{texts.informasjonPanelArbeidsgiver.labels.virksomhetsnummer}</dt>
          <dd>{virksomhet.virksomhetsnummer}</dd>
        </div>
        <br />
        <br />
        {naermesteLeder && (
          <b>
            {texts.informasjonPanelArbeidsgiver.labels.naermesteLeder.heading}
          </b>
        )}

        {naermesteLeder && naermesteLeder.navn && (
          <div>
            <dt>
              {texts.informasjonPanelArbeidsgiver.labels.naermesteLeder.name}
            </dt>
            <dd>{naermesteLeder.navn}</dd>
          </div>
        )}

        {naermesteLeder && naermesteLeder.tlf && (
          <div>
            <dt>
              {
                texts.informasjonPanelArbeidsgiver.labels.naermesteLeder
                  .telephone
              }
            </dt>
            <dd>{naermesteLeder.tlf}</dd>
          </div>
        )}

        {naermesteLeder && naermesteLeder.epost && (
          <div>
            <dt>
              {texts.informasjonPanelArbeidsgiver.labels.naermesteLeder.email}
            </dt>
            <dd>{naermesteLeder.epost}</dd>
          </div>
        )}
      </dl>
    </div>
  );
};
InformasjonPanelArbeidsgiver.propTypes = {
  naermesteLeder: personPt,
  virksomhet: virksomhetPt,
};

export const RenderStilling = ({ stilling }) => {
  return (
    <div>
      <dt>{capitalizeFirstLetter(stilling.yrke.toLowerCase())}:</dt>
      <dd>{stilling.prosent}%</dd>
    </div>
  );
};

RenderStilling.propTypes = {
  stilling: stillingPt,
};

export const InformasjonPanelSykmeldt = ({ arbeidstaker }) => {
  return (
    <div className="informasjonPanel">
      <h3>{texts.informasjonPanelSykmeldt.title}</h3>
      <dl className="godkjennPlanOversiktInformasjon__panel__info">
        <div>
          <dt>{texts.informasjonPanelSykmeldt.labels.name}</dt>
          <dd>{arbeidstaker.navn}</dd>
        </div>
        <div>
          <dt>{texts.informasjonPanelSykmeldt.labels.fnr}</dt>
          <dd>{arbeidstaker.fnr}</dd>
        </div>
        {arbeidstaker.tlf && (
          <div>
            <dt>{texts.informasjonPanelSykmeldt.labels.telephone}</dt>
            <dd>{arbeidstaker.tlf}</dd>
          </div>
        )}

        {arbeidstaker.epost && (
          <div>
            <dt>{texts.informasjonPanelSykmeldt.labels.email}</dt>
            <dd>{arbeidstaker.epost}</dd>
          </div>
        )}

        {arbeidstaker.stillinger.length > 0 && (
          <div>
            {arbeidstaker.stillinger.map((stilling, idx) => {
              if (stilling.prosent > -1) {
                return <RenderStilling stilling={stilling} key={idx} />;
              }
              return null;
            })}
          </div>
        )}
      </dl>
    </div>
  );
};
InformasjonPanelSykmeldt.propTypes = {
  arbeidstaker: personPt,
};

export const InformasjonPanelArbeidsoppgaverEtterGjennomfoering = ({
  oppfolgingsdialog,
  arbeidsoppgaver,
  type,
  tittel,
}) => {
  let hentPanelType;
  let imgUrl;
  switch (type) {
    case KANGJENNOMFOERES.KAN:
      hentPanelType = "oppfolgingsplanLapp--groenn";
      imgUrl = HakeGronnLysImage;
      break;
    case KANGJENNOMFOERES.TILRETTELEGGING:
      hentPanelType = "oppfolgingsplanLapp--gul";
      imgUrl = HakeOransjeImage;
      break;
    case KANGJENNOMFOERES.KAN_IKKE:
      hentPanelType = "oppfolgingsplanLapp--roed";
      imgUrl = KryssRoedImage;
      break;
    default:
      hentPanelType = "oppfolgingsplanLapp--graa";
      imgUrl = VarseltrekantImage;
      break;
  }
  const arbeidstaker = oppfolgingsdialog.arbeidstaker;
  return (
    <div>
      {arbeidsoppgaver.length > 0 && (
        <div className="godkjennPlanOversiktInformasjon__panel__gjennomfoering">
          <img alt="" src={imgUrl} />
          <h3>{tittel}</h3>
        </div>
      )}
      {arbeidsoppgaver.map((arbeidsoppgave, idx) => {
        return (
          <div
            className={`godkjennPlanOversiktInformasjon__panel__arbeidsoppgave ${hentPanelType}`}
            key={idx}
          >
            <h4>{arbeidsoppgave.arbeidsoppgavenavn}</h4>
            {type === KANGJENNOMFOERES.TILRETTELEGGING && (
              <div className="arbeidsoppgave__tilrettelegging">
                {arbeidsoppgave.gjennomfoering.paaAnnetSted && (
                  <span>
                    {
                      texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering
                        .labels.sted
                    }
                  </span>
                )}
                {arbeidsoppgave.gjennomfoering.medMerTid && (
                  <span>
                    {
                      texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering
                        .labels.tid
                    }
                  </span>
                )}
                {arbeidsoppgave.gjennomfoering.medHjelp && (
                  <span>
                    {
                      texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering
                        .labels.hjelp
                    }
                  </span>
                )}
              </div>
            )}
            {type !== KANGJENNOMFOERES.KAN &&
              type !== KANGJENNOMFOERES.IKKE_VURDERT &&
              arbeidstaker &&
              arbeidstaker.navn && (
                <div className="arbeidsoppgave__beskrivelse">
                  <label>{arbeidstaker.navn}</label>
                  {type === KANGJENNOMFOERES.TILRETTELEGGING && (
                    <q>{arbeidsoppgave.gjennomfoering.kanBeskrivelse}</q>
                  )}
                  {type === KANGJENNOMFOERES.KAN_IKKE && (
                    <q>{arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse}</q>
                  )}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};
InformasjonPanelArbeidsoppgaverEtterGjennomfoering.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  arbeidsoppgaver: PropTypes.arrayOf(arbeidsoppgavePt),
  type: PropTypes.string,
  tittel: PropTypes.string,
};

export const InformasjonPanelArbeidsoppgaver = ({
  oppfolgingsdialog,
  arbeidsoppgaver,
}) => {
  const arbeidsoppgaverKanGjennomfoeres = arbeidsoppgaver.filter(
    (arbeidsoppgave) => {
      return (
        arbeidsoppgave.gjennomfoering &&
        arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN
      );
    }
  );
  const arbeidsoppgaverMedTilrettelegging = arbeidsoppgaver.filter(
    (arbeidsoppgave) => {
      return (
        arbeidsoppgave.gjennomfoering &&
        arbeidsoppgave.gjennomfoering.kanGjennomfoeres ===
          KANGJENNOMFOERES.TILRETTELEGGING
      );
    }
  );
  const arbeidsoppgaverKanIkkeGjennomfoeres = arbeidsoppgaver.filter(
    (arbeidsoppgave) => {
      return (
        arbeidsoppgave.gjennomfoering &&
        arbeidsoppgave.gjennomfoering.kanGjennomfoeres ===
          KANGJENNOMFOERES.KAN_IKKE
      );
    }
  );
  const arbeidsoppgaverIkkeVurdert = arbeidsoppgaver.filter(
    (arbeidsoppgave) => {
      return !arbeidsoppgave.gjennomfoering;
    }
  );
  return (
    <div className="panel godkjennPlanOversiktInformasjon__panel">
      {arbeidsoppgaverKanGjennomfoeres.length > 0 && (
        <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
          oppfolgingsdialog={oppfolgingsdialog}
          arbeidsoppgaver={arbeidsoppgaverKanGjennomfoeres}
          type={KANGJENNOMFOERES.KAN}
          tittel={
            texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles.kan
          }
        />
      )}
      {arbeidsoppgaverMedTilrettelegging.length > 0 && (
        <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
          oppfolgingsdialog={oppfolgingsdialog}
          arbeidsoppgaver={arbeidsoppgaverMedTilrettelegging}
          type={KANGJENNOMFOERES.TILRETTELEGGING}
          tittel={
            texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles
              .tilrettelegging
          }
        />
      )}
      {arbeidsoppgaverKanIkkeGjennomfoeres.length > 0 && (
        <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
          oppfolgingsdialog={oppfolgingsdialog}
          arbeidsoppgaver={arbeidsoppgaverKanIkkeGjennomfoeres}
          type={KANGJENNOMFOERES.KAN_IKKE}
          tittel={
            texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles
              .kanIkke
          }
        />
      )}
      {arbeidsoppgaverIkkeVurdert.length > 0 && (
        <InformasjonPanelArbeidsoppgaverEtterGjennomfoering
          oppfolgingsdialog={oppfolgingsdialog}
          arbeidsoppgaver={arbeidsoppgaverIkkeVurdert}
          type={KANGJENNOMFOERES.IKKE_VURDERT}
          tittel={
            texts.informasjonPanelArbeidsoppgaverEtterGjennomfoering.titles
              .ikkeVurdert
          }
        />
      )}
    </div>
  );
};
InformasjonPanelArbeidsoppgaver.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  arbeidsoppgaver: PropTypes.arrayOf(arbeidsoppgavePt),
};

export const getTiltakStatus = (tiltak) => {
  switch (tiltak.status) {
    case STATUS_TILTAK.AVTALT:
      return texts.informasjonPanelTiltak.status.avtalt;
    case STATUS_TILTAK.IKKE_AKTUELT:
      return texts.informasjonPanelTiltak.status.ikkeAktuelt;
    default:
      return texts.informasjonPanelTiltak.status.foreslatt;
  }
};

export const TiltakBeskrivelse = ({ tiltak }) => {
  return (
    <div className="godkjennPlanOversiktInfo__panel__tiltak--beskrivelse">
      <label key={`tiltak-besk-label-${tiltak.tiltakId}`}>
        {texts.tiltakBeskrivelse.label}
      </label>
      <q key={`tiltak-besk-p-${tiltak.tiltakId}`}>{tiltak.beskrivelse}</q>
    </div>
  );
};
TiltakBeskrivelse.propTypes = {
  tiltak: tiltakPt,
};

export const TiltakOppfoelging = ({ tiltak }) => {
  return (
    <div className="godkjennPlanOversiktInfo__panel__tiltak--beskrivelse">
      {tiltak.gjennomfoering && [
        <label key={`tiltak-gjenn-label-${tiltak.tiltakId}`}>
          {texts.tiltakOppfoelging.label}
        </label>,
        <q key={`tiltak-gjenn-p-${tiltak.tiltakId}`}>
          {tiltak.gjennomfoering}
        </q>,
      ]}
    </div>
  );
};
TiltakOppfoelging.propTypes = {
  tiltak: tiltakPt,
};

export const TiltakBeskrivelseIkkeAktuelt = ({ tiltak }) => {
  return (
    <div className="godkjennPlanOversiktInfo__panel__tiltak--beskrivelse">
      {tiltak.beskrivelseIkkeAktuelt && [
        <label key={`tiltak-gjenn-label-${tiltak.tiltakId}`}>
          {texts.tiltakBeskrivelseIkkeAktuelt.label}
        </label>,
        <q key={`tiltak-gjenn-p-${tiltak.tiltakId}`}>
          {tiltak.beskrivelseIkkeAktuelt}
        </q>,
      ]}
    </div>
  );
};
TiltakBeskrivelseIkkeAktuelt.propTypes = {
  tiltak: tiltakPt,
};

export const TiltakForeslaattAv = ({ tiltak }) => {
  return (
    <div className="godkjennPlanOversiktInfo__panel__tiltak--foreslaattAv">
      {tiltak.opprettetAv && [
        <label key={`tiltak-gjenn-label-${tiltak.tiltakId}`}>
          {texts.tiltakForeslaattAv.label}
        </label>,
        <p key={`tiltak-gjenn-p-${tiltak.opprettetAv.navn}`}>
          {tiltak.opprettetAv.navn}
        </p>,
      ]}
    </div>
  );
};

TiltakForeslaattAv.propTypes = {
  tiltak: tiltakPt,
};

export const InformasjonPanelTiltak = ({ tiltakListe }) => {
  return (
    <div className="panel godkjennPlanOversiktInformasjon__panel">
      <div className="godkjennPlanOversiktInformasjon__panel__header--tiltak">
        <h3>{texts.informasjonPanelTiltak.title}</h3>
      </div>
      {tiltakListe.map((tiltak, idx) => {
        return (
          <div className="godkjennPlanOversiktInfo__panel__tiltak" key={idx}>
            {tiltak.fom &&
              tiltak.tom &&
              tiltak.status !== STATUS_TILTAK.IKKE_AKTUELT && (
                <div>
                  {toDateMedMaanedNavn(tiltak.fom)} -{" "}
                  {toDateMedMaanedNavn(tiltak.tom)}
                </div>
              )}
            <div className="godkjennPlanOversiktInfo__panel__tiltak--navn">
              <h4>{tiltak.tiltaknavn}</h4>
            </div>
            {tiltak.status && (
              <Tag
                size={"small"}
                variant={
                  tiltak.status === STATUS_TILTAK.AVTALT ? "success" : "warning"
                }
              >
                {getTiltakStatus(tiltak)}
              </Tag>
            )}
            <TiltakBeskrivelse tiltak={tiltak} />
            <TiltakForeslaattAv tiltak={tiltak} />
            {tiltak.status === STATUS_TILTAK.AVTALT && (
              <TiltakOppfoelging tiltak={tiltak} />
            )}
            {tiltak.status === STATUS_TILTAK.IKKE_AKTUELT && (
              <TiltakBeskrivelseIkkeAktuelt tiltak={tiltak} />
            )}
          </div>
        );
      })}
    </div>
  );
};
InformasjonPanelTiltak.propTypes = {
  tiltakListe: PropTypes.arrayOf(tiltakPt),
};

const GodkjennPlanOversiktInformasjon = ({ oppfolgingsdialog }) => {
  return (
    <div className="godkjennPlanOversiktInformasjon">
      <InformasjonPanelOverskrift oppfolgingsdialog={oppfolgingsdialog} />

      <InformasjonPanelSykmeldt arbeidstaker={oppfolgingsdialog.arbeidstaker} />

      <InformasjonPanelArbeidsgiver
        naermesteLeder={oppfolgingsdialog.arbeidsgiver.naermesteLeder}
        virksomhet={oppfolgingsdialog.virksomhet}
      />

      {oppfolgingsdialog.arbeidsoppgaveListe.length > 0 && (
        <InformasjonPanelArbeidsoppgaver
          oppfolgingsdialog={oppfolgingsdialog}
          arbeidsoppgaver={sorterArbeidsoppgaverEtterOpprettet(
            oppfolgingsdialog.arbeidsoppgaveListe
          )}
        />
      )}

      {oppfolgingsdialog.tiltakListe.length > 0 && (
        <InformasjonPanelTiltak
          tiltakListe={sorterTiltakerEtterStatus(oppfolgingsdialog.tiltakListe)}
        />
      )}
    </div>
  );
};
GodkjennPlanOversiktInformasjon.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
};

export default GodkjennPlanOversiktInformasjon;
