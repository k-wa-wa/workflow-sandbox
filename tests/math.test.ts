import { describe, it, expect } from "vitest";
import { sum } from "../src/math";

describe("sum", () => {
  it("adds two positive integers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds a negative number", () => {
    expect(sum(-1, 5)).toBe(4);
  });

  it("adds decimals approximately", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it("adds zeros", () => {
    expect(sum(0, 0)).toBe(0);
  });
});
