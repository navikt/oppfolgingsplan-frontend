import { capitalizeFirstLetter } from "utils/stringUtils";
import { BodyShort, Heading } from "@navikt/ds-react";
import { ContentWrapper } from "./ContentWrapper";
import { texts } from "./texts";
import { TextWithLabel } from "./TextWithLabel";
import { Person, Stilling } from "../../types/oppfolgingsplan";

interface Props {
  arbeidstaker?: Person;
}

export const ArbeidstakerInfo = ({ arbeidstaker }: Props) => {
  if (!arbeidstaker) {
    return null;
  }

  return (
    <ContentWrapper>
      <Heading level="3" size="medium" spacing={true}>
        {texts.sykmeldtInfo.title}
      </Heading>
      <div>
        <TextWithLabel
          text={arbeidstaker.navn}
          label={texts.sykmeldtInfo.labels.name}
        />
        <TextWithLabel
          text={arbeidstaker?.fnr}
          label={texts.sykmeldtInfo.labels.fnr}
        />
        <TextWithLabel
          text={arbeidstaker?.tlf}
          label={texts.sykmeldtInfo.labels.telephone}
        />
        <TextWithLabel
          text={arbeidstaker?.epost}
          label={texts.sykmeldtInfo.labels.email}
        />

        {arbeidstaker?.stillinger && arbeidstaker.stillinger?.length > 0 && (
          <div>
            {arbeidstaker.stillinger.map((stilling: Stilling, idx: number) => {
              if (stilling.yrke && stilling.prosent && stilling.prosent > -1) {
                return (
                  <BodyShort key={`arbeidstaker-informasjon-${idx}`}>
                    {`${capitalizeFirstLetter(stilling.yrke.toLowerCase())}: ${
                      stilling.prosent
                    }%`}
                  </BodyShort>
                );
              }
            })}
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};
