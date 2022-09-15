import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import {Field, formValueSelector, reduxForm, SubmissionError} from 'redux-form';
import {
    erGyldigDato,
    erGyldigDatoformat,
    fraInputdatoTilJSDato,
    sluttDatoSenereEnnStartDato,
} from '@/common/utils/datoUtils';
import {erIkkeOppfolgingsdialogUtfylt} from '@/common/utils/oppfolgingsdialogUtils';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';
import GodkjennPlanSkjemaDatovelger from './GodkjennPlanSkjemaDatovelger';
import {oppfolgingsplanPt} from '../../../../propTypes/opproptypes';
import {getEndDateFromTiltakListe, getStartDateFromTiltakListe} from '@/common/utils/tiltakUtils';
import ObligatoriskeFelterInfotekst from '../../ObligatoriskeFelterInfotekst';
import {Button, ErrorSummary} from "@navikt/ds-react";

const texts = {
    title: 'Send til lederen din for godkjenning',
    approvalInfo: `
        Når du har sendt planen, kan lederen din enten godkjenne den eller gjøre endringer og sende den tilbake til deg for ny godkjenning.
    `,
    titleDatovelger: 'Hvor lenge skal planen vare?',
    checkboxLabel: 'Jeg er enig i denne oppfølgingsplanen',
    buttonSend: 'Send til godkjenning',
    buttonCancel: 'Avbryt',
};

export const textDelMedNav = (leaderName) => {
    return <span>Jeg ønsker å dele planen med NAV når {leaderName} har godkjent planen (valgfritt)</span>;
};
export const GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN = 'GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN';

