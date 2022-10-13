import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { SykmeldtInfoPanel } from "@/common/components/oversikt/SykmeldtInfoPanel";
import { ArbeidsgiverInfoPanel } from "./ArbeidsgiverInfoPanel";
import { ArbeidsoppgaverPanel } from "./arbeidsoppgaver/ArbeidsoppgaverPanel";

interface Props {
  oppfolgingsplan?: Oppfolgingsplan;
}

export const OppfolgingsplanOversikt = ({ oppfolgingsplan }: Props) => {
  if (!oppfolgingsplan) {
    return null;
  }

  return (
    <div>
      <h1>Oppfølgingsplan</h1>
      <p>{`Mellom ${oppfolgingsplan?.arbeidstaker.navn ?? ""} og ${
        oppfolgingsplan?.arbeidsgiver?.naermesteLeder?.navn ?? ""
      }`}</p>

      <SykmeldtInfoPanel arbeidstaker={oppfolgingsplan?.arbeidstaker} />
      <ArbeidsgiverInfoPanel
        narmesteLeder={oppfolgingsplan?.arbeidsgiver?.naermesteLeder}
        virksomhet={oppfolgingsplan?.virksomhet}
      />
      <ArbeidsoppgaverPanel oppfolgingsplan={oppfolgingsplan} />
    </div>
  );
};
