import type { FlexJarTransport } from "@navikt/flexjar-widget";
import { post } from "../../utils/fetch";

export const flexjarTransport: FlexJarTransport = {
  async submit(submission) {
    const result = await post<OpprettFeedbackResponse>(
      "/syk/oppfolgingsplaner/api/flexjar",
      submission.transportPayload,
    );

    if (!result?.id) {
      throw new Error("Failed to send feedback. Try again.");
    }
  },
};

interface OpprettFeedbackResponse {
  id: string;
}
