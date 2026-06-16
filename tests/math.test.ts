import { describe, it, expect } from "vitest";
import { sum } from "../src/math";

describe("sum", () => {
  it("returns 3 for sum(1, 2)", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("returns 0 for sum(-1, 1)", () => {
    expect(sum(-1, 1)).toBe(0);
  });

  it("returns 0 for sum(0, 0)", () => {
    expect(sum(0, 0)).toBe(0);
  });

  it("returns 4 for sum(1.5, 2.5)", () => {
    expect(sum(1.5, 2.5)).toBe(4);
  });
});
