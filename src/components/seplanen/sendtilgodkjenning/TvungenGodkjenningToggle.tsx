import { Alert, BodyLong, Radio, RadioGroup } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";

const SpacedAlert = styled(Alert)`
  margin-bottom: 2rem;
`;

interface Props {
  tvungenGodkjenning: boolean | null;

  setTvungenGodkjenning(tvungenGodkjenning: boolean): void;
}

export const TvungenGodkjenningToggle = ({
  tvungenGodkjenning,
  setTvungenGodkjenning,
}: Props) => {
  return (
    <div>
      <RadioGroup
        legend={"Velg hva du vil gjøre:"}
        onChange={(val: boolean) => setTvungenGodkjenning(val)}
        value={tvungenGodkjenning}
      >
        <Radio value={false}>
          Send planen til arbeidstakeren for godkjenning
        </Radio>
        <Radio value={true}>
          Opprett planen uten godkjenning fra arbeidstakeren
        </Radio>
      </RadioGroup>

      {tvungenGodkjenning && (
        <SpacedAlert variant={"info"}>
          <BodyLong>
            Du kan bare velge dette hvis arbeidstakeren ikke kan eller ønsker å
            delta. Dette vil bli synlig i planen.
          </BodyLong>
        </SpacedAlert>
      )}

      {!tvungenGodkjenning && (
        <SpacedAlert variant={"info"}>
          <BodyLong>
            Arbeidstakeren kan deretter godkjenne eller gjøre endringer og sende
            planen tilbake deg.
          </BodyLong>
        </SpacedAlert>
      )}
    </div>
  );
};
