import { describe, expect, it } from 'vitest'
import { parse } from '../index'

describe('parse', async () => {
  const json = await fetch('http://lm.ok:889/backend/v3/api-docs').then(res => res.json())
  const { data } = parse(json)
  it('判断controller名字有api结尾的情况', async () => {
    expect(data).toMatchSnapshot()
    const categoryApi = data.find(api => api.controller === '/api-base/category-api')
    const category = data.find(api => api.controller === '/api-base/category')

    expect(categoryApi.apiName).toMatchInlineSnapshot('"ApiBaseCategoryApiAuto"')
    expect(category.apiName).toMatchInlineSnapshot('"ApiBaseCategoryAuto"')

    expect(categoryApi.apiName).toBe('ApiBaseCategoryApiAuto')
    expect(category.apiName).toBe('ApiBaseCategoryAuto')
  })

  it('检测路径参数', async () => {
    const pathApi = data.find(api => api.controller === '/api-base/dict')?.data.find(api => api.path === '/api-base/dict/list/{type}')

    expect(pathApi.pathParameters.length).toBe(1)
    expect(pathApi.pathParameters[0].name).toBe('type')

    expect(pathApi.funcName).toMatchInlineSnapshot('"typeListDict"')
    expect(pathApi.funcName).toBe('typeListDict')
  })

})
