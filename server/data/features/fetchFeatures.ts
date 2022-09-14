import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { get } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import unleashFeaturesMock from "../mock/unleashFeaturesMock";
import {
  ActiveFeatures,
  FeaturesNextApiResponse,
  UnleashFeature,
  UnleashFeatures,
} from "../types/features/types";

const reduceFeatures = (features: UnleashFeature[]): ActiveFeatures =>
  features.reduce((features: ActiveFeatures, feature) => {
    if (feature.enabled) {
      features[feature.name] = true;
    }
    return features;
  }, {});

export const fetchFeatures = async (
  req: IAuthenticatedRequest,
  res: FeaturesNextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    res.features = reduceFeatures(unleashFeaturesMock);
  } else {
    const response = await get<UnleashFeatures>(serverEnv.UNLEASH_API_URL);
    res.features = reduceFeatures(response.features);
  }

  next();
};
