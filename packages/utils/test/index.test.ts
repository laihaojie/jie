import { describe, it, expect } from "vitest"
import { add } from "../src"

describe("utils", () => {
  it("should be true", () => {
    expect(add()).toBe(2)
  })
})