import React from "react";
import { RootPages, SideMenu } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import Link from "next/link";
import { dineSykemeldteRoot } from "../../../environments/publicEnv";

export const ArbeidsgiverSideMenu = ({
  sykmeldt,
}: Props): React.ReactElement | null => {
  if (sykmeldt?.narmestelederId === undefined) {
    return null;
  }

  return (
    <SideMenu
      sykmeldtName={sykmeldt?.navn ?? ""}
      sykmeldtId={sykmeldt?.narmestelederId ?? ""}
      activePage={RootPages.Oppfolgingsplaner}
      routes={{
        Sykmeldinger: {
          // TODO: Notifications are disabled for all routes until eSyfo decides how they want to handle notifications
          // notifications: sykmeldt.sykmeldinger.filter((it) => !it.lest).length,
          notifications: 0,
          internalRoute: ({ children, ...rest }) => (
            <Link
              href={`/sykmeldt/${sykmeldt.narmestelederId}/sykmeldinger`}
              passHref
              legacyBehavior
              scroll={false}
            >
              <a {...rest}>{children}</a>
            </Link>
          ),
        },
        Soknader: {
          // notifications: sykmeldt.previewSoknader.filter((it) => isPreviewSoknadNotification(it)).length,
          notifications: 0,
          internalRoute: ({ children, ...rest }) => (
            <Link
              href={`/sykmeldt/${sykmeldt.narmestelederId}/soknader`}
              passHref
              legacyBehavior
              scroll={false}
            >
              <a {...rest}>{children}</a>
            </Link>
          ),
        },
        Meldinger: {
          hide: true,
          // notifications: sykmeldt.aktivitetsvarsler.filter((it) => !it.lest).length,
          notifications: 0,
          internalRoute: ({ children, ...rest }) => (
            <Link
              href={`/sykmeldt/${sykmeldt.narmestelederId}/meldinger`}
              passHref
              legacyBehavior
              scroll={false}
            >
              <a {...rest}>{children}</a>
            </Link>
          ),
        },
        // Dialogmoter: sykmeldt.dialogmoter.length,
        Dialogmoter: 0,
        // Oppfolgingsplaner: sykmeldt.oppfolgingsplaner.length,
        Oppfolgingsplaner: 0,
        DineSykmeldte: {
          notifications: 0,
          internalRoute: ({ children, ...rest }) => (
            <Link
              href={dineSykemeldteRoot}
              passHref
              legacyBehavior
              scroll={false}
            >
              <a {...rest}>{children}</a>
            </Link>
          ),
        },
      }}
    />
  );
};

interface Props {
  sykmeldt?: Sykmeldt;
}
