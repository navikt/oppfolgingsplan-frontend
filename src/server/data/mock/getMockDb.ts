import activeMockSM from "./activeMockSM";
import { MockSetupSM } from "./activeTestScenario";

declare global {
  // eslint-disable-next-line no-var
  var _mockDb: MockSetupSM;
}

/**
 * Whenever next.js hot-reloads, a new mock DB instance was created, meaning
 * that mutations were not persisted. Putting the MockDB on the global object
 * fixes this, but that only needs to be done when we are developing locally.
 */
global._mockDb = global._mockDb || activeMockSM;

/**
 * Used ONLY by tests to reset the fake DB to initial values between tests
 */
export function resetMockDb(): void {
  if (process.env.NODE_ENV !== "test")
    throw new Error("This is a test only utility");

  global._mockDb = activeMockSM;
}

export function assignNewDbSetup(newSetup: MockSetupSM): void {
  global._mockDb = newSetup;
}

const getMockDb = (): MockSetupSM => {
  // global._mockDb = new FakeMockDB();
  return global._mockDb;
};

export default getMockDb;
