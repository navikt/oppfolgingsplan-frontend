import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { oppfolgingsplanPt } from "../../../../propTypes/opproptypes";
import { InfoSirkelFyllImage } from "@/common/images/imageComponents";
import { Checkbox } from "@navikt/ds-react";

const texts = {
  delMedNav: "Del planen med NAV",
  preDelMedNav: "Planen blir delt med NAV når du godkjenner den.",
};

const Icon = styled.img`
  height: auto;
  width: 1.5em;
  margin-right: 0.5em;
`;

const IconTextBox = styled.div`
  display: flex;
  align-items: center;
`;

export const SharingCheckbox = ({ oppfolgingsplan, checked, onChange }) => {
  return (
    <div>
      {oppfolgingsplan.godkjenninger.find((godkjenning) => {
        return godkjenning.delMedNav;
      }) ? (
        <IconTextBox>
          <Icon src={InfoSirkelFyllImage} alt="" />
          <strong>{texts.preDelMedNav}</strong>
        </IconTextBox>
      ) : (
        <Checkbox checked={checked} onChange={onChange}>
          {texts.delMedNav}
        </Checkbox>
      )}
    </div>
  );
};

SharingCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  oppfolgingsplan: oppfolgingsplanPt,
};
