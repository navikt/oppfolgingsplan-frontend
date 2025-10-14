"use client";

import { FlexJarDock, type FlexJarSurveyConfig } from "@navikt/flexjar-widget";
import { flexjarTransport } from "./flexjar-transport";

const survey: FlexJarSurveyConfig = {
  rating: {
    type: "rating",
    prompt: "Hvordan var det å bruke oppfølgingsplanen?",
    description:
      "Svarene du sender inn er anonyme, og blir brukt til videreutvikling av oppfølgingsplanen.",
  },
  mainQuestion: {
    type: "singleChoice",
    prompt:
      "Opplever du at oppfølgingsplanen er et nyttig verktøy for å følge opp den ansatte?",
    options: [
      { value: "Ja", label: "Ja" },
      { value: "Nei", label: "Nei" },
      { value: "Vet ikke", label: "Vet ikke" },
    ],
  },
};

export const FlexjarArbeidsgiver = () => (
  <FlexJarDock
    feedbackId="gammel-oppfolgingsplan-arbeidsgiver"
    survey={survey}
    transport={flexjarTransport}
    position="bottom-right"
    showPersonalDataNotice={false}
  />
);
