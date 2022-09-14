const MILLISEKUNDER_PER_DAG = 86400000;

function leggTilDagerPaDato(dato, dager) {
  const nyDato = new Date(dato);
  nyDato.setTime(nyDato.getTime() + dager * MILLISEKUNDER_PER_DAG);
  return new Date(nyDato);
}

module.exports = {
  leggTilDagerPaDato,
};
