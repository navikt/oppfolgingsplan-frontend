import { useMutation } from "@tanstack/react-query";
import { post } from "../../axios/axios";
import { type LumiSurveyTransportPayload } from "@navikt/lumi-survey";
import { useRouter } from "next/router";

export const usePostLumiFeedback = () => {
  const router = useRouter();

  const postFeedback = async (payload: LumiSurveyTransportPayload) => {
    await post<void>(
      `${router.basePath}/api/lumi/feedback`,
      "postLumiFeedback",
      payload,
    );
  };

  return useMutation({
    mutationFn: postFeedback,
  });
};
