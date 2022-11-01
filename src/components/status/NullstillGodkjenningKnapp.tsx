import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useNullstillGodkjenningSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

interface Props {
  oppfolgingsplanId: number;
}

export const NullstillGodkjenningKnapp = ({ oppfolgingsplanId }: Props) => {
  const nullstillGodkjenning = useNullstillGodkjenningSM();

  return (
    <Button
      onClick={() => nullstillGodkjenning.mutate(oppfolgingsplanId)}
      icon={<Edit />}
      variant="tertiary"
    >
      Rediger planen
    </Button>
  );
};
