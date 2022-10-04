import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { KANGJENNOMFOERES } from "@/common/konstanter";
import { arbeidsoppgavePt } from "../../../propTypes/opproptypes";
import ArbeidsoppgaveInformasjonKnapper from "./ArbeidsoppgaveInformasjonKnapper";
import {
  AdvarselImage,
  HakeGronnImage,
  HakeOransjeImage,
  KryssRoedImage,
} from "@/common/images/imageComponents";

const texts = {
  hentArbeidsoppgaveUnderTekst: {
    kan: "Kan gjennomføres som normalt",
    tilrettelegging: "Kan gjennomføres med hjelp/hjelpemiddel",
    kanIkke: "Kan ikke gjennomføres",
    ikkeVurdert: "Ikke vurdert",
  },
};

export const hentArbeidsoppgaveIkon = (arbeidsoppgave) => {
  if (arbeidsoppgave.gjennomfoering) {
    if (
      arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN
    ) {
      return HakeGronnImage;
    } else if (
      arbeidsoppgave.gjennomfoering.kanGjennomfoeres ===
      KANGJENNOMFOERES.TILRETTELEGGING
    ) {
      return HakeOransjeImage;
    } else if (
      arbeidsoppgave.gjennomfoering.kanGjennomfoeres ===
      KANGJENNOMFOERES.KAN_IKKE
    ) {
      return KryssRoedImage;
    }
  }
  return AdvarselImage;
};

export const hentArbeidsoppgaveUnderTekst = (arbeidsoppgave) => {
  if (arbeidsoppgave.gjennomfoering) {
    if (
      arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN
    ) {
      return texts.hentArbeidsoppgaveUnderTekst.kan;
    } else if (
      arbeidsoppgave.gjennomfoering.kanGjennomfoeres ===
      KANGJENNOMFOERES.TILRETTELEGGING
    ) {
      return texts.hentArbeidsoppgaveUnderTekst.tilrettelegging;
    } else if (
      arbeidsoppgave.gjennomfoering.kanGjennomfoeres ===
      KANGJENNOMFOERES.KAN_IKKE
    ) {
      return texts.hentArbeidsoppgaveUnderTekst.kanIkke;
    }
  }
  return texts.hentArbeidsoppgaveUnderTekst.ikkeVurdert;
};

const ArbeidsoppgaveOverskriftImg = styled.div`
  display: flex;
  align-self: flex-start;
  flex-grow: 0;
`;

const ArbeidsoppgaveOverskrift = ({
  fnr,
  arbeidsoppgave,
  lagreSkjema,
  visLagreSkjema,
  sendSlett,
}) => {
  return (
    <div className="arbeidsoppgaveTabellUtvidbarOverskrift">
      <div className="arbeidsoppgaverListe__kol">
        <ArbeidsoppgaveOverskriftImg>
          <img
            className="arbeidsoppgaveOverskrift__ikon"
            src={hentArbeidsoppgaveIkon(arbeidsoppgave)}
            alt=""
          />
        </ArbeidsoppgaveOverskriftImg>
        <div className="arbeidsoppgaveOverskrift__tekst">
          <p>{arbeidsoppgave.arbeidsoppgavenavn}</p>
          <p>{hentArbeidsoppgaveUnderTekst(arbeidsoppgave)}</p>
          <ArbeidsoppgaveInformasjonKnapper
            arbeidsoppgave={arbeidsoppgave}
            fnr={fnr}
            lagreSkjema={lagreSkjema}
            visLagreSkjema={visLagreSkjema}
            sendSlett={sendSlett}
          />
        </div>
      </div>
    </div>
  );
};

ArbeidsoppgaveOverskrift.propTypes = {
  fnr: PropTypes.string,
  arbeidsoppgave: arbeidsoppgavePt,
  lagreSkjema: PropTypes.bool,
  visLagreSkjema: PropTypes.func,
  sendSlett: PropTypes.func,
};

export default ArbeidsoppgaveOverskrift;
