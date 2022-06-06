import { describe, it, expect } from "vitest"
import { add } from "../src"

describe("utils", () => {
  it("should be true", () => {
    // expect(add()).toBe(2)
    expect(add()).toMatchInlineSnapshot('2.836008646850356')
  })
})