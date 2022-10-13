import { Arbeidsoppgave } from "../../../../schema/oppfolgingsplanSchema";
import {
  HakeGronnImage,
  KryssRoedImage,
  PlussOransje,
  VarseltrekantImage,
} from "@/common/images/imageComponents";
import { KanGjennomforesType } from "./ArbeidsoppgaverPanel";
import { Heading, Detail, Label, BodyLong } from "@navikt/ds-react";
import { texts } from "@/common/components/oversikt/texts";
import { Card } from "@/common/components/card/Card";

interface Props {
  arbeidsoppgaver: Arbeidsoppgave[];
  type: KanGjennomforesType;
  title: string;
}

export const ArbeidsoppgaveCards = ({
  arbeidsoppgaver,
  type,
  title,
}: Props) => {
  if (!arbeidsoppgaver.length) {
    return null;
  }

  const getIcon = (type: KanGjennomforesType) => {
    switch (type) {
      case "KAN":
        return HakeGronnImage;
      case "TILRETTELEGGING":
        return PlussOransje;
      case "KAN_IKKE":
        return KryssRoedImage;
      case "IKKE_VURDERT":
        return VarseltrekantImage;
      default:
        return null;
    }
  };

  return (
    <div>
      {arbeidsoppgaver.map((arbeidsoppgave: Arbeidsoppgave, idx: number) => (
        <Card
          title={title}
          img={getIcon(type)}
          key={`arbeidsoppgaver-list-${type}-${idx}`}
        >
          <Heading level="4" size="medium" spacing={true}>
            {arbeidsoppgave.arbeidsoppgavenavn}
          </Heading>
          {type === "TILRETTELEGGING" && (
            <div>
              {(arbeidsoppgave?.gjennomfoering?.paaAnnetSted ||
                arbeidsoppgave?.gjennomfoering?.medMerTid) && (
                <div>
                  <Label>{texts.arbeidsoppgaverPanel.labels.hvaSkalTil}</Label>
                  <ul>
                    {arbeidsoppgave?.gjennomfoering?.paaAnnetSted && (
                      <li>{texts.arbeidsoppgaverPanel.labels.sted}</li>
                    )}
                    {arbeidsoppgave?.gjennomfoering?.medMerTid && (
                      <li>{texts.arbeidsoppgaverPanel.labels.tid}</li>
                    )}
                    {arbeidsoppgave?.gjennomfoering?.medHjelp && (
                      <li>{texts.arbeidsoppgaverPanel.labels.hjelp}</li>
                    )}
                  </ul>
                  {arbeidsoppgave?.gjennomfoering?.kanBeskrivelse && (
                    <div>
                      <Label>
                        {texts.arbeidsoppgaverPanel.labels.beskrivelse}
                      </Label>
                      <BodyLong spacing={true}>
                        {arbeidsoppgave?.gjennomfoering?.kanBeskrivelse}
                      </BodyLong>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {type === "KAN_IKKE" &&
            arbeidsoppgave?.gjennomfoering?.kanIkkeBeskrivelse && (
              <div>
                <Label>{texts.arbeidsoppgaverPanel.labels.hvaStarIVeien}</Label>
                <BodyLong spacing={true}>
                  {arbeidsoppgave?.gjennomfoering?.kanIkkeBeskrivelse}
                </BodyLong>
              </div>
            )}
          <Detail>{`${texts.arbeidsoppgaverPanel.labels.lagtTilAv} ${arbeidsoppgave.opprettetAv.navn}`}</Detail>
        </Card>
      ))}
    </div>
  );
};
