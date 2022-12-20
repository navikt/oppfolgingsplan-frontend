import { cdnPublicPath } from "../environments/publicEnv";

export const getPublicAsset = (path: string) => {
  return `${cdnPublicPath}${path}`;
};
