import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../axios/axios";
import { ApiErrorException } from "../axios/errors";
import { TestScenario } from "../../server/data/mock/getMockDb";
import { useRouter } from "next/router";
import { queryKeys } from "./queryKeys";

export const useSetActiveTestScenario = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const setActiveTestScenario = async (mockSetup: TestScenario) => {
    await post(
      `${router.basePath}/api/scenario/activescenario`,
      "setActiveTestScenario",
      mockSetup
    );
    await queryClient.invalidateQueries();
  };

  return useMutation(setActiveTestScenario);
};

export const useActiveTestScenario = () => {
  const router = useRouter();

  const fetchActiveTestScenario = () =>
    get<TestScenario>(
      `${router.basePath}/api/scenario/activescenario`,
      "fetchActiveTestScenario"
    );

  return useQuery<TestScenario, ApiErrorException>(
    [queryKeys.ACTIVE_TEST_SCENARIO],
    fetchActiveTestScenario
  );
};
