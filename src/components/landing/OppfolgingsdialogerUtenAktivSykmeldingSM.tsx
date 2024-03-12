import React from "react";
import OppfolgingsdialogTidligereUtenSykmeldingSM from "./OppfolgingsdialogTidligereUtenSykmeldingSM";
import { Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplanerUtenAktivSykmelding: OppfolgingsplanDTO[];
}

const OppfolgingsdialogerUtenAktivSykmeldingSM = ({
  oppfolgingsplanerUtenAktivSykmelding,
}: Props) => {
  return (
    <div>
      <Heading size={"medium"} level={"2"}>
        Tidligere oppfølgingsplaner
      </Heading>
      <SpacedDiv className="mt-4">
        {oppfolgingsplanerUtenAktivSykmelding.map((oppfolgingsplan, idx) => {
          return (
            <OppfolgingsdialogTidligereUtenSykmeldingSM
              oppfolgingsplanUtenAktivSykmelding={oppfolgingsplan}
              key={idx}
            />
          );
        })}
      </SpacedDiv>
    </div>
  );
};

export default OppfolgingsdialogerUtenAktivSykmeldingSM;
