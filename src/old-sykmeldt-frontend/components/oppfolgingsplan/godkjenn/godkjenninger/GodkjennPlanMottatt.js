import React, { useState } from "react";
import PropTypes from "prop-types";
import { oppfolgingsplanPt } from "../../../../propTypes/opproptypes";
import OppfolgingsplanInnholdboks from "../../../app/OppfolgingsplanInnholdboks";
import GodkjennPlanTidspunkt from "../GodkjennPlanTidspunkt";
import TidligereAvbruttePlaner from "../TidligereAvbruttePlaner";
import GodkjennPlanTilAltinnTekst from "./GodkjennPlanTilAltinnTekst";
import { EditButton } from "./EditButton";
import { SharingCheckbox } from "./SharingCheckbox";
import PlanEkspanderbar from "../PlanEkspanderbar";
import { PlanMottattImage } from "@/common/images/imageComponents";
import { Button } from "@navikt/ds-react";

const texts = {
  godkjennPlanMottattUtvidbar: {
    title: "Se planen",
  },
  godkjennPlanMottattKnapper: {
    buttonApprove: "Godkjenn",
  },
  godkjennPlanMottatt: {
    title: "Ønsker du å godkjenne denne versjonen?",
  },
  delMedNav: "Del planen med NAV",
  preDelMedNav: "Planen vil bli delt med NAV når du har godkjent den.",
};

const TextReceived = ({ leaderName }) => {
  return (
    <React.Fragment>
      Du har mottatt en ny oppfølgingsplan fra din arbeidsgiver:{" "}
      <b>{leaderName}</b> for godkjenning.
    </React.Fragment>
  );
};
TextReceived.propTypes = {
  leaderName: PropTypes.string,
};

export const GodkjennPlanMottattKnapper = ({
  godkjennPlan,
  oppfolgingsdialog,
}) => {
  const [delMedNav, setDelMedNav] = useState(false);

  const handleChange = () => {
    setDelMedNav(!delMedNav);
  };

  return (
    <div>
      <SharingCheckbox
        checked={delMedNav}
        onChange={handleChange}
        oppfolgingsplan={oppfolgingsdialog}
      />
      <div className="knapperad knapperad__element knapperad--justervenstre">
        <Button
          variant={"primary"}
          name="godkjentKnapp"
          id="godkjentKnapp"
          autoFocus
          onClick={() => {
            godkjennPlan(oppfolgingsdialog.id, null, true, delMedNav);
          }}
        >
          {texts.godkjennPlanMottattKnapper.buttonApprove}
        </Button>
      </div>
    </div>
  );
};
GodkjennPlanMottattKnapper.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  godkjennPlan: PropTypes.func,
};

const GodkjennPlanMottatt = ({
  oppfolgingsdialog,
  rootUrlPlaner,
  godkjennPlan,
  avvisDialog,
}) => {
  return (
    <OppfolgingsplanInnholdboks
      svgUrl={PlanMottattImage}
      svgAlt=""
      tittel={texts.godkjennPlanMottatt.title}
    >
      <div className="godkjennPlanMottatt">
        <div className="blokk">
          <p>
            <TextReceived
              leaderName={oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn}
            />
          </p>
        </div>

        <div className="blokk--xxs">
          <GodkjennPlanTidspunkt
            gyldighetstidspunkt={
              oppfolgingsdialog.godkjenninger[0].gyldighetstidspunkt
            }
          />
        </div>
        <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog} />
        <EditButton
          oppfolgingsdialog={oppfolgingsdialog}
          avvisDialog={avvisDialog}
        />
        <TidligereAvbruttePlaner
          oppfolgingsdialog={oppfolgingsdialog}
          rootUrlPlaner={rootUrlPlaner}
        />

        <GodkjennPlanTilAltinnTekst />

        <GodkjennPlanMottattKnapper
          oppfolgingsdialog={oppfolgingsdialog}
          godkjennPlan={godkjennPlan}
          avvisDialog={avvisDialog}
        />
      </div>
    </OppfolgingsplanInnholdboks>
  );
};

GodkjennPlanMottatt.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  rootUrlPlaner: PropTypes.string,
  avvisDialog: PropTypes.func,
  godkjennPlan: PropTypes.func,
};

export default GodkjennPlanMottatt;
