import { Button, Accordion, Checkbox } from "@navikt/ds-react";
import { GodkjennPlanTidspunkt } from "./GodkjennPlanTidspunkt";
import {
  Avbruttplan,
  Oppfolgingsplan,
} from "../../../../schema/oppfolgingsplanSchema";
import styled from "styled-components";
import Link from "next/link";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { restdatoTildato } from "@/common/utils/dateUtils";
import { TidligereOppfolgingsplaner } from "./TidligereOppfolgingsplaner";
import { GodkjennOppfolgingsplan } from "./GodkjennOppfolgingsplan";
import { SePlan } from "./SePlan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

const Container = styled.div`
  margin: 0 0 3rem 0;
`;

export const OppfolgingsdialogerGodkjenn = ({ oppfolgingsplan }: Props) => {
  const landingPage = useLandingUrl();

  return (
    <Container>
      <p>
        Heidi Pettersen har sendt deg en ny oppfølgingsplan for godkjenning.
      </p>
      <GodkjennPlanTidspunkt
        avvisDialog={() => {}}
        oppfolgingsdialog={oppfolgingsplan}
      />
      <div>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <Button variant="tertiary">Gjør endringer</Button>
      </div>
      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />
      <GodkjennOppfolgingsplan />
      <div>
        <Link href={landingPage}>Tilbake til oppfølgingsplaner</Link>
      </div>
    </Container>
  );
};
