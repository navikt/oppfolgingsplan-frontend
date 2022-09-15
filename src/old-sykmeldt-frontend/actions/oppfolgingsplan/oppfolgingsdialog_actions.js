export const HENT_OPPFOLGINGSDIALOGER_FEILET = 'HENT_OPPFOLGINGSDIALOGER_FEILET';
export const OPPFOLGINGSDIALOGER_HENTET = 'OPPFOLGINGSDIALOGER_HENTET';
export const HENTER_OPPFOLGINGSDIALOGER = 'HENTER_OPPFOLGINGSDIALOGER';
export const HENT_OPPFOLGINGSDIALOGER_FORESPURT = 'HENT_OPPFOLGINGSDIALOGER_FORESPURT';

export const OPPRETT_OPPFOLGINGSDIALOG_FORESPURT = 'OPPRETT_OPPFOLGINGSDIALOG_FORESPURT';
export const OPPRETTER_OPPFOLGINGSDIALOG = 'OPPRETTER_OPPFOLGINGSDIALOG';
export const OPPFOLGINGSDIALOG_OPPRETTET = 'OPPFOLGINGSDIALOG_OPPRETTET';
export const OPPRETT_OPPFOLGINGSDIALOG_FEILET = 'OPPRETT_OPPFOLGINGSDIALOG_FEILET';

export const GODKJENN_DIALOG_FORESPURT = 'GODKJENN_DIALOG_FORESPURT';
export const GODKJENNER_DIALOG = 'GODKJENNER_DIALOG';
export const DIALOG_GODKJENT = 'DIALOG_GODKJENT';
export const GODKJENN_DIALOG_FEILET = 'GODKJENN_DIALOG_FEILET';

export const AVVIS_DIALOG_FORESPURT = 'AVVIS_DIALOG_FORESPURT';
export const AVVISER_DIALOG = 'AVVISER_DIALOG';
export const DIALOG_AVVIST = 'DIALOG_AVVIST';
export const AVVIS_DIALOG_FEILET = 'AVVIS_DIALOG_FEILET';

export const henterOppfolgingsdialoger = () => {
  return {
    type: HENTER_OPPFOLGINGSDIALOGER,
  };
};

export const oppfolgingsdialogerHentet = (data = []) => {
  return {
    type: OPPFOLGINGSDIALOGER_HENTET,
    data,
  };
};

export const hentOppfolgingsdialogerFeilet = () => {
  return {
    type: HENT_OPPFOLGINGSDIALOGER_FEILET,
  };
};

export const hentOppfolgingsdialoger = () => {
  return {
    type: HENT_OPPFOLGINGSDIALOGER_FORESPURT,
  };
};

export const oppretterOppfolgingsdialog = () => {
  return {
    type: OPPRETTER_OPPFOLGINGSDIALOG,
  };
};

export const oppfolgingsdialogOpprettet = (data) => {
  return {
    type: OPPFOLGINGSDIALOG_OPPRETTET,
    data,
  };
};

export const opprettOppfolgingsdialogFeilet = () => {
  return {
    type: OPPRETT_OPPFOLGINGSDIALOG_FEILET,
  };
};

export const opprettOppfolgingsdialog = (virksomhetsnummer) => {
  return {
    type: OPPRETT_OPPFOLGINGSDIALOG_FORESPURT,
    virksomhetsnummer,
  };
};

export const godkjennDialog = (id, gyldighetstidspunkt, status, delMedNav) => {
  return {
    type: GODKJENN_DIALOG_FORESPURT,
    id,
    gyldighetstidspunkt,
    status,
    delMedNav,
  };
};

export const godkjennerDialog = () => {
  return {
    type: GODKJENNER_DIALOG,
  };
};

export const dialogGodkjent = (id, status, gyldighetstidspunkt, delMedNav) => {
  return {
    type: DIALOG_GODKJENT,
    id,
    gyldighetstidspunkt,
    status,
    delMedNav,
  };
};

export const godkjennDialogFeilet = () => {
  return {
    type: GODKJENN_DIALOG_FEILET,
  };
};

export const avvisDialog = (id) => {
  return {
    type: AVVIS_DIALOG_FORESPURT,
    id,
  };
};

export const avviserDialog = () => {
  return {
    type: AVVISER_DIALOG,
  };
};

export const dialogAvvist = (id) => {
  return {
    type: DIALOG_AVVIST,
    id,
  };
};

export const avvisDialogFeilet = () => {
  return {
    type: AVVIS_DIALOG_FEILET,
  };
};
