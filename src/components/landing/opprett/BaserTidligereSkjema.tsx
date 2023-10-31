import React, { ReactElement, useState } from "react";
import { Button, Radio, RadioGroup } from "@navikt/ds-react";
import { Row } from "../../blocks/wrappers/Row";

const texts = {
  question: "Ønsker du å basere den nye planen på den som gjaldt sist?",
  answer: {
    yes: "Ja, ta utgangspunkt i den tidligere planen",
    no: "Nei, start en ny plan der vi ikke har fylt ut noe",
  },
  buttonSubmit: "Start",
};

interface Props {
  isLoading: boolean;

  onSubmit(value: boolean): void;

  handleClose(): void;
}

export const BaserTidligereSkjema = ({
  isLoading,
  onSubmit,
  handleClose,
}: Props): ReactElement => {
  const [baserTidligere, setBaserTidligere] = useState(false);

  return (
    <>
      <RadioGroup
        className="mb-4"
        legend={texts.question}
        hideLegend={true}
        onChange={(val: boolean) => setBaserTidligere(val)}
        value={baserTidligere}
      >
        <Radio value={true}>{texts.answer.yes}</Radio>
        <Radio value={false}>{texts.answer.no}</Radio>
      </RadioGroup>

      <Row>
        <Button
          variant={"primary"}
          type={"button"}
          loading={isLoading}
          onClick={() => onSubmit(baserTidligere ?? false)}
        >
          {texts.buttonSubmit}
        </Button>
        <Button variant={"tertiary"} onClick={handleClose}>
          Avbryt
        </Button>
      </Row>
    </>
  );
};

export default BaserTidligereSkjema;
