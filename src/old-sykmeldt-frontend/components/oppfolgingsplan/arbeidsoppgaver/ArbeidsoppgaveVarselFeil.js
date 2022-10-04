import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Alert } from "@navikt/ds-react";
import { isLabs } from "@/common/utils/urlUtils";

const AlertStyled = styled(Alert)`
  margin-top: 1em;
`;

const ArbeidsoppgaveVarselFeil = ({ tekst }) => {
  return (
    <div className="arbeidsoppgave__opprettet--feilmelding">
      <AlertStyled
        className="alertstripe--notifikasjonboks"
        variant={"warning"}
      >
        {isLabs() ? "Denne funksjonen virker ikke på testsiden" : tekst}
      </AlertStyled>
    </div>
  );
};
ArbeidsoppgaveVarselFeil.propTypes = {
  tekst: PropTypes.string,
};

export default ArbeidsoppgaveVarselFeil;
