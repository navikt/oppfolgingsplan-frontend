import React from "react";
import { RootPages, SideMenu } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";

export const ArbeidsgiverSideMenu = ({ sykmeldt }: Props): JSX.Element => {
  return (
    <SideMenu
      sykmeldtName={sykmeldt?.navn ?? ""}
      sykmeldtId={sykmeldt?.narmestelederId ?? ""}
      activePage={RootPages.Oppfolgingsplaner}
      routes={{
        Soknader: 0,
        Sykmeldinger: 0,
        Meldinger: false,
        Dialogmoter: 0,
        Oppfolgingsplaner: 0,
        DineSykmeldte: 0,
      }}
    />
  );
};

interface Props {
  sykmeldt?: Sykmeldt;
}
