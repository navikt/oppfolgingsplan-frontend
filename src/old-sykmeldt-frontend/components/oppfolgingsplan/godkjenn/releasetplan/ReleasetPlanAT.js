import React, { Component } from "react";
import PropTypes from "prop-types";
import getContextRoot from "@/common/utils/getContextRoot";
import {
  delMedFastlegePt,
  delmednavPt,
  oppfolgingsplanPt,
} from "@/propTypes/opproptypes";
import ArbeidsgiverHarTvangsgodkjent from "./ArbeidsgiverHarTvangsgodkjent";
import ReleasetPlan from "./ReleasetPlan";

const foersteInnloggingSidenGodkjenning = (oppfolgingsdialog) => {
  return (
    new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget) <
    new Date(oppfolgingsdialog.godkjentPlan.opprettetTidspunkt)
  );
};

const planBleTvangsgodkjent = (oppfolgingsdialog) => {
  return oppfolgingsdialog.godkjentPlan.tvungenGodkjenning;
};

class ReleasetPlanAT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settTvungenGodkjenning: false,
    };
    this.markerMottattTvungenGodkjenning =
      this.markerMottattTvungenGodkjenning.bind(this);
  }

  markerMottattTvungenGodkjenning() {
    this.setState({ settTvungenGodkjenning: true });
  }

  render() {
    const {
      oppfolgingsdialog,
      avbrytDialog,
      fastlegeDeling,
      delMedFastlege,
      delMedNavFunc,
      delmednav,
      oppfolgingsdialoger,
    } = this.props;
    if (
      !this.state.settTvungenGodkjenning &&
      foersteInnloggingSidenGodkjenning(oppfolgingsdialog) &&
      planBleTvangsgodkjent(oppfolgingsdialog)
    ) {
      return (
        <ArbeidsgiverHarTvangsgodkjent
          oppfolgingsdialog={oppfolgingsdialog}
          markerMottattTvungenGodkjenning={this.markerMottattTvungenGodkjenning}
        />
      );
    }
    return (
      <ReleasetPlan
        oppfolgingsdialog={oppfolgingsdialog}
        avbrytDialog={avbrytDialog}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
        delMedNavFunc={delMedNavFunc}
        delmednav={delmednav}
        oppfolgingsdialoger={oppfolgingsdialoger}
        rootUrlPlaner={`${getContextRoot()}`}
      />
    );
  }
}

ReleasetPlanAT.propTypes = {
  avbrytDialog: PropTypes.func,
  delMedFastlege: PropTypes.func,
  delMedNavFunc: PropTypes.func,
  oppfolgingsdialog: oppfolgingsplanPt,
  delmednav: delmednavPt,
  fastlegeDeling: delMedFastlegePt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
};

export default ReleasetPlanAT;
