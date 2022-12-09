import { useApiBasePath } from "hooks/routeHooks";
import { FileContent } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";

interface Props {
  oppfolgingsplanId: number;
}

export const AapnePlanSomPDF = ({ oppfolgingsplanId }: Props) => {
  const apiBasePath = useApiBasePath();
  const downloadPdfUrl = `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/pdf`;

  return (
    <Button
      onClick={() =>
        window.open(downloadPdfUrl, "_blank", "noopener,noreferrer")
      }
      icon={<FileContent aria-hidden />}
      variant="tertiary"
    >
      Åpne som pdf
    </Button>
  );
};
