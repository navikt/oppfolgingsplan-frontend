import { useAvbrytOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Edit } from "@navikt/ds-icons";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLandingUrl } from "../../../hooks/routeHooks";

interface Props {
  oppfolgingsplanId: number;
}

export const AvbrytPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const [visBekreftelse, setVisBekreftelse] = useState(false);
  const avbrytDialog = useAvbrytOppfolgingsplanSM();
  const router = useRouter();
  const landingUrl = useLandingUrl();

  return (
    <>
      <Button
        onClick={() => setVisBekreftelse(true)}
        icon={<Edit aria-hidden />}
        variant="tertiary"
      >
        Gjør endringer
      </Button>
      <Modal
        open={visBekreftelse}
        aria-label="Er du sikker?"
        onClose={() => setVisBekreftelse(false)}
      >
        <Modal.Content>
          <Heading size={"medium"} level={"3"} spacing>
            Ønsker du å endre planen?
          </Heading>
          <BodyLong spacing>
            Hvis du endrer planen, må du sende den til godkjenning hos den
            andre. Etter godkjenning blir den en gjeldende plan.
          </BodyLong>
          <Button
            variant={"danger"}
            loading={avbrytDialog.isLoading}
            onClick={() => {
              avbrytDialog.mutateAsync(oppfolgingsplanId).then(() => {
                router.push(landingUrl);
              });
            }}
          >
            Gjør endringer
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};
