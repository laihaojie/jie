import { describe, it, expect } from "vitest"
import { add } from "@djie/utils"

describe("utils", () => {
  it("should be true", () => {
    expect(add()).toMatchInlineSnapshot('2')
  })
})