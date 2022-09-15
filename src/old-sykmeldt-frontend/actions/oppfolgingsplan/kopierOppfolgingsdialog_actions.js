export const KOPIER_OPPFOLGINGSDIALOG_FORESPURT = 'KOPIER_OPPFOLGINGSDIALOG_FORESPURT';
export const KOPIERER_OPPFOLGINGSDIALOG = 'KOPIERER_OPPFOLGINGSDIALOG';
export const OPPFOLGINGSDIALOG_KOPIERT = 'OPPFOLGINGSDIALOG_KOPIERT';
export const KOPIER_OPPFOLGINGSDIALOG_FEILET = 'KOPIER_OPPFOLGINGSDIALOG_FEILET';

export const kopierOppfolgingsdialog = (id) => {
  return {
    type: KOPIER_OPPFOLGINGSDIALOG_FORESPURT,
    id,
  };
};

export const kopiererOppfolgingsdialog = () => {
  return {
    type: KOPIERER_OPPFOLGINGSDIALOG,
  };
};

export const oppfolgingsdialogKopiert = (id) => {
  return {
    type: OPPFOLGINGSDIALOG_KOPIERT,
    id,
  };
};

export const kopierOppfolgingsdialogFeilet = () => {
  return {
    type: KOPIER_OPPFOLGINGSDIALOG_FEILET,
  };
};
