import React from "react";
import PropTypes from "prop-types";
import { restdatoTildato } from "@/common/utils/dateUtils";
import { oppfolgingsplanPt } from "../../../propTypes/opproptypes";
import { Accordion } from "@navikt/ds-react";

const texts = {
  title: "Se tidligere utgaver av denne planen",
};

const textLink = (date) => {
  return `Oppfølgingsplanen endret ${date}`;
};

const TidligereAvbruttePlaner = ({ oppfolgingsdialog, rootUrlPlaner }) => {
  if (
    oppfolgingsdialog.avbruttPlanListe &&
    oppfolgingsdialog.avbruttPlanListe.length > 0
  ) {
    return (
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>{texts.title}</Accordion.Header>
          <Accordion.Content>
            <ul>
              {oppfolgingsdialog.avbruttPlanListe.map((avbruttPlan, idx) => {
                return (
                  <li key={idx}>
                    <a
                      className="lenke"
                      href={`${rootUrlPlaner}/oppfolgingsplaner/${avbruttPlan.id}/`}
                    >
                      {textLink(restdatoTildato(avbruttPlan.tidspunkt))}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  }
  return null;
};

TidligereAvbruttePlaner.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  rootUrlPlaner: PropTypes.string,
};

export default TidligereAvbruttePlaner;
