import { useMutation } from "@tanstack/react-query";
import { post } from "../../axios/axios";
import {
  type LumiSurveyTransport,
  type LumiSurveyTransportPayload,
} from "@navikt/lumi-survey";
import { useRouter } from "next/router";

export const useLumiTransport = (): LumiSurveyTransport => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (payload: LumiSurveyTransportPayload) =>
      post<void>(
        `${router.basePath}/api/lumi/feedback`,
        "postLumiFeedback",
        payload,
      ),
  });

  return {
    async submit(submission) {
      try {
        await mutateAsync(submission.transportPayload);
      } catch (e) {
        console.error("Lumi survey submission failed", e);
      }
    },
  };
};
