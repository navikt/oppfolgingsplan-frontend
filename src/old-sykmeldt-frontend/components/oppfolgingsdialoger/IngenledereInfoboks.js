import React from 'react';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { OppfolgingsdialogIngenlederImage } from '@/common/images/imageComponents';

const texts = {
  title: 'Du kan ikke lage en oppfølgingsplan akkurat nå',
  info: `
        For å bruke denne tjenesten må vi vite hvem lederen din er slik at informasjonen kommer til rett person.
        Ta kontakt med lederen din og be om at riktig leder blir registrert i Altinn.
    `,
};

const IngenledereInfoboks = () => {
  return (
    <OppfolgingsplanInfoboks
      svgUrl={OppfolgingsdialogIngenlederImage}
      svgAlt=""
      tittel={texts.title}
      tekst={texts.info}
    />
  );
};

export default IngenledereInfoboks;
