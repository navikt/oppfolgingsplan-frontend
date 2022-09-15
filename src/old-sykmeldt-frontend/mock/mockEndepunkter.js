/* eslint-disable */
const path = require('path');
const fs = require('fs');
const express = require('express');

const mockOppfolgingsplan = require('./oppfolgingsplan/mockOppfolgingsplan');
const dateUtil = require('./util/dateUtil');

const mockData = {};
const ARBEIDSGIVERE = 'arbeidsgivere';
const METADATA = 'metadata';
const NAERMESTELEDERE = 'naermesteledere';
const SYKMELDINGER = 'sykmeldinger';
const VEDLIKEHOLD = 'vedlikehold';
const TILGANG = 'tilgang';
const ARBEIDSFORHOLD = 'arbeidsforhold';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERSON = 'person';
const VIRKSOMHET = 'virksomhet';

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) throw err;
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

lastFilTilMinne(ARBEIDSGIVERE);
lastFilTilMinne(METADATA);
lastFilTilMinne(NAERMESTELEDERE);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(VEDLIKEHOLD);
lastFilTilMinne(TILGANG);
lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(PERSON);
lastFilTilMinne(VIRKSOMHET);

const SYKMELDING_TYPE = {
  SYKMELDING_INAKTIV: {
    fomUke: -20,
    tomUke: -18,
  },
  SYKMELDING_AKTIV: {
    fomUke: -16,
    tomUke: 2,
  },
};

const getSykmeldinger = (type) => {
  const today = new Date();
  const sykmeldinger = mockData[SYKMELDINGER];
  const sykmelding = sykmeldinger[0];
  return [
    {
      ...sykmelding,
      sykmeldingsperioder: [
        ...sykmelding.sykmeldingsperioder,
        {
          ...sykmelding.sykmeldingsperioder[0],
          fom: dateUtil.leggTilDagerPaDato(today, type.fomUke * 7).toJSON(),
          tom: dateUtil.leggTilDagerPaDato(today, type.tomUke * 7).toJSON(),
        },
      ],
    },
  ];
};

function mockOpprettetIdResultat(res) {
  mockOpprettetIdResultat.rollingCounter += 1;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(mockOpprettetIdResultat.rollingCounter));
}

mockOpprettetIdResultat.rollingCounter = 100;

function mockForLokaltMiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/tiltak/actions/:response/lagreKommentar', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/kommentar/actions/:response/slett', (req, res) => {
    res.send();
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/arbeidsoppgave/actions/:id/slett', (req, res) => {
    res.send();
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/tiltak/actions/:id/slett', (req, res) => {
    res.send();
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/lagreArbeidsoppgave', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/lagreTiltak', (req, res) => {
    mockOpprettetIdResultat(res);
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/godkjenn', (req, res) => {
    res.send({
      fom: req.body.fom,
      tom: req.body.tom,
      evalueres: req.body.evalueres,
    });
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/samtykk', (req, res) => {
    res.send();
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/nullstillGodkjenning', (req, res) => {
    res.send();
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/avvis', (req, res) => {
    res.send();
  });
}

function mockForOpplaeringsmiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/arbeidstaker/sykmeldinger', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getSykmeldinger(SYKMELDING_TYPE.SYKMELDING_AKTIV)));
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/v2/narmesteledere/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[NAERMESTELEDERE]));
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/arbeidstaker/oppfolgingsplaner', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(mockOppfolgingsplan.getOppfolgingsplaner(mockOppfolgingsplan.TYPE_DEFAULT));
  });

  //TODO: Ser ut som om vi mangler mock for oppretting av OP: POST mot '/syk/oppfolgingsplan/api/oppfolgingsplanservice/arbeidstaker/oppfolgingsplaner'

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/tilgang', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[TILGANG]));
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/v2/virksomhet/:virksomhetsnummer', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[VIRKSOMHET]));
  });

  server.post('/syk/oppfolgingsplan/api/oppfolgingsplanservice/oppfolgingsplan/actions/:id/sett', (req, res) => {
    res.send();
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/v2/arbeidsforhold', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[ARBEIDSFORHOLD]));
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/v2/person/:fnr', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON]));
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/v2/kontaktinfo/:fnr', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[KONTAKTINFO]));
  });

  server.get('/syk/oppfolgingsplan/api/oppfolgingsplanservice/v2/narmesteleder/:fnr', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[NAERMESTELEDER]));
  });

  server.get('/esso/logout', (req, res) => {
    // noinspection HtmlUnknownTarget
    res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/syk/sykefravaer">Gå til Ditt sykefravær</a></p>');
  });

  server.get('/dittnav', (req, res) => {
    // noinspection HtmlUnknownTarget
    res.send(
      '<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/syk/sykefravaer">Gå til Ditt sykefravær</a></p>'
    );
  });
}

module.exports = {
  mockForLokaltMiljo,
  mockForOpplaeringsmiljo,
};
