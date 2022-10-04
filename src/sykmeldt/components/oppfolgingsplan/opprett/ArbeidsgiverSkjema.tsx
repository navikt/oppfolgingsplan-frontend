import React from "react";
import getContextRoot from "@/common/utils/getContextRoot";
import {
  erAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
  erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver,
  hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver,
} from "@/common/utils/oppfolgingsdialogUtils";
import { VarseltrekantImage } from "@/common/images/imageComponents";
import { Button } from "@navikt/ds-react";
import Link from "next/link";
import { ArbeidsgivereForGyldigeSykmeldinger } from "@/common/utils/sykmeldingUtils";
import Image from "next/image";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";

const texts = {
  arbeidsgiverSkjema: {
    question: "Hvilken arbeidsgiver skal du lage en plan med?",
    buttonSubmit: "VELG ARBEIDSGIVER",
  },
  velgArbeidsgiverUndertekst: {
    alreadyCreatedPlan:
      "Du har allerede en oppfølgingsplan med denne arbeidsgiveren",
    noLeader:
      "Vi har ikke navnet på lederen din. Be arbeidsgiveren registrere det i Altinn.",
    leader: "Nærmeste leder er ",
  },
};

const OPPFOLGINGSKJEMANAVN = "OPPRETT_DIALOG";

interface ArbeidsgiverUndertekstProps {
  oppfolgingsplaner: Oppfolgingsplan[];
  arbeidsgiver: ArbeidsgivereForGyldigeSykmeldinger;
}

export const VelgArbeidsgiverUndertekst = ({
  oppfolgingsplaner,
  arbeidsgiver,
}: ArbeidsgiverUndertekstProps) => {
  if (
    erAktivOppfolgingsdialogOpprettetMedArbeidsgiver(
      oppfolgingsplaner,
      arbeidsgiver.virksomhetsnummer
    )
  ) {
    const oppfolgingsdialog =
      hentAktivOppfolgingsdialogOpprettetMedArbeidsgiver(
        oppfolgingsplaner,
        arbeidsgiver.virksomhetsnummer
      );
    return (
      <div>
        <span>{texts.velgArbeidsgiverUndertekst.alreadyCreatedPlan}</span>
        <div>
          <Link
            className="lenke"
            href={`${getContextRoot()}/oppfolgingsplaner/${
              oppfolgingsdialog.id
            }`}
          >
            Gå til planen
          </Link>
        </div>
      </div>
    );
  } else if (!arbeidsgiver.harNaermesteLeder) {
    return (
      <div>
        <Image src={VarseltrekantImage} alt="" />
        <span>{texts.velgArbeidsgiverUndertekst.noLeader}</span>
      </div>
    );
  } else if (arbeidsgiver.naermesteLeder) {
    return (
      <div>
        <span>
          {`${texts.velgArbeidsgiverUndertekst.leader}${arbeidsgiver.naermesteLeder}`}
        </span>
      </div>
    );
  }
  return null;
};

// export const VelgArbeidsgiverRadioKnapper = ({ input, meta, oppfolgingsdialoger, arbeidsgivere }) => {
//   return (
//     <Radioknapper input={input} meta={meta} visUndertekst>
//       {arbeidsgivere.map((arbeidsgiver, index) => {
//         return (
//           <i
//             key={index}
//             value={arbeidsgiver.virksomhetsnummer}
//             label={arbeidsgiver.navn}
//             disabled={!erOppfolgingsdialogOpprettbarMedArbeidsgiver(oppfolgingsdialoger, arbeidsgiver)}
//           >
//             <VelgArbeidsgiverUndertekst oppfolgingsdialoger={oppfolgingsdialoger} arbeidsgiver={arbeidsgiver} />
//           </i>
//         );
//       })}
//     </Radioknapper>
//   );
// };

interface ArbeidsgiverSkjemaProps {
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  oppfolgingsplaner: Oppfolgingsplan[];

  handleSubmit(values: any): void;
}

export const ArbeidsgiverSkjema = ({
  arbeidsgivere,
  oppfolgingsplaner,
  handleSubmit,
}: ArbeidsgiverSkjemaProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>{texts.arbeidsgiverSkjema.question}</label>
      <div className="inputgruppe velgarbeidsgiver__inputgruppe">
        {/*<Field*/}
        {/*  name="arbeidsgiver"*/}
        {/*  component={VelgArbeidsgiverRadioKnapper}*/}
        {/*  oppfolgingsdialoger={oppfolgingsplaner}*/}
        {/*  arbeidsgivere={arbeidsgivere}*/}
        {/*/>*/}
      </div>
      <div>
        <div>
          <Button
            variant={"primary"}
            disabled={
              !erOppfolgingsdialogOpprettbarMedMinstEnArbeidsgiver(
                oppfolgingsplaner,
                arbeidsgivere
              )
            }
          >
            {texts.arbeidsgiverSkjema.buttonSubmit}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ArbeidsgiverSkjema;
