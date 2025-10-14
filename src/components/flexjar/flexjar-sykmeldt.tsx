"use client";

import { FlexJarDock, type FlexJarSurveyConfig } from "@navikt/flexjar-widget";
import { flexjarTransport } from "./flexjar-transport";

const survey: FlexJarSurveyConfig = {
  rating: {
    type: "rating",
    prompt: "Er oppfølgingsplanen til hjelp for deg?",
    description:
      "Svarene du sender inn er anonyme, og blir brukt til videreutvikling av oppfølgingsplanen.",
  },
  mainQuestion: {
    type: "text",
    maxLength: 500,
    minRows: 4,
    prompt:
      "Hvordan kan oppfølgingsplanen bli et bedre verktøy for deg? (Valgfritt)",
    required: false,
  },
};

export const FlexjarSykmeldt = () => (
  <FlexJarDock
    feedbackId="gammel-oppfolgingsplan-sykmeldt"
    survey={survey}
    transport={flexjarTransport}
    position="bottom-right"
  />
);
