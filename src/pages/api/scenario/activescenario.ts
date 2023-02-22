import { NextApiRequest, NextApiResponse } from "next";
import { displayTestScenarioSelector } from "environments/publicEnv";
import getMockDb, {
  assignNewDbSetup,
  TestScenario,
} from "server/data/mock/getMockDb";
import { getMockSetupForScenario } from "server/data/mock/activeMockData";
import { TEST_SESSION_ID } from "../../../api/axios/axios";
import { handleQueryParamError } from "../../../server/utils/errors";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!displayTestScenarioSelector) {
    return res.status(404).end();
  }

  if (req.method === "POST") {
    const sessionId = req.headers[TEST_SESSION_ID];

    if (typeof sessionId !== "string") {
      return handleQueryParamError(sessionId);
    }

    const newScenario: TestScenario = req.body;
    assignNewDbSetup(getMockSetupForScenario(newScenario), sessionId);

    res.status(200).end();
  } else {
    res.status(200).json(getMockDb(req).activeTestScenario);
  }
}
