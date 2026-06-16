import { describe, it, expect, vi } from "vitest";
import { handler } from "../src/handler";

describe("handler", () => {
  it("returns statusCode 200 and body OK", async () => {
    const event = { source: "test" };
    const result = await handler(event as never, {} as never, vi.fn());
    expect(result).toEqual({ statusCode: 200, body: "OK" });
  });

  it("logs the event", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const event = { source: "test", detail: "data" };
    await handler(event as never, {} as never, vi.fn());
    expect(consoleSpy).toHaveBeenCalledWith(
      "Batch handler invoked",
      JSON.stringify(event)
    );
    consoleSpy.mockRestore();
  });
});
