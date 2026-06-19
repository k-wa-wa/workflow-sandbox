import { describe, it, expect, vi } from "vitest";
import { handler } from "../src/handler";

describe("handler", () => {
  it("returns statusCode 200 and body OK", async () => {
    const event = { source: "test" };
    const result = await handler(event as never, {} as never, vi.fn());
    expect(result).toEqual({ statusCode: 200, body: "OK" });
  });

  it("logs only safe event metadata (not full event payload)", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const event = { source: "test", "detail-type": "Scheduled Event", detail: "sensitive-data" };
    await handler(event as never, {} as never, vi.fn());
    expect(consoleSpy).toHaveBeenCalledWith(
      "Batch handler invoked",
      JSON.stringify({ source: "test", detailType: "Scheduled Event" })
    );
    const loggedArg = consoleSpy.mock.calls[0][1];
    expect(loggedArg).not.toContain("sensitive-data");
    consoleSpy.mockRestore();
  });
});