export class GodkjennPlanLightboksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visIkkeUtfyltFeilmelding: false,
            opprettplan: 'true',
            submitting: false,
            errorList: [],
        };
        this.godkjennPlan = this.godkjennPlan.bind(this);
        this.handledChange = this.handledChange.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.initialize({
            opprettplan: 'true',
        });
        this.handleInitialize(this.props.oppfolgingsdialog);
        window.scrollTo(0, this.formRef.current.offsetTop);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        const {godkjennInput, startdato, sluttdato, evalueringsdato} = nextProps;

        if (this.state.isFormSubmitted) {
            if (
                godkjennInput !== this.props.godkjennInput ||
                startdato !== this.props.startdato ||
                sluttdato !== this.props.sluttdato ||
                evalueringsdato !== this.props.evalueringsdato
            ) {
                this.touchAllFields();

                this.validateGodkjennInput(godkjennInput);
                this.validateStartDato(startdato);
                this.validateSluttDato(sluttdato);
                this.validateEvalueringsdatoDato(evalueringsdato);
            }
        }
    }

    touchAllFields() {
        this.props.touch('godkjennInput');
        this.props.touch('startdato');
        this.props.touch('sluttdato');
        this.props.touch('evalueringsdato');
    }

    removeError = (id) => {
        const errors = Object.assign(this.state.errorList);
        const i = errors.findIndex((e) => {
            return e.skjemaelementId === id;
        });

        if (i !== -1) {
            errors.splice(i, 1);
        }

        this.setState({
            errorList: errors,
        });
    };

    handleInitialize(oppfolgingsplan) {
        const initData = {};
        initData.startdato =
            getStartDateFromTiltakListe(oppfolgingsplan.tiltakListe) || window.sessionStorage.getItem('startdato');
        initData.sluttdato =
            getEndDateFromTiltakListe(oppfolgingsplan.tiltakListe) || window.sessionStorage.getItem('sluttdato');
        initData.evalueringsdato = window.sessionStorage.getItem('evalueringsdato');
        initData.opprettplan = true;
        initData.delMedNav = false;
        this.props.initialize(initData);
    }

    godkjennPlan(values) {
        const {oppfolgingsdialog} = this.props;

        const errorObject = {
            godkjennInput: '',
            startdato: '',
            sluttdato: '',
            evalueringsdato: '',
            _error: 'Validering av skjema feilet',
        };

        this.setState({
            isFormSubmitted: true,
        });

        const errorList = [];
        const feilmeldingerObject = this.validateAllFields(values);

        if (feilmeldingerObject.godkjennInput) {
            errorObject.godkjennInput = feilmeldingerObject.godkjennInput;
            errorList.push({skjemaelementId: 'godkjennInput', feilmelding: feilmeldingerObject.godkjennInput});
        }

        if (feilmeldingerObject.startdato) {
            errorObject.startdato = feilmeldingerObject.startdato;
            errorList.push({skjemaelementId: 'startdato', feilmelding: feilmeldingerObject.startdato});
        }
        if (feilmeldingerObject.sluttdato) {
            errorObject.sluttdato = feilmeldingerObject.sluttdato;
            errorList.push({skjemaelementId: 'sluttdato', feilmelding: feilmeldingerObject.sluttdato});
        }
        if (feilmeldingerObject.evalueringsdato) {
            errorObject.evalueringsdato = feilmeldingerObject.evalueringsdato;
            errorList.push({skjemaelementId: 'evalueringsdato', feilmelding: feilmeldingerObject.evalueringsdato});
        }

        if (
            feilmeldingerObject.godkjennInput ||
            feilmeldingerObject.startdato ||
            feilmeldingerObject.sluttdato ||
            feilmeldingerObject.evalueringsdato
        ) {
            this.setState({
                errorList,
            });

            throw new SubmissionError(errorObject);
        }

        if (erIkkeOppfolgingsdialogUtfylt(oppfolgingsdialog)) {
            this.setState({
                visIkkeUtfyltFeilmelding: true,
            });
        } else {
            const gyldighetstidspunkt = {
                fom: new Date(fraInputdatoTilJSDato(values.startdato)),
                tom: new Date(fraInputdatoTilJSDato(values.sluttdato)),
                evalueres: new Date(fraInputdatoTilJSDato(values.evalueringsdato)),
            };
            this.props.godkjennPlan(gyldighetstidspunkt, this.state.opprettplan, values.delMedNav);
            this.setState({submitting: true});
        }
    }

    updateFeilOppsummeringState = (feilmelding, elementId) => {
        const i = this.state.errorList.findIndex((obj) => {
            return obj.skjemaelementId === elementId;
        });
        const errorList = this.state.errorList;

        if (i > -1 && feilmelding !== undefined) {
            errorList[i].feilmelding = feilmelding;
        } else if (i > -1 && feilmelding === undefined) {
            errorList.splice(i, 1);
            this.setState({
                errorlist: errorList,
            });
        } else if (i === -1 && feilmelding !== undefined) {
            errorList.push({skjemaelementId: elementId, feilmelding});
        }
    };

    validateGodkjennInput = (value) => {
        let feilmelding;

        if (value !== true) {
            feilmelding = 'Du må godkjenne planen for å komme videre';
        }

        this.updateFeilOppsummeringState(feilmelding, 'godkjennInput');
        return feilmelding;
    };

    validateDato = (value) => {
        let feilmelding;

        if (!value || value.trim().length === 0) {
            feilmelding = 'Du må oppgi en dato';
        } else if (!erGyldigDatoformat(value)) {
            feilmelding = 'Datoen må være på formatet dd.mm.åååå';
        } else if (!erGyldigDato(value)) {
            feilmelding = 'Datoen er ikke gyldig';
        }

        return feilmelding;
    };

    validateStartDato = (value) => {
        this.state.startdato = value;
        const feilmelding = this.validateDato(value);

        this.updateFeilOppsummeringState(feilmelding, 'startdato');

        if (feilmelding === undefined) {
            this.props.untouch(GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN, 'startdato');
        }

        return feilmelding;
    };

    validateSluttDato = (value) => {
        this.props.touch(GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN, 'sluttdato');
        let feilmelding = this.validateDato(value);

        if (this.state.startdato && value && !sluttDatoSenereEnnStartDato(this.state.startdato, value)) {
            feilmelding = 'Sluttdato må være etter startdato';
        }

        this.updateFeilOppsummeringState(feilmelding, 'sluttdato');

        if (feilmelding === undefined) {
            this.props.untouch(GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN, 'sluttdato');
        }

        return feilmelding;
    };

    validateEvalueringsdatoDato = (value) => {
        this.props.touch(GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN, 'evalueringsdato');
        let feilmelding = this.validateDato(value);

        if (this.state.startdato && value && !sluttDatoSenereEnnStartDato(this.state.startdato, value)) {
            feilmelding = 'Evalueringsdato må være etter startdato';
        }

        this.updateFeilOppsummeringState(feilmelding, 'evalueringsdato');

        if (feilmelding === undefined) {
            this.props.untouch(GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN, 'evalueringsdato');
        }

        return feilmelding;
    };

    validateAllFields = (values) => {
        return {
            godkjennInput: this.validateGodkjennInput(values.godkjennInput),
            startdato: this.validateStartDato(values.startdato),
            sluttdato: this.validateSluttDato(values.sluttdato),
            evalueringsdato: this.validateEvalueringsdatoDato(values.evalueringsdato),
        };
    };

    handledChange(e) {
        this.setState({
            opprettplan: e.target.value,
            visIkkeUtfyltFeilmelding: false,
        });
    }

    render() {
        const {avbryt, handleSubmit, oppfolgingsdialog} = this.props;
        return (
            <div ref={this.formRef} className="panel godkjennPlanLightboks">
                <form onSubmit={handleSubmit(this.godkjennPlan)} className="godkjennPlanSkjema">
                    <h2>{texts.title}</h2>

                    <p>{texts.approvalInfo}</p>

                    <ObligatoriskeFelterInfotekst/>

                    <hr/>

                    <h3>{texts.titleDatovelger}</h3>

                    <GodkjennPlanSkjemaDatovelger
                        oppfolgingsplan={oppfolgingsdialog}
                        isFormSubmitted={this.state.isFormSubmitted}
                        validateStartdato={this.validateStartDato}
                        validateSluttDato={this.validateSluttDato}
                        validateEvalueringsdatoDato={this.validateEvalueringsdatoDato}
                    />

                    <hr/>

                    <div className="inputgruppe">
                        <div className="skjema__input">
                            <div className="skjema__checkbox-container">
                                <Field
                                    className="checkboks"
                                    id="godkjennInput"
                                    name="godkjennInput"
                                    component={CheckboxSelvstendig}
                                    label={texts.checkboxLabel}
                                    validate={this.state.isFormSubmitted ? this.validateGodkjennInput : undefined}
                                />
                            </div>
                            <div className="skjema__checkbox-container">
                                <Field
                                    className="checkboks"
                                    id="delMedNav"
                                    name="delMedNav"
                                    component={CheckboxSelvstendig}
                                    label={textDelMedNav(oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}
                                />
                            </div>
                        </div>
                    </div>
                    {this.state.errorList.length > 0 && (
                        <ErrorSummary
                            size="medium"
                            heading="For å gå videre må du rette opp følgende:"
                        >
                            {this.state.errorList.map(error => {
                                return <ErrorSummary.Item href={error.skjemaelementId}>
                                    {error.feilmelding}
                                </ErrorSummary.Item>
                            })}
                        </ErrorSummary>
                    )}
                    <div className="knapperad">
                        <div className="knapperad__element">
                            <Button variant={"primary"} loading={this.state.submitting}>
                                {texts.buttonSend}
                            </Button>
                        </div>
                        <div className="knapperad__element">
                            <button
                                type="button"
                                className="lenke"
                                onClick={() => {
                                    avbryt();
                                }}
                            >
                                {texts.buttonCancel}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

GodkjennPlanLightboksComponent.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    avbryt: PropTypes.func,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
    godkjennPlan: PropTypes.func,
    touch: PropTypes.func,
    untouch: PropTypes.func,
    godkjennInput: PropTypes.string,
    startdato: PropTypes.string,
    sluttdato: PropTypes.string,
    evalueringsdato: PropTypes.string,
};

const valueSelector = formValueSelector(GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN);

const mapStateToProps = (state) => {
    return {
        godkjennInput: valueSelector(state, 'godkjennInput'),
        startdato: valueSelector(state, 'startdato'),
        sluttdato: valueSelector(state, 'sluttdato'),
        evalueringsdato: valueSelector(state, 'evalueringsdato'),
    };
};

const ReduxSkjema = reduxForm({
    form: GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN,
})(GodkjennPlanLightboksComponent);

export default connect(mapStateToProps)(ReduxSkjema);
