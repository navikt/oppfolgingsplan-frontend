import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { InfoSirkelFyllImage } from '@/common/images/imageComponents';

const texts = {
  delMedNav: 'Del planen med NAV',
  preDelMedNav: 'Planen blir delt med NAV når du godkjenner den.',
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
        <Checkbox checked={checked} onChange={onChange} label={texts.delMedNav} />
      )}
    </div>
  );
};

SharingCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  oppfolgingsplan: oppfolgingsplanPt,
};
