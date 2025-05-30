import { capitalizeFirstLetter, removeBraces, sliceBeforeApi, toCamelCase } from './utils'

export function parse(json: any) {
  const resultData = {
    json,
    controllers: [],
    data: [] as any[],
  }

  function setApiDocData(paths) {
    return paths.map((url) => {
      const path = resultData.json.paths[url]
      const res = {} as any
      const content = path.post || path.get

      if (content) {
        res.path = url
        res.method = path.post ? 'post' : 'get'
        res.summary = content.summary || toCamelCase(url)
        res.tag = content.tags[0]

        const funcName = toCamelCase(removeBraces(res.path))
        const slicedName = sliceBeforeApi(funcName)
        res.funcName = slicedName || funcName

        setReqData(content, res)
      }

      return res
    })
      .reduce((controllers, currentApi) => {
        const existingController = controllers.find(controller => currentApi.path.startsWith(controller.controller))

        if (existingController) {
          if (!existingController.data) {
            existingController.data = []
          }
          existingController.data.push(currentApi)
          currentApi.controller = existingController.controller
          currentApi.apiName = existingController.apiName

          const actionMatch = currentApi.path.match(new RegExp(`^${existingController.controller}(/(list|save|delete))$`))
          if (actionMatch) {
            const action = actionMatch[2] || actionMatch[3] || actionMatch[4]
            currentApi.action = action

            if (!existingController.crud) {
              existingController.crud = {}
            }
            existingController.crud[action] = currentApi
          }
        }

        return controllers
      }, resultData.controllers)
      .filter(controller => controller.data.length)
      .map((controller) => {
        const tag = resultData.json.tags.find(tag => tag.name === controller.data[0].tag)
        const isCrud = controller.crud && controller.crud.list

        if (!isCrud) {
          delete controller.crud
        }

        return {
          description: tag ? tag.description : controller.data[0].tag,
          ...controller,
        }
      })
  }

  function setTypesBySchemas(schemaName, schemas, stack = [] as any[]): any {
    try {
      if (!schemaName) {
        return
      }
      const schema = schemas[schemaName]
      if (!schema) {
        return
      }
      if (!schema.properties) {
        return
      }
      if (stack.includes(schemaName)) {
        return
      }
      stack.push(schemaName)

      return Object.keys(schema.properties).map((key) => {
        const property = schema.properties[key]
        if (property.$ref) {
          const refSchemaName = property.$ref.split('/').pop()
          return {
            name: key,
            type: 'object',
            originalType: property.type,
            description: property.description,
            items: setTypesBySchemas(refSchemaName, schemas, [...stack]),
          }
        }

        const type = property.type
        if (type === 'array') {
          const arraySchemaName = property.items?.$ref?.split('/').pop()
          if (arraySchemaName) {
            return {
              name: key,
              type: 'object-array',
              originalType: property.type,
              description: property.description,
              items: setTypesBySchemas(arraySchemaName, schemas, [...stack]),
            }
          }
          else {
            return {
              name: key,
              type: 'simple-array',
              originalType: property.type,
              description: property.description,
              items: property.items.type,
            }
          }
        }
        if (type === 'object') {
          if (property.additionalProperties) {
            return {
              name: key,
              type: 'map-object',
              originalType: property.type,
              description: property.description,
              mapValueType: property.additionalProperties.type,
            }
          }
          const objectSchemaName = property?.$ref?.split('/').pop()
          if (objectSchemaName) {
            return {
              name: key,
              type: 'object',
              originalType: property.type,
              description: property.description,
              items: setTypesBySchemas(objectSchemaName, schemas, [...stack]),
            }
          }
        }
        return {
          name: key,
          type: (property.format && property.format === 'binary') ? 'file' : property.type,
          originalType: property.type,
          description: property.description,
        }
      })
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  function setReqData(content, res) {
    try {
      if (content.requestBody) {
        let bodyParametersType = 'object'
        let schemaName = content.requestBody?.content['application/json']?.schema?.$ref?.split('/').pop()
        let schemas = resultData.json.components.schemas
        if (!schemaName) {
          if (content.requestBody?.content['application/json']?.schema?.properties) {
            schemaName = 'schema'
            schemas = content.requestBody?.content['application/json']
          }
          else if (content.requestBody?.content['multipart/form-data']?.schema?.properties) {
            schemaName = 'schema'
            schemas = content.requestBody?.content['multipart/form-data']
          }
          else if (content.requestBody?.content['application/json']?.schema?.type === 'array') {
            bodyParametersType = 'array'
            schemaName = content.requestBody?.content['application/json']?.schema?.items?.$ref?.split('/').pop()
          }
        }
        if (schemaName) {
          res.bodyParametersType = bodyParametersType
          res.bodyParameters = setTypesBySchemas(schemaName, schemas)
        }
      }
      if (content.parameters) {
        // const contentParameters = content.parameters.filter((item: any) => item.in === 'query')
        const contentParameters = content.parameters
        const schemaNames = contentParameters.filter((item: any) => item.schema?.$ref).map((item: any) => item.schema.$ref.split('/').pop())
        const schema = schemaNames.map(name => resultData.json.components.schemas[name])
        let requestData = []
        requestData = contentParameters.filter(item => item.schema && !item.schema?.$ref).map((item: any) => {
          let type = item.schema.type
          if (item.schema.items && item.schema.items.format === 'binary') {
            type = 'file-array'
          }
          return {
            name: item.name,
            type,
            in: item.in,
          }
        })
        requestData = requestData.concat(schema.map((item: any) => {
          return Object.keys(item.properties).map((key) => {
            return {
              name: key,
              type: item.properties[key].type,
              originalType: item.properties[key].type,
              in: item.in,
            }
          })
        }).flat())
        res.pathParameters = requestData.filter((item: any) => item.in === 'path')
        res.queryParameters = requestData.filter((item: any) => item.in === 'query')
      }
      const response = content.responses?.['200']?.content?.['*/*']?.schema?.$ref
      if (response) {
        const schemaName = response.split('/').pop()
        if (schemaName) {
          const schema = resultData.json.components.schemas[schemaName]
          if (schema) {
            const dataProperty = schema.properties?.data
            if (dataProperty) {
              const dataSchemaName = dataProperty.$ref?.split('/').pop()
              if (dataSchemaName) {
                res.responseData = {
                  name: 'data',
                  type: 'object',
                  originalType: dataProperty.type,
                  description: dataProperty.description,
                  items: setTypesBySchemas(dataSchemaName, resultData.json.components.schemas),
                }
              }
              else if (dataProperty.additionalProperties) {
                res.responseData = {
                  name: 'data',
                  type: 'map-object',
                  originalType: dataProperty.type,
                  description: dataProperty.description,
                  mapValueType: dataProperty.additionalProperties.type,
                }
              }
              else if (dataProperty.type === 'array') {
                const arraySchemaName = dataProperty.items?.$ref?.split('/').pop()
                if (arraySchemaName) {
                  res.responseData = {
                    name: 'data',
                    type: 'object-array',
                    originalType: dataProperty.type,
                    description: dataProperty.description,
                    items: setTypesBySchemas(arraySchemaName, resultData.json.components.schemas),
                  }
                }
                else {
                  res.responseData = {
                    name: 'data',
                    type: 'simple-array',
                    originalType: dataProperty.type,
                    description: dataProperty.description,
                    items: dataProperty.items.type,
                  }
                }
              }
              else {
                res.responseData = {
                  name: 'data',
                  type: dataProperty.type,
                  originalType: dataProperty.type,
                  description: dataProperty.description,
                }
              }
            }
          }
        }
      }

      const opList = [] as any[]
      if (res.queryParameters) {
        opList.push(res.queryParameters)
        res.contentType = 'application/x-www-form-urlencoded'
      }
      if (res.pathParameters) {
        opList.push(res.pathParameters)
        res.contentType = 'application/x-www-form-urlencoded'
      }
      if (res.bodyParameters) {
        opList.push(res.bodyParameters)
        res.contentType = 'application/json'
      }
      if (opList.flat(2).find(i => (i.type === 'file' || i.type === 'file-array'))) {
        res.contentType = 'multipart/form-data'
      }
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  // const paths = Object.keys(resultData.json.paths).filter(url => !url.includes('{'))
  const paths = Object.keys(resultData.json.paths)
  const controllers = Array.from(
    new Map(paths.map((url) => {
      const matched = url.match(/\/([\w-]+)\/([\w-]+)/)
      if (matched) {
        const matchedList = matched.slice(1)
        const base = matchedList.at(0)
        const groups = base?.split(/[-_]/).filter(Boolean)
        const group = groups?.[1]

        const name = matchedList.reverse().map(i => i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/[-_]/g, '-')).join('-')
        const apiName = name.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')

        const slicedName = sliceBeforeApi(apiName)
        return {
          controller: matched[0],
          name,
          group,
          apiName: `Api${capitalizeFirstLetter(group)}${slicedName || apiName}Auto`,
        }
      }
      else {
        return undefined
      }
    }).filter(item => item).map(item => [item!.name, item])).values(),
  ) as any

  resultData.controllers = controllers.sort((a, b) => b.controller.length - a.controller.length)

  const apiDocData = setApiDocData(paths)
  resultData.data = apiDocData
  return resultData
}
