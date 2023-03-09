import { ReactElement } from "react";
import { BodyLong, Button, Textarea } from "@navikt/ds-react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LightGreyPanel } from "../blocks/wrappers/LightGreyPanel";
import { Row } from "../blocks/wrappers/Row";
import { useAudience } from "../../hooks/routeHooks";

const SpacedTextarea = styled(Textarea)`
  padding-bottom: 2rem;
`;

interface Props {
  lagre(kommentar: string): void;
  avbryt(): void;
  isLoading: boolean;
}

type KommentarFormValues = {
  kommentar: string;
};

export const NyKommentar = ({
  lagre,
  avbryt,
  isLoading,
}: Props): ReactElement | null => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<KommentarFormValues>();
  const { isAudienceSykmeldt } = useAudience();

  const kommentar = watch("kommentar");

  return (
    <form onSubmit={handleSubmit(() => lagre(kommentar))}>
      <LightGreyPanel border={true}>
        <BodyLong spacing>
          {`Kommentarer er laget for å hjelpe deg og ${
            isAudienceSykmeldt ? "arbeidsgiveren" : "arbeidstakeren"
          } din med å
          utarbeide en god plan sammen. Kommentarene vil derfor ikke vises i den
          ferdige oppfølgingsplanen dere kan dele med fastlegen eller NAV.`}
        </BodyLong>

        <SpacedTextarea
          maxLength={1000}
          error={errors.kommentar?.message}
          label={"Kommenter (obligatorisk)"}
          description={
            "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
          }
          {...register("kommentar", {
            required: "Du må legge inn en kommentar",
            maxLength: 1000,
          })}
          value={kommentar}
        />

        <Row>
          <Button variant={"primary"} type={"submit"} loading={isLoading}>
            Lagre
          </Button>
          <Button variant={"tertiary"} onClick={avbryt}>
            Avbryt
          </Button>
        </Row>
      </LightGreyPanel>
    </form>
  );
};
