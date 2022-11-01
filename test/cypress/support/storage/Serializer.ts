import { StorageSerializers } from '@vueuse/core'

import { MapOfMapsSerializer } from 'stores/MapOfMapsSerializer'
import {
  ORGANISATIONS_KEY,
  RECENT_ORGANISATIONS_KEY,
} from 'stores/useOrganisationStore'
import { ORGANISATION_MEMBERS_KEY, USER_PROFILE_KEY } from 'stores/useUserStore'

type Item = string | number | boolean | object | null

// StorageSerializerTypes
//   return rawInit == null
//     ? 'any'
//     : rawInit instanceof Set
//     ? 'set'
//     : rawInit instanceof Map
//     ? 'map'
//     : rawInit instanceof Date
//     ? 'date'
//     : typeof rawInit === 'boolean'
//     ? 'boolean'
//     : typeof rawInit === 'string'
//     ? 'string'
//     : typeof rawInit === 'object'
//     ? 'object'
//     : Array.isArray(rawInit)
//     ? 'object'
//     : !Number.isNaN(rawInit)
//     ? 'number'
//     : 'any'
// }

const storageSerializer = {
  [ORGANISATIONS_KEY]: StorageSerializers.map,
  [RECENT_ORGANISATIONS_KEY]: StorageSerializers.object,
  [USER_PROFILE_KEY]: StorageSerializers.object,
  [ORGANISATION_MEMBERS_KEY]: MapOfMapsSerializer,
}

type StorageSerializerKey = keyof typeof storageSerializer

export const serialize = (type: StorageSerializerKey, item: Item): string => {
  const serializer = storageSerializer[type]
  return serializer.write(item)
}
