import { Person, Stilling } from "../../../schema/oppfolgingsplanSchema";
import { capitalizeFirstLetter } from "@/common/utils/stringUtils";
import { BodyShort, Heading } from "@navikt/ds-react";
import { ContentWrapper } from "@/common/components/oversikt/ContentWrapper";
import { texts } from "@/common/components/oversikt/texts";
import { TextWithLabel } from "@/common/components/oversikt/TextWithLabel";

interface Props {
  arbeidstaker?: Person;
}

export const ArbeidstakerInfo = ({ arbeidstaker }: Props) => {
  if (!arbeidstaker) {
    return null;
  }

  const getArbeidstakerInfoIfNotNull = (
    atInfo: string | undefined | null,
    label: string
  ) => {
    if (atInfo) {
      return <BodyShort>{`${label} ${atInfo}`}</BodyShort>;
    }
    return null;
  };

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
