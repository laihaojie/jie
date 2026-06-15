import type { SourceCodeTransformer } from 'unocss'
import { transformerDirectives, transformerVariantGroup } from 'unocss'

export const commonTransformers: SourceCodeTransformer[] = [
  transformerDirectives(),
  transformerVariantGroup(),
]
