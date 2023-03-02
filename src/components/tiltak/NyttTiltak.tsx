import { Button } from "@navikt/ds-react";
import { ReactNode } from "react";
import { useLagreTiltak } from "../../api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakFormHeading } from "./TiltakFormHeading";
import { SpacedPanel } from "../blocks/wrappers/SpacedPanel";
import PlusIcon from "../../components/blocks/icons/PlusIcon";
import { TILTAK_LEGG_TIL_NYTT_TILTAK_BUTTON } from "../../../cypress/dataTestId";

interface Props {
  children: ReactNode;
  formHeadingTitle: string;
  formHeadingBody: string;
  leggerTilNyttTiltak: boolean;
  setLeggerTilNyttTiltak: (value: boolean) => void;
}

export const NyttTiltak = ({
  children,
  formHeadingTitle,
  formHeadingBody,
  leggerTilNyttTiltak,
  setLeggerTilNyttTiltak,
}: Props) => {
  useLagreTiltak();

  if (!leggerTilNyttTiltak) {
    return (
      <SpacedPanel border={true}>
        <TiltakFormHeading title={formHeadingTitle} body={formHeadingBody} />

        {!leggerTilNyttTiltak && (
          <Button
            id="leggTilNyttTiltakButton"
            data-testid={TILTAK_LEGG_TIL_NYTT_TILTAK_BUTTON}
            variant={"secondary"}
            icon={<PlusIcon />}
            onClick={() => setLeggerTilNyttTiltak(true)}
          >
            Legg til et nytt tiltak
          </Button>
        )}
      </SpacedPanel>
    );
  }

  return (
    <SpacedPanel border={true}>
      <TiltakFormHeading title={formHeadingTitle} body={formHeadingBody} />

      {children}
    </SpacedPanel>
  );
};
