import { NextApiResponse } from "next";

interface Strategy {
  name: string;
  parameters: any;
  constraints: [];
}

export interface UnleashFeature {
  name: string;
  type: string;
  description?: string;
  enabled: boolean;
  stale: boolean;
  strategies: Strategy[];
  variants: [];
}

export interface UnleashFeatures {
  features: UnleashFeature[];
}

export type ActiveFeatures = Record<string, boolean>;

export interface FeaturesNextApiResponse extends NextApiResponse {
  features: ActiveFeatures;
}
