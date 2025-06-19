import { describe, expect, it } from 'vitest'
import { parse } from '../index'

describe('bpm', async () => {
  const json = await fetch('http://lm.ok:906/backend/v3/api-docs').then(res => res.json())
  const { data } = parse(json)
  it('测试query参数', () => {
    expect(data).toMatchSnapshot()

    const bpmApi = data.find(api => api.controller === '/api-base/bpm')
    const page = bpmApi?.data.find(api => api.path === '/api-base/bpm/process-definition/page')

    expect(page.queryParameters.length).not.toBe(0)
  })
})