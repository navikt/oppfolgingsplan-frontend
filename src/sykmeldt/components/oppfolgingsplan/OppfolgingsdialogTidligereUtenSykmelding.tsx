import React from "react";
import { hentStatusUtenAktivSykmelding } from "@/common/utils/teaserUtils";
import getContextRoot from "@/common/utils/getContextRoot";
import { BodyLong, Heading, LinkPanel } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import Image from "next/image";
import { PlanIkkeAktivSykmeldingImage } from "@/common/images/imageComponents";

interface Props {
  oppfolgingsplanUtenAktivSykmelding: Oppfolgingsplan;
}

const OppfolgingsdialogTidligereUtenSykmelding = ({
  oppfolgingsplanUtenAktivSykmelding,
}: Props) => {
  const planStatus = hentStatusUtenAktivSykmelding(
    oppfolgingsplanUtenAktivSykmelding
  );

  return (
    <LinkPanel
      href={`${getContextRoot()}/oppfolgingsplaner/${
        oppfolgingsplanUtenAktivSykmelding.id
      }`}
      border
    >
      <Image alt="" src={PlanIkkeAktivSykmeldingImage} />
      <div>
        <Heading size={"medium"} level={"3"}>
          {oppfolgingsplanUtenAktivSykmelding.virksomhet?.navn}
        </Heading>
        <BodyLong>{planStatus.tekst}</BodyLong>
      </div>
    </LinkPanel>
  );
};

export default OppfolgingsdialogTidligereUtenSykmelding;
