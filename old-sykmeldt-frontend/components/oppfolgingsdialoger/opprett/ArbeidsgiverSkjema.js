import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { oppfolgingsplanPt } from '../../../propTypes/opproptypes';
import getContextRoot from '@/common/utils/getContextRoot';
import {
  erAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
  erOppfolgingsdialogOpprettbarMedArbeidsgiver,
  erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver,
  hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
} from '@/common/utils/oppfolgingsdialogUtils';
import { dinesykmeldingerReducerPt, fieldPropTypes, opprettOppfolgingArbeidsgiverPt } from '../../../propTypes';
import Radioknapper from '../../skjema/Radioknapper';
import { VarseltrekantImage } from '@/common/images/imageComponents';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  arbeidsgiverSkjema: {
    question: 'Hvilken arbeidsgiver skal du lage en plan med?',
    buttonSubmit: 'VELG ARBEIDSGIVER',
  },
  velgArbeidsgiverUndertekst: {
    alreadyCreatedPlan: 'Du har allerede en oppfølgingsplan med denne arbeidsgiveren',
    noLeader: 'Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn.',
    leader: 'Nærmeste leder er ',
  },
};

const OPPFOLGINGSKJEMANAVN = 'OPPRETT_DIALOG';

export const VelgArbeidsgiverUndertekst = ({ oppfolgingsdialoger, arbeidsgiver }) => {
  if (erAktivOppfolgingsdialogOpprettetMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver.virksomhetsnummer)) {
    const oppfolgingsdialog = hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver(
      oppfolgingsdialoger,
      arbeidsgiver.virksomhetsnummer
    );
    return (
      <div className="velgArbeidsgiverUndertekst">
        <span className="velgArbeidsgiverUndertekst__tekst">{texts.velgArbeidsgiverUndertekst.alreadyCreatedPlan}</span>
        <div className="velgArbeidsgiverUndertekst__lenke">
          <Link className="lenke" to={`${getContextRoot()}/oppfolgingsplaner/${oppfolgingsdialog.id}`}>
            Gå til planen
          </Link>
        </div>
      </div>
    );
  } else if (!arbeidsgiver.harNaermesteLeder) {
    return (
      <div className="velgArbeidsgiverUndertekst">
        <img className="velgArbeidsgiverUndertekst__ikon" src={VarseltrekantImage} alt="" />
        <span className="velgArbeidsgiverUndertekst__tekst">{texts.velgArbeidsgiverUndertekst.noLeader}</span>
      </div>
    );
  } else if (arbeidsgiver.naermesteLeder) {
    return (
      <div className="velgArbeidsgiverUndertekst">
        <span className="velgArbeidsgiverUndertekst__tekst">
          {`${texts.velgArbeidsgiverUndertekst.leader}${arbeidsgiver.naermesteLeder}`}
        </span>
      </div>
    );
  }
  return null;
};
VelgArbeidsgiverUndertekst.propTypes = {
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  arbeidsgiver: opprettOppfolgingArbeidsgiverPt,
};
export const VelgArbeidsgiverRadioKnapper = ({ input, meta, oppfolgingsdialoger, arbeidsgivere }) => {
  return (
    <Radioknapper input={input} meta={meta} visUndertekst>
      {arbeidsgivere.map((arbeidsgiver, index) => {
        return (
          <i
            key={index}
            value={arbeidsgiver.virksomhetsnummer}
            label={arbeidsgiver.navn}
            disabled={!erOppfolgingsdialogOpprettbarMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver)}
          >
            <VelgArbeidsgiverUndertekst oppfolgingsdialoger={oppfolgingsdialoger} arbeidsgiver={arbeidsgiver} />
          </i>
        );
      })}
    </Radioknapper>
  );
};
VelgArbeidsgiverRadioKnapper.propTypes = {
  input: fieldPropTypes.input,
  meta: fieldPropTypes.meta,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
};

export const ArbeidsgiverSkjema = ({ arbeidsgivere, oppfolgingsdialoger, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="arbeidsgiverSkjema">
      <label className="skjemaelement__label">{texts.arbeidsgiverSkjema.question}</label>
      <div className="inputgruppe velgarbeidsgiver__inputgruppe">
        <Field
          name="arbeidsgiver"
          component={VelgArbeidsgiverRadioKnapper}
          oppfolgingsdialoger={oppfolgingsdialoger}
          arbeidsgivere={arbeidsgivere}
        />
      </div>
      <div className="knapperad">
        <div className="knapperad__element">
          <Hovedknapp
            htmlType="submit"
            disabled={!erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver(oppfolgingsdialoger, arbeidsgivere)}
          >
            {texts.arbeidsgiverSkjema.buttonSubmit}
          </Hovedknapp>
        </div>
      </div>
    </form>
  );
};

ArbeidsgiverSkjema.propTypes = {
  arbeidsgivere: dinesykmeldingerReducerPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  handleSubmit: PropTypes.func,
};

function validate(values) {
  const feilmeldinger = {};

  if (!values.arbeidsgiver) {
    feilmeldinger.arbeidsgiver = 'Velg arbeidsgiver';
  }

  return feilmeldinger;
}
const ReduxSkjema = reduxForm({
  form: OPPFOLGINGSKJEMANAVN,
  validate,
})(ArbeidsgiverSkjema);

export default ReduxSkjema;
