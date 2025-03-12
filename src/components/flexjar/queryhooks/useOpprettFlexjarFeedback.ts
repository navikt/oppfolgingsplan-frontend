import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { post } from "../../../utils/fetch";
import { FlexjarFormValues } from "../FlexJarModal";

export function useOpprettFlexjarFeedback(): UseMutationResult<
  OpprettFeedbackResponse,
  unknown,
  FlexjarFormValues
> {
  const mutationFn = async (
    data: FlexjarFormValues,
  ): Promise<OpprettFeedbackResponse> => {
    return post<OpprettFeedbackResponse>(
      `/syk/oppfolgingsplaner/api/flexjar`,
      data,
    );
  };

  return useMutation<OpprettFeedbackResponse, unknown, FlexjarFormValues>({
    mutationFn,
  });
}

interface OpprettFeedbackResponse {
  id: string;
}
