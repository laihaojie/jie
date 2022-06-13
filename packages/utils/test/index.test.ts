import { describe, expect, it } from 'vitest'
import { isEmpty } from '../src'

describe('utils', () => {
  it('should be true', () => {
    expect(isEmpty(1)).toMatchInlineSnapshot('false')
  })
})
