import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { kommentarPt, kommentarReducerPt } from '../../../../propTypes/opproptypes';
import { toDateMedMaanedNavn } from '@/common/utils/datoUtils';
import TiltakVarselFeil from '../TiltakVarselFeil';

const texts = {
  buttonDelete: 'Slett',
  saveError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

export const hentAktoerNavnInitialer = (aktoerNavn) => {
  let initialer = '';
  if (aktoerNavn.length === 0) {
    return initialer;
  }
  const navneListe = aktoerNavn.split(' ');
  if (navneListe.length > 2) {
    initialer = navneListe[0].slice(0, 1) + navneListe[navneListe.length - 1].slice(0, 1);
  } else {
    navneListe.forEach((navn) => {
      initialer = initialer.concat(navn.slice(0, 1));
    });
  }
  return initialer;
};

const Snakkeboble = ({ initialer, topp, children, hoyre }) => {
  const classNames = cn('snakkeboble', {
    'snakkeboble--venstre': !hoyre,
    'snakkeboble--hoyre': hoyre,
  });
  return (
    <div className={classNames}>
      <i className="snakkeboble__ikon snakkeboble__ikon--initialer">{initialer}</i>
      <div className="snakkeboble__snakkeboble-pil-container">
        <i className="snakkeboble__snakkebole-pil snakkeboble__snakkebole-pil--graa" />
      </div>
      <div className="panel snakkeboble-panel snakkeboble-panel--graa">
        <p className="typo-undertekst snakkeboble-panel__topp">{topp}</p>
        <div className="snakkeboble-panel__tekst">{children}</div>
      </div>
    </div>
  );
};

Snakkeboble.propTypes = {
  initialer: PropTypes.string,
  topp: PropTypes.string,
  children: PropTypes.node,
  hoyre: PropTypes.bool,
};

export class KommentarListeElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visSlettingKommentarFeilet: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.kommentar.id === nextProps.kommentarReducer.feiletKommentarId &&
      nextProps.elementId === nextProps.kommentarReducer.feiletTiltakId &&
      nextProps.kommentarReducer.slettingFeilet &&
      nextProps.kommentarReducer.slettingFeilet !== this.props.kommentarReducer.slettingFeilet
    ) {
      this.props.visFeilMelding(true);
      this.setState({
        visSlettingKommentarFeilet: true,
      });
    }
  }

  render() {
    const { elementId, kommentar, fnr, sendSlett, feilMelding } = this.props;
    const aktoerHarOpprettetElement = fnr === (kommentar.opprettetAv && kommentar.opprettetAv.fnr);
    return (
      <Snakkeboble
        hoyre={aktoerHarOpprettetElement}
        initialer={hentAktoerNavnInitialer(kommentar.opprettetAv.navn)}
        topp={toDateMedMaanedNavn(kommentar.opprettetTidspunkt)}
      >
        <div className={aktoerHarOpprettetElement ? 'blokk--s' : null}>{kommentar.tekst}</div>
        {aktoerHarOpprettetElement && (
          <button
            className="lenke"
            onClick={() => {
              sendSlett(elementId, kommentar.id);
            }}
          >
            {texts.buttonDelete}
          </button>
        )}
        {this.state.visSlettingKommentarFeilet && feilMelding && <TiltakVarselFeil tekst={texts.saveError} />}
      </Snakkeboble>
    );
  }
}

KommentarListeElement.propTypes = {
  elementId: PropTypes.number,
  kommentar: kommentarPt,
  fnr: PropTypes.string,
  sendSlett: PropTypes.func,
  kommentarReducer: kommentarReducerPt,
  visFeilMelding: PropTypes.func,
  feilMelding: PropTypes.bool,
};

const KommentarListe = ({ elementId, kommentarer, fnr, sendSlett, kommentarReducer, feilMelding, visFeilMelding }) => {
  return (
    <div className="kommentarListe">
      {kommentarer.map((kommentar, index) => {
        return (
          <KommentarListeElement
            key={`${elementId}_${index}`}
            elementId={elementId}
            kommentar={kommentar}
            fnr={fnr}
            sendSlett={sendSlett}
            feilMelding={feilMelding}
            kommentarReducer={kommentarReducer}
            visFeilMelding={visFeilMelding}
          />
        );
      })}
    </div>
  );
};
KommentarListe.propTypes = {
  elementId: PropTypes.number,
  kommentarer: PropTypes.arrayOf(kommentarPt),
  fnr: PropTypes.string,
  sendSlett: PropTypes.func,
  kommentarReducer: kommentarReducerPt,
  feilMelding: PropTypes.bool,
  visFeilMelding: PropTypes.func,
};

export default KommentarListe;
