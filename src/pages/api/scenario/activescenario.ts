import { NextApiRequest, NextApiResponse } from "next";
import { displayTestScenarioSelector } from "environments/publicEnv";
import getMockDb, {
  assignNewDbSetup,
  TestScenario,
} from "server/data/mock/getMockDb";
import { getMockSetupForScenario } from "server/data/mock/activeMockData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!displayTestScenarioSelector) {
    return res.status(204).end();
  }

  if (req.method === "POST") {
    const newScenario: TestScenario = req.body;
    assignNewDbSetup(getMockSetupForScenario(newScenario));

    res.status(200).end();
  } else {
    res.status(200).json(getMockDb().activeTestScenario);
  }
}
