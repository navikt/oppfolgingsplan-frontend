import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { post } from "../../../utils/fetch";
import { OpprettFeedbackData } from "../../../pages/api/flexjar";

export function useOpprettFlexjarFeedback(): UseMutationResult<
  OpprettFeedbackResponse,
  unknown,
  OpprettFeedbackData
> {
  const mutationFn = async (
    data: OpprettFeedbackData,
  ): Promise<OpprettFeedbackResponse> => {
    return post<OpprettFeedbackResponse>(
      `/syk/oppfolgingsplaner/api/flexjar`,
      data,
    );
  };

  return useMutation<OpprettFeedbackResponse, unknown, OpprettFeedbackData>({
    mutationFn,
  });
}

interface OpprettFeedbackResponse {
  id: string;
}
