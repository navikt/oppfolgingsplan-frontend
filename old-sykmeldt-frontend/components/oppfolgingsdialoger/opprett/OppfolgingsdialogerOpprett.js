import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {opprettOppfolgingArbeidsgiverPt} from '../../../propTypes';
import {oppfolgingsplanPt} from '../../../propTypes/opproptypes';
import {finnNyesteTidligereOppfolgingsdialogMedVirksomhet} from '@/common/utils/oppfolgingsdialogUtils';
import ArbeidsgiverSkjemaForm from './ArbeidsgiverSkjema';
import Feilmelding from '../../Feilmelding';
import BaserTidligereSkjema from './BaserTidligereSkjema';

const texts = {
    errorNoLeader: {
        title: 'Kan ikke opprette ny plan',
        message: 'Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn',
    },
    errorNoGodkjentPlan: {
        title: 'Kan ikke opprette ny plan',
        message: 'Fant ingen tidligere godkjent plan med virksomhet',
    },
};

class OppfolgingsdialogerOpprett extends Component {
    constructor(props) {
        const arbeidsgivere = props.arbeidsgivere;
        super(props);
        this.state = {
            side: arbeidsgivere.length > 1 ? 1 : 2,
            virksomhetsnummer: arbeidsgivere.length === 1 ? arbeidsgivere[0].virksomhetsnummer : '',
        };
        this.settVirksomhetsnummer = this.settVirksomhetsnummer.bind(this);
        this.opprett = this.opprett.bind(this);
    }

    settVirksomhetsnummer(values) {
        if (finnNyesteTidligereOppfolgingsdialogMedVirksomhet(this.props.oppfolgingsdialoger, values.arbeidsgiver)) {
            this.setState({
                side: this.state.side + 1,
                virksomhetsnummer: values.arbeidsgiver,
            });
        } else {
            this.props.opprett(values.arbeidsgiver);
        }
    }

    opprett(values) {
        if (values.baserPaaTidligerePlan === 'true') {
            const oppfolgingsplan = finnNyesteTidligereOppfolgingsdialogMedVirksomhet(
                this.props.oppfolgingsdialoger,
                this.state.virksomhetsnummer
            );
            if (oppfolgingsplan) {
                this.props.kopier(oppfolgingsplan.id);
            } else {
                this.setState({
                    side: 0,
                });
            }
        } else {
            this.props.opprett(this.state.virksomhetsnummer);
        }
    }

    render() {
        const {arbeidsgivere, oppfolgingsdialoger, visOppfolgingsdialogOpprett} = this.props;
        return (
            <Modal
                open={visOppfolgingsdialogOpprett}
                aria-label="Modal demo"
                onClose={() => {
                    visOppfolgingsdialogOpprett(false);
                }}
            >
                <Modal.Content>
                    {(() => {
                        if (arbeidsgivere.length === 1 && !arbeidsgivere[0].harNaermesteLeder) {
                            return <Feilmelding tittel={texts.errorNoLeader.title}
                                                melding={texts.errorNoLeader.message}/>;
                        } else if (this.state.side === 0) {
                            return <Feilmelding tittel={texts.errorNoGodkjentPlan.title}
                                                melding={texts.errorNoGodkjentPlan.message}/>;
                        }
                        return (
                            <div>
                                {this.state.side === 1 && (
                                    <ArbeidsgiverSkjemaForm
                                        arbeidsgivere={arbeidsgivere}
                                        oppfolgingsdialoger={oppfolgingsdialoger}
                                        onSubmit={this.settVirksomhetsnummer}
                                    />
                                )}
                                {this.state.side === 2 && <BaserTidligereSkjema onSubmit={this.opprett}/>}
                            </div>
                        );
                    })()}
                </Modal.Content>
            </Modal>
        );
    }
}

OppfolgingsdialogerOpprett.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
    visOppfolgingsdialogOpprett: PropTypes.func,
    opprett: PropTypes.func,
    kopier: PropTypes.func,
};

export default OppfolgingsdialogerOpprett;
