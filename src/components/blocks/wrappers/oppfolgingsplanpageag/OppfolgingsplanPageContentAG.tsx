import React, { ReactNode } from "react";
import { Oppfolgingsplan, Stilling } from "../../../../types/oppfolgingsplan";
import {
  erOppfolgingsplanKnyttetTilGyldigSykmeldingAG,
  erOppfolgingsplanTidligere,
  findAktivPlan,
} from "../../../../utils/oppfolgingplanUtils";
import { Sykmeldt } from "../../../../schema/sykmeldtSchema";
import { IkkeTilgangTilPlanInfoBoks } from "../../infoboks/IkkeTilgangTilPlanInfoBoks";
import { statusPageToDisplayAG } from "../../../../utils/statusPageUtils";
import { CantEditPlanError } from "../../error/CantEditPlanError";
import { BodyLong } from "@navikt/ds-react";

const textStilling = (stilling: Stilling) => {
  return `Den sykmeldte jobber som ${stilling?.yrke?.toLowerCase()} ${
    stilling.prosent
  } %`;
};

interface Props {
  allePlaner: Oppfolgingsplan[];
  sykmeldt: Sykmeldt;
  aktivPlanId: number;
  isOppgaverOrTiltak: boolean;
  harTilgang: boolean;
  children: ReactNode;
}

export const OppfolgingsplanPageContentAG = ({
  allePlaner,
  sykmeldt,
  aktivPlanId,
  isOppgaverOrTiltak,
  harTilgang,
  children,
}: Props) => {
  const aktivPlan = findAktivPlan(aktivPlanId, allePlaner);
  const stilling: Stilling | undefined = aktivPlan?.arbeidstaker.stillinger[0];

  const erOppfolgingsdialogTilgjengelig =
    harTilgang &&
    aktivPlan &&
    sykmeldt &&
    (erOppfolgingsplanTidligere(aktivPlan) ||
      erOppfolgingsplanKnyttetTilGyldigSykmeldingAG(
        aktivPlan,
        sykmeldt.orgnummer
      ));

  if (!erOppfolgingsdialogTilgjengelig) {
    return <IkkeTilgangTilPlanInfoBoks />;
  }

  const planStatus = statusPageToDisplayAG(aktivPlan);

  const planIsNotEditable =
    planStatus == "GODKJENNPLANMOTTATT" ||
    planStatus == "MOTTATTFLEREGODKJENNINGER" ||
    planStatus == "GODKJENTPLANAVBRUTT" ||
    planStatus == "SENDTPLANTILGODKJENNING" ||
    planStatus == "GODKJENTPLAN";

  if (planIsNotEditable) {
    return <CantEditPlanError planStatus={planStatus} aktivPlan={aktivPlan} />;
  }

  return (
    <>
      {isOppgaverOrTiltak && stilling?.yrke && (
        <BodyLong spacing={true} size={"medium"}>
          {textStilling(stilling)}
        </BodyLong>
      )}
      {children}
    </>
  );
};