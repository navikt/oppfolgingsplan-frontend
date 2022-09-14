import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {textBothApprovedOppfolgingsplan} from '@/common/utils/textUtils';
import {delMedFastlegePt, delmednavPt, oppfolgingsplanPt} from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import GodkjentPlanHandlingKnapper from './GodkjentPlanHandlingKnapper';
import GodkjentPlanDelKnapper, {isGodkjentPlanDelKnapperAvailable} from './GodkjentPlanDelKnapper';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import TextForcedApprovedOppfolgingsplan from './TextForcedApprovedOppfolgingsplan';
import PlanEkspanderbar from '../PlanEkspanderbar';
import {HakeGronnLysImage} from '@/common/images/imageComponents';
import {Modal} from "@navikt/ds-react";

const texts = {
    godkjentPlan: {
        title: 'Oppfølgingsplanen',
    },
    avbrytPlanBekreftelse: {
        title: 'Ønsker du å endre planen?',
        info:
            'Hvis du endrer planen, må du sende den til godkjenning hos den andre. Etter godkjenning blir den en gjeldende plan.',
        button: 'Gjør endringer',
    },
    tvungenGodkjenning: 'Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du snakke med',
};

const tvungenGodkjenningText = (oppfolgingsplan) => {
    return `${texts.tvungenGodkjenning} ${oppfolgingsplan.arbeidsgiver.naermesteLeder.navn}.`;
};

export const AvbrytPlanBekreftelse = ({oppfolgingsdialog, avbrytDialog}) => {
    return (
        <div className="avbrytPlanBekreftelse">
            <h3 className="panel__tittel">{texts.avbrytPlanBekreftelse.title}</h3>
            <p>{texts.avbrytPlanBekreftelse.info}</p>
            <div className="knapperad">
                <Button variant="danger" size="medium">
                    onClick={() => {
                        avbrytDialog(oppfolgingsdialog.id);
                    }}
                >
                    {texts.avbrytPlanBekreftelse.button}
                </Button>
            </div>
        </div>
    );
};
AvbrytPlanBekreftelse.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    avbrytDialog: PropTypes.func,
};

class GodkjentPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visBekreftelse: false,
        };
        this.apneBekreftelse = this.apneBekreftelse.bind(this);
        this.lukkBekreftelse = this.lukkBekreftelse.bind(this);
    }

    apneBekreftelse() {
        this.setState({visBekreftelse: true});
    }

    lukkBekreftelse() {
        this.setState({visBekreftelse: false});
    }

    render() {
        const {
            oppfolgingsdialog,
            avbrytDialog,
            rootUrlPlaner,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
        } = this.props;
        const godkjentPlan = oppfolgingsdialog.godkjentPlan;

        return (
            <React.Fragment>
                <OppfolgingsplanInnholdboks
                    classnames="godkjentPlanOppfolgingsplanInfoboks"
                    svgUrl={HakeGronnLysImage}
                    svgAlt=""
                    tittel={texts.godkjentPlan.title}
                    mediumIcon
                >
                    <div className="godkjentPlan">
                        <Modal
                            open={this.state.visBekreftelse}
                            aria-label="Bekreftelse"
                            onClose={this.lukkBekreftelse}
                        >
                            <Modal.Content>
                                <AvbrytPlanBekreftelse oppfolgingsdialog={oppfolgingsdialog}
                                                       avbrytDialog={avbrytDialog}/>
                            </Modal.Content>
                        </Modal>

                        {!godkjentPlan.tvungenGodkjenning && (
                            <p>{textBothApprovedOppfolgingsplan(oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}</p>
                        )}
                        {godkjentPlan.tvungenGodkjenning && (
                            <TextForcedApprovedOppfolgingsplan text={tvungenGodkjenningText(oppfolgingsdialog)}/>
                        )}

                        <GodkjennPlanTidspunkt
                            gyldighetstidspunkt={oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt}
                            oppfolgingsdialog={oppfolgingsdialog}
                            avbrytDialog={avbrytDialog}
                            visBekreftelse={this.state.visBekreftelse}
                        />
                        <GodkjentPlanDeltBekreftelse oppfolgingsplan={oppfolgingsdialog}/>
                        <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog}/>
                        {isGodkjentPlanDelKnapperAvailable(oppfolgingsdialog) && (
                            <GodkjentPlanDelKnapper
                                oppfolgingsplan={oppfolgingsdialog}
                                delmednav={delmednav}
                                delMedNavFunc={delMedNavFunc}
                                fastlegeDeling={fastlegeDeling}
                                delMedFastlege={delMedFastlege}
                            />
                        )}
                    </div>
                </OppfolgingsplanInnholdboks>
                <GodkjentPlanHandlingKnapper
                    oppfolgingsplan={oppfolgingsdialog}
                    apneBekreftelse={this.apneBekreftelse}
                    rootUrlPlaner={rootUrlPlaner}
                />
            </React.Fragment>
        );
    }
}

GodkjentPlan.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    delmednav: delmednavPt,
    fastlegeDeling: delMedFastlegePt,
    rootUrlPlaner: PropTypes.string,
    delMedNavFunc: PropTypes.func,
    delMedFastlege: PropTypes.func,
    avbrytDialog: PropTypes.func,
};

export default GodkjentPlan;
