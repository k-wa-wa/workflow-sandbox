import { describe, it, expect } from "vitest";
import { add, subtract, multiply, divide } from "../src/math";

describe("add", () => {
  it("returns 3 for add(1, 2)", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("returns 0 for add(-1, 1)", () => {
    expect(add(-1, 1)).toBe(0);
  });

  it("returns 0 for add(0, 0)", () => {
    expect(add(0, 0)).toBe(0);
  });

  it("returns 4 for add(1.5, 2.5)", () => {
    expect(add(1.5, 2.5)).toBe(4);
  });
});

describe("add - floating point precision edge cases", () => {
  it("returns 0.30000000000000004 for add(0.1, 0.2) due to floating point precision", () => {
    expect(add(0.1, 0.2)).toBe(0.30000000000000004);
  });

  it("returns 0.7999999999999999 for add(0.1, 0.7) due to floating point precision", () => {
    expect(add(0.1, 0.7)).toBe(0.7999999999999999);
  });

  it("returns 0.6000000000000001 for add(0.2, 0.4) due to floating point precision", () => {
    expect(add(0.2, 0.4)).toBe(0.6000000000000001);
  });
});

describe("subtract", () => {
  it("returns 2 for subtract(5, 3)", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it("returns -5 for subtract(0, 5)", () => {
    expect(subtract(0, 5)).toBe(-5);
  });

  it("returns 0 for subtract(-1, -1)", () => {
    expect(subtract(-1, -1)).toBe(0);
  });
});

describe("multiply", () => {
  it("returns 12 for multiply(3, 4)", () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it("returns -10 for multiply(-2, 5)", () => {
    expect(multiply(-2, 5)).toBe(-10);
  });

  it("returns 0 for multiply(0, 100)", () => {
    expect(multiply(0, 100)).toBe(0);
  });
});

describe("divide", () => {
  it("returns 5 for divide(10, 2)", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("returns 3.5 for divide(7, 2)", () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  it("returns Infinity for divide(1, 0)", () => {
    expect(divide(1, 0)).toBe(Infinity);
  });

  it("returns -Infinity for divide(-1, 0)", () => {
    expect(divide(-1, 0)).toBe(-Infinity);
  });

  it("returns NaN for divide(0, 0)", () => {
    expect(divide(0, 0)).toBeNaN();
  });
});
