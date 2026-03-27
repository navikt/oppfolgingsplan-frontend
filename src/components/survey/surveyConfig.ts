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
} satisfies LumiSurveyConfig;

export const CREATE_OPPFOLGINGSPLAN_SM_INTRO = {
  title: "Du har nettopp startet på en oppfølgingsplan!",
  body: "For at oppfølgingsplanen skal bli et godt verktøy for deg som medarbeider, håper vi du tar deg tid til å svare på ett spørsmål.",
};
export const CREATE_OPPFOLGINGSPLAN_SM_SURVEY: LumiSurveyConfig = {
  type: "custom",
  questions: [
    {
      id: "reason",
      type: "singleChoice",
      prompt: "Hvorfor begynte du på oppfølgingsplanen nå?",
      options: [
        {
          value: "ta_initativ",
          label: "Jeg vil ta initiativ og kontroll over min situasjon",
        },
        {
          value: "leder_folger_ikke_opp",
          label: "Lederen min følger meg ikke opp",
        },
        { value: "leder_ba_meg", label: "Lederen min ba meg om det" },
        { value: "annet", label: "Annet" },
      ],
      required: true,
    },
    {
      id: "annet-fritekst",
      type: "text",
      prompt: "Kan du fortelle mer om hvorfor?",
      maxLength: 500,
      visibleIf: {
        field: "ANSWER",
        questionId: "reason",
        operator: "EQ",
        value: "annet",
      },
    },
  ],
} satisfies LumiSurveyConfig;
