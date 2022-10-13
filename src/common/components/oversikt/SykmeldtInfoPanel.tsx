import { Person, Stilling } from "../../../schema/oppfolgingsplanSchema";
import { capitalizeFirstLetter } from "@/common/utils/stringUtils";
import { BodyShort, Heading, Label } from "@navikt/ds-react";
import { PanelWrapper } from "@/common/components/oversikt/PanelWrapper";
import { addSpaceAfterEverySixthCharacter } from "@/common/utils/stringUtils";
import { texts } from "@/common/components/oversikt/texts";

interface Props {
  arbeidstaker?: Person;
}

export const SykmeldtInfoPanel = ({ arbeidstaker }: Props) => {
  if (!arbeidstaker) {
    return null;
  }

  return (
    <PanelWrapper>
      <Heading level="3" size="medium" spacing={true}>
        {texts.sykmeldtInfoPanel.title}
      </Heading>

      <div>
        <BodyShort>{`${texts.sykmeldtInfoPanel.labels.name} ${
          arbeidstaker?.navn ?? ""
        }`}</BodyShort>
        <BodyShort>{`${
          texts.sykmeldtInfoPanel.labels.fnr
        } ${addSpaceAfterEverySixthCharacter(
          arbeidstaker?.fnr ?? ""
        )}`}</BodyShort>

        {arbeidstaker.tlf && (
          <BodyShort>{`${texts.sykmeldtInfoPanel.labels.telephone} ${arbeidstaker.tlf}`}</BodyShort>
        )}

        {arbeidstaker.epost && (
          <BodyShort>{`${texts.sykmeldtInfoPanel.labels.email} ${arbeidstaker.epost}`}</BodyShort>
        )}

        {arbeidstaker?.stillinger && arbeidstaker.stillinger?.length > 0 && (
          <div>
            {arbeidstaker.stillinger.map(
              (stilling: Stilling, idx: number) =>
                stilling.yrke &&
                stilling.prosent &&
                stilling.prosent > -1 && (
                  <BodyShort key={`arbeidstaker-informasjon-${idx}`}>
                    {`${capitalizeFirstLetter(stilling.yrke.toLowerCase())}: ${
                      stilling.prosent
                    }%`}
                  </BodyShort>
                )
            )}
          </div>
        )}
      </div>
    </PanelWrapper>
  );
};
