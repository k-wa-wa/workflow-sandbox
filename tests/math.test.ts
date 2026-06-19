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

describe("sum - special number values", () => {
  it("returns Infinity for sum(Infinity, 1)", () => {
    expect(sum(Infinity, 1)).toBe(Infinity);
  });

  it("returns -Infinity for sum(-Infinity, -1)", () => {
    expect(sum(-Infinity, -1)).toBe(-Infinity);
  });

  it("returns NaN for sum(Infinity, -Infinity)", () => {
    expect(sum(Infinity, -Infinity)).toBeNaN();
  });

  it("returns NaN for sum(NaN, 1)", () => {
    expect(sum(NaN, 1)).toBeNaN();
  });

  it("returns Infinity for sum(Number.MAX_VALUE, Number.MAX_VALUE) due to overflow", () => {
    expect(sum(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
  });
});

describe("sum - floating point precision edge cases", () => {
  it("returns 0.30000000000000004 for sum(0.1, 0.2) due to floating point precision", () => {
    expect(sum(0.1, 0.2)).toBe(0.30000000000000004);
  });

  it("returns 0.7999999999999999 for sum(0.1, 0.7) due to floating point precision", () => {
    expect(sum(0.1, 0.7)).toBe(0.7999999999999999);
  });

  it("returns 0.6000000000000001 for sum(0.2, 0.4) due to floating point precision", () => {
    expect(sum(0.2, 0.4)).toBe(0.6000000000000001);
  });
});
