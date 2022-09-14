import React from 'react';
import PropTypes from 'prop-types';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { restdatoTildato } from '@/common/utils/datoUtils';
import { oppfolgingsplanPt } from '../../../propTypes/opproptypes';

const texts = {
  title: 'Se tidligere utgaver av denne planen',
};

const textLink = (date) => {
  return `Oppfølgingsplanen endret ${date}`;
};

const TidligereAvbruttePlaner = ({ oppfolgingsdialog, rootUrlPlaner }) => {
  if (oppfolgingsdialog.avbruttPlanListe && oppfolgingsdialog.avbruttPlanListe.length > 0) {
    return (
      <Ekspanderbartpanel border tittel={texts.title}>
        <ul>
          {oppfolgingsdialog.avbruttPlanListe.map((avbruttPlan, idx) => {
            return (
              <li key={idx}>
                <a className="lenke" href={`${rootUrlPlaner}/oppfolgingsplaner/${avbruttPlan.id}/`}>
                  {textLink(restdatoTildato(avbruttPlan.tidspunkt))}
                </a>
              </li>
            );
          })}
        </ul>
      </Ekspanderbartpanel>
    );
  }
  return null;
};

TidligereAvbruttePlaner.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  rootUrlPlaner: PropTypes.string,
};

export default TidligereAvbruttePlaner;
