import { formatAsLocalDateTime } from "../dateUtils";

describe("dateUtils", () => {
  beforeAll(() => {
    jest.setSystemTime(new Date("2030-10-12T03:24:00").getTime());
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe("formatAsLocalDateTime", () => {
    test("should format date as LocalDateTime", () => {
      const formatedDate = formatAsLocalDateTime(new Date());

      expect(formatedDate).toBe("2030-10-12T03:24:00.000");
    });
  });
});
