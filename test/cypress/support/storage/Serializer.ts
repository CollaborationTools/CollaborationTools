import { StorageSerializers } from '@vueuse/core'

import { MapOfMapsSerializer } from 'stores/MapOfMapsSerializer'
import { SPACES_KEY, CURRENT_SPACE_KEY } from 'stores/useSpaceStore'
import { SPACE_MEMBERS_KEY, USER_PROFILE_KEY } from 'stores/useUserStore'

type Item = string | number | boolean | object | null

/**
 * Defines how data is converted between stores and localStorage
 *
 * Storage serializers are based on VueUse implementation and its types:
 *   return rawInit == null
 *     ? 'any'
 *     : rawInit instanceof Set
 *     ? 'set'
 *     : rawInit instanceof Map
 *     ? 'map'
 *     : rawInit instanceof Date
 *     ? 'date'
 *     : typeof rawInit === 'boolean'
 *     ? 'boolean'
 *     : typeof rawInit === 'string'
 *     ? 'string'
 *     : typeof rawInit === 'object'
 *     ? 'object'
 *     : Array.isArray(rawInit)
 *     ? 'object'
 *     : !Number.isNaN(rawInit)
 *     ? 'number'
 *     : 'any'
 */
const storageSerializer = {
  [SPACES_KEY]: StorageSerializers.map,
  [CURRENT_SPACE_KEY]: StorageSerializers.string,
  [USER_PROFILE_KEY]: StorageSerializers.object,
  [SPACE_MEMBERS_KEY]: MapOfMapsSerializer,
}

type StorageSerializerKey = keyof typeof storageSerializer

export const serialize = (type: StorageSerializerKey, item: Item): string => {
  const serializer = storageSerializer[type]
  return serializer.write(item)
}
