import { reducer as formReducer } from 'redux-form';
import arbeidsoppgaver from './arbeidsoppgaver';
import arbeidsforhold from './arbeidsforhold';
import avbrytdialogReducer from './avbrytdialog';
import delmednav from './delmednav';
import fastlegeDeling from './fastlegeDeling';
import kommentar from './kommentar';
import kontaktinfo from './kontaktinfo';
import kopierDialogReducer from './kopierOppfolgingsdialog';
import oppfolgingsdialoger from './oppfolgingsdialog';
import navigasjontoggles from './navigasjontoggles';
import naermesteleder from './naermesteleder';
import nullstill from './nullstillGodkjenning';
import person from './person';
import nyNaermesteLeder from './nyNaermesteLeder';
import tilgang from './tilgang';
import tiltak from './tiltak';
import virksomhet from './virksomhet';

import dineSykmeldinger from './dineSykmeldinger';
import ledere from './ledere';

const reducers = {
  arbeidsforhold,
  arbeidsoppgaver,
  avbrytdialogReducer,
  dineSykmeldinger,
  kommentar,
  kopierDialogReducer,
  navigasjontoggles,
  nullstill,
  nyNaermesteLeder,
  oppfolgingsdialoger,
  fastlegeDeling,
  delmednav,
  tilgang,
  tiltak,
  person,
  virksomhet,
  kontaktinfo,
  naermesteleder,
  form: formReducer,
  ledere,
};

export default reducers;
