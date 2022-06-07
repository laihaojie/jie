import { describe, it, expect } from "vitest"
import { isEmpty } from "@djie/utils"

describe("utils", () => {
  it("should be true", () => {
    expect(isEmpty(1)).toMatchInlineSnapshot('false')
  })
})