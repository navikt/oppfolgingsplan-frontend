import React from 'react';
import PropTypes from 'prop-types';
import {delMedFastlegePt, delmednavPt, oppfolgingsplanPt} from '../../../../propTypes/opproptypes';
import GodkjentPlan from './GodkjentPlan';
import GodkjentPlanAvbrutt from './GodkjentPlanAvbrutt';
import OppfolgingsdialogPlanInfoboks from './OppfolgingsdialogPlanInfoboks';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

const ReleasetPlan = ({
                          oppfolgingsdialog,
                          rootUrlPlaner,
                          delMedNavFunc,
                          delmednav,
                          fastlegeDeling,
                          delMedFastlege,
                          oppfolgingsdialoger,
                      }) => {
    if (oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.avbruttPlan) {
        return (
            <GodkjentPlanAvbrutt
                oppfolgingsdialog={oppfolgingsdialog}
                oppfolgingsdialoger={oppfolgingsdialoger}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                rootUrlPlaner={rootUrlPlaner}
            />
        );
    }
    return (
        <div>
            <GodkjentPlan
                oppfolgingsdialog={oppfolgingsdialog}
                avbrytDialog={avbrytDialog}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                rootUrlPlaner={rootUrlPlaner}
            />
            <OppfolgingsdialogPlanInfoboks/>
            <TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsdialog} rootUrlPlaner={rootUrlPlaner}/>
        </div>
    );
};

ReleasetPlan.propTypes = {
    delmednav: delmednavPt,
    oppfolgingsdialog: oppfolgingsplanPt,
    fastlegeDeling: delMedFastlegePt,
    delMedNavFunc: PropTypes.func,
    avbrytDialog: PropTypes.func,
    delMedFastlege: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
};

export default ReleasetPlan;
