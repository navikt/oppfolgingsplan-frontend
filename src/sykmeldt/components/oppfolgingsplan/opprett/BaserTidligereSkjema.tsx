import React from 'react';
import {Button} from "@navikt/ds-react";

const texts = {
  question: 'Ønsker du å basere den nye planen på den som gjaldt sist?',
  answer: {
    yes: 'Ja, ta utgangspunkt i den tidligere planen',
    no: 'Nei, start en ny plan der vi ikke har fylt ut noe',
  },
  buttonSubmit: 'Start',
};

interface Props {
    onSubmit(values: any): void
}

export const BaserTidligereSkjema = ({ onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <label>{texts.question}</label>
      {/*<Field name="baserPaaTidligerePlan" component={Radioknapper}>*/}
      {/*  <input value label={texts.answer.yes} aria-labelledby="baserPaaTidligerePlan-overskrift" />*/}
      {/*  <input value={false} label={texts.answer.no} aria-labelledby="baserPaaTidligerePlan-overskrift" />*/}
      {/*</Field>*/}
      <div className="knapperad">
        <Button variant={"primary"}>{texts.buttonSubmit}</Button>
      </div>
    </form>
  );
};

export default BaserTidligereSkjema;
