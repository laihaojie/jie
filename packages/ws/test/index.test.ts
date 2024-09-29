import { isEmpty } from '@djie/utils'
import { describe, expect, it } from 'vitest'

describe('utils', () => {
  it('should be true', () => {
    expect(isEmpty(1)).toMatchInlineSnapshot('false')
  })
})
