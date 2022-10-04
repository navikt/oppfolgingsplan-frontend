import React from "react";
import OppfolgingsdialogTidligereUtenSykmelding from "./OppfolgingsdialogTidligereUtenSykmelding";
import { Heading } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplanerUtenAktivSykmelding: Oppfolgingsplan[];
}

const OppfolgingsdialogerUtenAktivSykmelding = ({
  oppfolgingsplanerUtenAktivSykmelding,
}: Props) => {
  return (
    <div>
      <Heading size={"medium"} level={"2"}>
        Tidligere oppfølgingsplaner
      </Heading>
      <div>
        {oppfolgingsplanerUtenAktivSykmelding.map((oppfolgingsplan, idx) => {
          return (
            <OppfolgingsdialogTidligereUtenSykmelding
              oppfolgingsplanUtenAktivSykmelding={oppfolgingsplan}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OppfolgingsdialogerUtenAktivSykmelding;
