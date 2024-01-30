import { BodyLong } from "@navikt/ds-react";
import React, { ReactNode } from "react";
import { CantEditPlanError } from "../../error/CantEditPlanError";
import {
  erOppfolgingsplanKnyttetTilGyldigSykmelding,
  erOppfolgingsplanTidligere,
  findAktivPlan,
} from "../../../../utils/oppfolgingplanUtils";
import { SykmeldingDTO } from "../../../../schema/sykmeldingSchema";
import { IkkeTilgangTilPlanInfoBoks } from "../../infoboks/IkkeTilgangTilPlanInfoBoks";
import { statusPageToDisplaySM } from "../../../../utils/statusPageUtils";
import {
  OppfolgingsplanDTO,
  StillingDTO,
} from "../../../../schema/oppfolgingsplanSchema";

const textStilling = (stilling: StillingDTO) => {
  return `Du jobber hos denne arbeidsgiveren som ${stilling?.yrke?.toLowerCase()} ${
    stilling.prosent
  } %`;
};

interface Props {
  allePlaner: OppfolgingsplanDTO[];
  sykmeldinger: SykmeldingDTO[];
  aktivPlanId: number;
  isOppgaverOrTiltak: boolean;
  children: ReactNode;
}

export const OppfolgingsplanPageContentSM = ({
  allePlaner,
  sykmeldinger,
  aktivPlanId,
  isOppgaverOrTiltak,
  children,
}: Props) => {
  const aktivPlan = findAktivPlan(aktivPlanId, allePlaner);
  const stilling: StillingDTO | undefined =
    aktivPlan?.arbeidstaker.stillinger[0];

  const erOppfolgingsdialogTilgjengelig =
    aktivPlan &&
    sykmeldinger &&
    (erOppfolgingsplanTidligere(aktivPlan) ||
      erOppfolgingsplanKnyttetTilGyldigSykmelding(aktivPlan, sykmeldinger));

  if (!erOppfolgingsdialogTilgjengelig) {
    return <IkkeTilgangTilPlanInfoBoks />;
  }

  const planStatus = statusPageToDisplaySM(aktivPlan);

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
