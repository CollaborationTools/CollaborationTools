import { StorageSerializers } from '@vueuse/core'

// function based on https://github.com/vueuse/vueuse/blob/main/packages/core/useStorage/guess.ts

type Item = string | number | boolean | object | null

// eslint-disable-next-line sonarjs/cognitive-complexity
function guessSerializerType<T extends Item>(
  rawInit: T,
): 'string' | 'number' | 'boolean' | 'object' | 'any' | 'set' | 'map' | 'date' {
  return rawInit == null
    ? 'any'
    : rawInit instanceof Set
    ? 'set'
    : rawInit instanceof Map
    ? 'map'
    : rawInit instanceof Date
    ? 'date'
    : typeof rawInit === 'boolean'
    ? 'boolean'
    : typeof rawInit === 'string'
    ? 'string'
    : typeof rawInit === 'object'
    ? 'object'
    : Array.isArray(rawInit)
    ? 'object'
    : !Number.isNaN(rawInit)
    ? 'number'
    : 'any'
}

export const serialize = (item: Item): string => {
  const type = guessSerializerType(item)
  const serializer = StorageSerializers[type]
  return serializer.write(item)
}
