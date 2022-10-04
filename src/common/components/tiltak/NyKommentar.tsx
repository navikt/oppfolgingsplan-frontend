import { LightGreyPanel } from "@/common/components/wrappers/LightGreyPanel";
import { ReactElement, useState } from "react";
import { BodyLong, Button, Textarea } from "@navikt/ds-react";
import { ButtonRow } from "@/common/components/wrappers/ButtonRow";
import styled from "styled-components";

const SpacedTextarea = styled(Textarea)`
  padding-bottom: 2rem;
`;

interface Props {
  lagre(kommentar: string): void;
  avbryt(): void;
}

export const NyKommentar = ({ lagre, avbryt }: Props): ReactElement | null => {
  const [kommentar, setKommentar] = useState("");

  return (
    <LightGreyPanel border={true}>
      <BodyLong spacing>
        Kommentarer er laget for å hjelpe deg og arbeidsgiveren din med å
        utarbeide en god plan sammen. Kommentarene vil derfor ikke vises i den
        ferdige oppfølgingsplanen dere kan dele med fastlegen eller NAV.
      </BodyLong>

      <SpacedTextarea
        value={kommentar}
        onChange={(e) => setKommentar(e.target.value)}
        maxLength={1000}
        label={"Kommenter (obligatorisk)"}
        description={
          "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
        }
      />

      <ButtonRow>
        <Button variant={"primary"} onClick={() => lagre(kommentar)}>
          Lagre
        </Button>
        <Button variant={"tertiary"} onClick={avbryt}>
          Avbryt
        </Button>
      </ButtonRow>
    </LightGreyPanel>
  );
};
