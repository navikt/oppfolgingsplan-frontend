import React from "react";
import OppfolgingsdialogTidligereUtenSykmelding from "./OppfolgingsdialogTidligereUtenSykmelding";
import { Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplanerUtenAktivSykmelding: OppfolgingsplanDTO[];
}

const OppfolgingsdialogerUtenAktivSykmelding = ({
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
            <OppfolgingsdialogTidligereUtenSykmelding
              oppfolgingsplanUtenAktivSykmelding={oppfolgingsplan}
              key={idx}
            />
          );
        })}
      </SpacedDiv>
    </div>
  );
};

export default OppfolgingsdialogerUtenAktivSykmelding;
