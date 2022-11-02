import { NextApiRequest, NextApiResponse } from "next";
import {
  activeTestScenario,
  setActiveTestScenario,
  TestScenario,
} from "../../../../server/data/mock/activeTestScenario";
import { displayTestScenarioSelector } from "../../../../environments/publicEnv";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!displayTestScenarioSelector) {
    return res.status(204).end();
  }

  if (req.method === "POST") {
    const newScenario: TestScenario = req.body;
    setActiveTestScenario(newScenario);

    res.status(200).end();
  } else {
    res.status(200).json(activeTestScenario);
  }
}
