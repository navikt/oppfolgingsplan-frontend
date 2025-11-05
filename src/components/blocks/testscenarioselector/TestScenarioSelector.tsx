import { Button, Heading, Modal, Radio, RadioGroup } from "@navikt/ds-react";
import SunImage from "../../blocks/images/sun.svg";
import React, { useEffect, useState } from "react";
import { Row } from "../wrappers/Row";
import { SpacedDiv } from "../wrappers/SpacedDiv";
import { TestScenario } from "../../../server/data/mock/getMockDb";
import {
  useActiveTestScenario,
  useSetActiveTestScenario,
} from "../../../api/queries/testScenarioQueries";
import Image from "next/image";
import styles from "./testscenarioselector.module.css";

interface RadioProps {
  value: TestScenario;
  helpText: string;
  children: string;
}

const RadioWithHelpText = ({ value, helpText, children }: RadioProps) => {
  return (
    <div title={helpText}>
      <Radio value={value}>{children}</Radio>
    </div>
  );
};

export const TestScenarioSelector = () => {
  const activeTestScenario = useActiveTestScenario();
  const setActiveTestScenario = useSetActiveTestScenario();
  const [open, setOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<
    TestScenario | undefined
  >();

  useEffect(() => {
    if (activeTestScenario.isSuccess) {
      setSelectedScenario(activeTestScenario.data);
    }
  }, [activeTestScenario.data, activeTestScenario.isSuccess]);

  if (!selectedScenario) return null;

  return (
    <>
      <Modal
        open={open}
        aria-label="Testdatavelger"
        onClose={() => setOpen(false)}
      >
        <Modal.Header>
          <Heading spacing level="1" size="large">
            Velg testscenario
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <SpacedDiv>
            <RadioGroup
              legend="Velg testscenario"
              value={selectedScenario}
              hideLegend={true}
              onChange={(val: TestScenario) => {
                setSelectedScenario(val);
              }}
            >
              <RadioWithHelpText
                value={"INGENPLAN"}
                helpText={
                  "Jeg har ingen oppfølgingsplan, og ønsker å kunne opprette ny plan"
                }
              >
                Ingen oppfølgingsplan
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"TIDLIGEREPLANER"}
                helpText={
                  "Jeg har ingen aktiv oppfølgingsplan, men har tidligere planer"
                }
              >
                Tidligere planer
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"UNDERARBEID"}
                helpText={"Jeg har en plan under arbeid"}
              >
                Oppfølgingsplan under arbeid
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"GODKJENTPLAN"}
                helpText={"Jeg har en godkjent oppfølgingsplan"}
              >
                Godkjent Oppfølgingsplan
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"SYKMELDT_HAR_SENDT_TIL_GODKJENNING_AG_HAR_ENDRET"}
                helpText={
                  "Den sykmeldte har sendt oppfølgingsplanen til arbeidsgiver for godkjenning, og arbeidsgiver har gått inn for å gjøre endringer"
                }
              >
                Sykmeldt har sendt plan til godkjenning, arbeidsgiver har gjort
                endringer
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"SYKMELDT_HAR_SENDT_TIL_GODKJENNING"}
                helpText={
                  "Den sykmeldte har sendt oppfølgingsplanen til arbeidsgiver for godkjenning"
                }
              >
                Sykmeldt har sendt plan til godkjenning
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"ARBEIDSGIVER_HAR_SENDT_TIL_GODKJENNING"}
                helpText={
                  "Arbeidsgiver har sendt oppfølgingsplanen til den sykmeldte for godkjenning"
                }
              >
                Arbeidsgiver har sendt plan til godkjenning
              </RadioWithHelpText>

              <RadioWithHelpText
                value={"PILOTUSER"}
                helpText={"Er pilotbruker for ny oppfølgingsplan"}
              >
                Er pilotbruker for ny oppfølgingsplan
              </RadioWithHelpText>
            </RadioGroup>
          </SpacedDiv>

          <Row>
            <Button
              id="VelgScenarioButton"
              variant={"primary"}
              disabled={!setActiveTestScenario}
              onClick={() => {
                setActiveTestScenario.mutateAsync(selectedScenario);
                setOpen(false);
              }}
            >
              Velg scenario
            </Button>
            <Button variant={"tertiary"} onClick={() => setOpen(false)}>
              Avbryt
            </Button>
          </Row>
        </Modal.Body>
      </Modal>

      <div
        id="TestScenarioSelector"
        onClick={() => setOpen(!open)}
        className={styles.testscenariocontainer}
      >
        <Image src={SunImage} alt="" width={40} height={40} />
      </div>
    </>
  );
};
