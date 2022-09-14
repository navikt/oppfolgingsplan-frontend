import { UnleashFeature } from "../types/features/types";

const unleashFeaturesMock: UnleashFeature[] = [
  {
    name: "dialogmote.svar.ab.test",
    type: "release",
    enabled: true,
    stale: false,
    strategies: [
      {
        name: "gradualRolloutUserId",
        parameters: {
          percentage: "50",
          groupId: "dialogmote.svar.ab.test",
        },
        constraints: [],
      },
    ],
    variants: [],
  },
];

export default unleashFeaturesMock;
