import { describe, expect, it } from 'vitest'
import { parse } from '../index'

describe('999', async () => {
  const json = await fetch('http://lm.ok:999/backend/v3/api-docs').then(res => res.json())
  const { data } = parse(json)
  it('测试999', () => {
    expect(data).toMatchSnapshot()
  })
})