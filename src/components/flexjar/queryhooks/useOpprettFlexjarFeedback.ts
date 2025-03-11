import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { post } from "../../../utils/fetch";
import { FormValues } from "../flexjar";

export function useOpprettFlexjarFeedback(): UseMutationResult<
  OpprettFeedbackResponse,
  unknown,
  FormValues
> {
  const mutationFn = async (
    data: FormValues,
  ): Promise<OpprettFeedbackResponse> => {
    return post<OpprettFeedbackResponse>(
      `/syk/meroppfolging/api/flexjar`,
      data,
    );
  };

  return useMutation<OpprettFeedbackResponse, unknown, FormValues>({
    mutationFn,
  });
}

interface OpprettFeedbackResponse {
  id: string;
}
