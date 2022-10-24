import { useApiBasePath } from "@/common/hooks/routeHooks";
import { FileContent } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import Link from "next/link";

interface Props {
  oppfolgingsplanId: number;
}

export const LastNed = ({ oppfolgingsplanId }: Props) => {
  const apiBasePath = useApiBasePath();
  return (
    <Link
      href={`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/pdf`}
      passHref={true}
    >
      <Button icon={<FileContent />} variant="tertiary">
        Last ned
      </Button>
    </Link>
  );
};
