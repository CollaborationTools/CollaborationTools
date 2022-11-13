import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import {
  addSpace as coreAddSpace,
  AllSpaces,
  getSpace as coreGetSpace,
  getSpaces as coreGetSpaces,
  setSpace as coreSetSpace,
  Space,
  SpaceId,
  Spaces,
} from 'core/space'
import { createUUID } from 'services/crypto/uuid'

export const SPACES_KEY = 'spaces' as const
export const CURRENT_SPACE_KEY = 'currentSpace' as const

export default defineStore('spaces', {
  state: () => ({
    allSpaces: useStorage<AllSpaces>(
      SPACES_KEY,
      new Map<SpaceId, Space | null>(),
    ),
    currentSpaceId: useStorage<SpaceId | null>(CURRENT_SPACE_KEY, null),
  }),
  getters: {
    getSpace(state) {
      return (spaceId: string): Space | null =>
        coreGetSpace(state.allSpaces, spaceId)
    },
    getCurrentSpace(state) {
      return (): Space | null => {
        if (state.currentSpaceId === null) return null
        return coreGetSpace(state.allSpaces, state.currentSpaceId)
      }
    },
    getSpaces(state) {
      return (): Spaces => coreGetSpaces(state.allSpaces)
    },
  },
  actions: {
    addSpace(spaceName: string): Space {
      const spaceId = createUUID()
      const { space, allSpaces } = coreAddSpace(this.allSpaces, {
        id: spaceId,
        name: spaceName,
      })
      this.allSpaces = allSpaces
      return space
    },
    setSpace(space: Space): void {
      this.allSpaces = coreSetSpace(this.allSpaces, space)
    },
    setCurrentSpaceId(currentSpaceId: string): void {
      this.currentSpaceId = currentSpaceId
    },
  },
})
