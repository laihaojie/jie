import { describe, expect, it } from 'vitest'
import { parse } from '../index'

describe('survey', async () => {
  const json = await fetch('http://lm.ok:508/backend/v3/api-docs').then(res => res.json())
  const { data } = parse(json)
  it('测试query参数', () => {
    expect(data).toMatchSnapshot()
  })
})