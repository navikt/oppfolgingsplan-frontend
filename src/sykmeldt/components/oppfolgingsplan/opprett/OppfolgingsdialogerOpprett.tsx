import React, {useState} from 'react';
import ArbeidsgiverSkjemaForm from './ArbeidsgiverSkjema';
import BaserTidligereSkjema from './BaserTidligereSkjema';
import {Modal} from "@navikt/ds-react";
import {ArbeidsgivereForGyldigeSykmeldinger} from "@/common/utils/sykmeldingUtils";
import Feilmelding from "@/common/components/error/Feilmelding";
import {OppfolgingsplanDTO} from "@/server/service/schema/oppfolgingsplanSchema";

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

interface Props {
    oppfolgingsplaner: OppfolgingsplanDTO[];
    arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
    visOppfolgingsdialogOpprett: boolean;

    setVisOppfolgingsdialogOpprett(vis: boolean): void;
}

const OppfolgingsdialogerOpprett = ({
                                        oppfolgingsplaner,
                                        arbeidsgivere,
                                        visOppfolgingsdialogOpprett,
                                        setVisOppfolgingsdialogOpprett
                                    }: Props) => {

    //Hva er det sidegreiene?
    const [side, setSide] = useState(arbeidsgivere.length > 1 ? 1 : 2)

    const settVirksomhetsnummer = (values: any) => {
        // if (finnNyesteTidligereOppfolgingsdialogMedVirksomhet(this.props.oppfolgingsdialoger, values.arbeidsgiver)) {
        //     this.setState({
        //         side: this.state.side + 1,
        //         virksomhetsnummer: values.arbeidsgiver,
        //     });
        // } else {
        //     this.props.opprett(values.arbeidsgiver);
        // }
    }

    const opprett = (values: any) => {
        // if (values.baserPaaTidligerePlan === 'true') {
        //     const oppfolgingsplan.ts = finnNyesteTidligereOppfolgingsdialogMedVirksomhet(
        //         this.props.oppfolgingsdialoger,
        //         this.state.virksomhetsnummer
        //     );
        //     if (oppfolgingsplan.ts) {
        //         this.props.kopier.mutate(oppfolgingsplan.ts.id);
        //     } else {
        //         this.setState({
        //             side: 0,
        //         });
        //     }
        // } else {
        //     this.props.opprett(this.state.virksomhetsnummer);
        // }
    }

    return (
        <Modal
            open={visOppfolgingsdialogOpprett}
            aria-label="Opprett oppfølgingsplan"
            onClose={() => {
                setVisOppfolgingsdialogOpprett(false);
            }}
        >
            <Modal.Content>
                {(() => {
                    if (arbeidsgivere.length === 1 && !arbeidsgivere[0].harNaermesteLeder) {
                        return <Feilmelding title={texts.errorNoLeader.title}
                                            description={texts.errorNoLeader.message}/>;
                    }
                    else if (side === 0) {
                        return <Feilmelding title={texts.errorNoGodkjentPlan.title}
                                            description={texts.errorNoGodkjentPlan.message}/>;
                    }
                    return (
                        <div>
                            {side === 1 && (
                                <ArbeidsgiverSkjemaForm
                                    arbeidsgivere={arbeidsgivere}
                                    oppfolgingsplaner={oppfolgingsplaner}
                                    handleSubmit={(values: any) => settVirksomhetsnummer(values)}
                                />
                            )}
                            {side === 2 && <BaserTidligereSkjema onSubmit={opprett}/>}
                        </div>
                    );
                })()}
            </Modal.Content>
        </Modal>
    );
}

export default OppfolgingsdialogerOpprett;
