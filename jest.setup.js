import "@testing-library/jest-dom/extend-expect";

jest.useFakeTimers("modern");

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    basePath: "/basepath",
  },
}));
