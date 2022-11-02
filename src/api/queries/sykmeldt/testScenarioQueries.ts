import { useApiBasePath } from "../../../hooks/routeHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../../axios/axios";
import { ApiErrorException } from "../../axios/errors";
import { TestScenario } from "../../../server/data/mock/activeTestScenario";

export const ACTIVE_TEST_SCENARIO = "active-test-scenario";

export const useSetActiveTestScenario = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const setActiveTestScenario = (mockSetup: TestScenario) =>
    post(`${apiBasePath}/scenario/activescenario`, mockSetup);

  return useMutation(setActiveTestScenario, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useActiveTestScenario = () => {
  const apiBasePath = useApiBasePath();

  const fetchActiveTestScenario = () =>
    get<TestScenario>(`${apiBasePath}/scenario/activescenario`);

  return useQuery<TestScenario, ApiErrorException>(
    [ACTIVE_TEST_SCENARIO],
    fetchActiveTestScenario
  );
};
