import { type SourceCodeTransformer, transformerDirectives, transformerVariantGroup } from 'unocss'

export const commonTransformers: SourceCodeTransformer[] = [
  transformerDirectives(),
  transformerVariantGroup(),
]
