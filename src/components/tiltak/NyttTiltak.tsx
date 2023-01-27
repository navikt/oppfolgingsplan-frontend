import { Button } from "@navikt/ds-react";
import { ReactNode, useState } from "react";
import { useLagreTiltak } from "api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakFormHeading } from "./TiltakFormHeading";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import PlusIcon from "components/blocks/icons/PlusIcon";

interface Props {
  children: ReactNode;
  formHeadingTitle: string;
  formHeadingBody: string;
}

export const NyttTiltak = ({
  children,
  formHeadingTitle,
  formHeadingBody,
}: Props) => {
  useLagreTiltak();
  const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false);

  if (!leggerTilNyttTiltak) {
    return (
      <SpacedPanel border={true}>
        <TiltakFormHeading title={formHeadingTitle} body={formHeadingBody} />

        {!leggerTilNyttTiltak && (
          <Button
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
