import { usePdfApiUrl } from "../../hooks/routeHooks";
import { FilePdfIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";

interface Props {
  oppfolgingsplanId: number;
}

export const AapnePlanSomPDF = ({ oppfolgingsplanId }: Props) => {
  const pdfUrl = usePdfApiUrl(oppfolgingsplanId);

  return (
    <Button
      onClick={() => window.open(pdfUrl, "_blank", "noopener,noreferrer")}
      icon={<FilePdfIcon aria-hidden />}
      variant="tertiary"
    >
      Åpne som pdf
    </Button>
  );
};
