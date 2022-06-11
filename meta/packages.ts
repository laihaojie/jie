type PackageManifest = {
  name: string
  description?: string
  mjs?: boolean
  cjs?: boolean
  dts?: boolean
  tsx?: boolean
  external?: string[]
}

export const packages: PackageManifest[] = [
  {
    name: 'utils',
    description: 'The utils of djie',
  },
  {
    name: 'ws',
    description: 'The ws of djie',
    cjs: false,
  },
  {
    name: 'jie-ui',
    description: 'The jie-ui of djie',
    cjs: false,
    tsx: true,
  },
]