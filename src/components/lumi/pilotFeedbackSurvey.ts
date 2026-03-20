import { type LumiSurveyConfig } from "@navikt/lumi-survey";

export const PILOT_FEEDBACK_SURVEY: LumiSurveyConfig = {
  type: "custom",
  questions: [
    {
      id: "why-old-version",
      type: "text",
      prompt:
        "Hvorfor valgte du å bruke den eldre versjonen av oppfølgingsplanen?",
      description:
        "Hei, du har tilgang til å teste ut en ny versjon av oppfølgingsplanen, " +
        "men bruker nå en eldre versjon. For at den nye oppfølgingsplanen skal bli " +
        "så god som mulig, trenger vi din tilbakemelding for å lære mer om dine behov.",
      required: true,
      maxLength: 1000,
    },
  ],
};
