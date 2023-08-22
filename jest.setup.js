import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";

import { testServer } from "./src/mocks/testServer";

export const testBasePath = "/basepath";

jest.useFakeTimers("modern");

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    basePath: testBasePath,
  },
}));

beforeAll(() => testServer.listen());
beforeEach(() => {
  testServer.resetHandlers();
});
afterAll(() => testServer.close());
