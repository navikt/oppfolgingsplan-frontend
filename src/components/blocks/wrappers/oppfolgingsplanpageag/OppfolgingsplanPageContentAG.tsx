import React, { ReactNode } from "react";
import {
  erOppfolgingsplanKnyttetTilGyldigSykmeldingAG,
  erUtloptGodkjentPlan,
  findAktivPlan,
} from "../../../../utils/oppfolgingplanUtils";
import { Sykmeldt } from "../../../../schema/sykmeldtSchema";
import { IkkeTilgangTilPlanInfoBoks } from "../../infoboks/IkkeTilgangTilPlanInfoBoks";
import { statusPageToDisplayAG } from "../../../../utils/statusPageUtils";
import { CantEditPlanError } from "../../error/CantEditPlanError";
import { BodyLong } from "@navikt/ds-react";
import {
  OppfolgingsplanDTO,
  StillingDTO,
} from "../../../../schema/oppfolgingsplanSchema";

const textStilling = (stilling: StillingDTO) => {
  return `Den sykmeldte jobber som ${stilling?.yrke?.toLowerCase()} ${
    stilling.prosent
  } %`;
};

interface Props {
  allePlaner: OppfolgingsplanDTO[];
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
  const stilling: StillingDTO | undefined =
    aktivPlan?.arbeidstaker.stillinger[0];

  const erOppfolgingsdialogTilgjengelig =
    harTilgang &&
    aktivPlan &&
    sykmeldt &&
    (erUtloptGodkjentPlan(aktivPlan) ||
      erOppfolgingsplanKnyttetTilGyldigSykmeldingAG(
        aktivPlan,
        sykmeldt.orgnummer,
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
