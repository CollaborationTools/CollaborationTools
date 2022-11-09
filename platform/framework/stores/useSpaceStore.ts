import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import {
  addSpace as coreAddSpace,
  AllSpaces,
  createRecentSpaces as coreCreateRecentSpaces,
  getCurrentSpace as coreGetCurrentSpace,
  getRecentSpaces as coreGetRecentSpaces,
  getSpace as coreGetSpace,
  getSpaces as coreGetSpaces,
  RecentSpaces,
  setMostRecentSpace as coreSetMostRecentSpace,
  setSpace as coreSetSpace,
  Space,
  SpaceId,
  Spaces,
} from 'core/space'
import { createUUID } from 'services/browser/uuid'

export const SPACES_KEY = 'spaces' as const
export const RECENT_SPACES_KEY = 'recentSpaces' as const

export default defineStore('spaces', {
  state: () => ({
    allSpaces: useStorage<AllSpaces>(
      SPACES_KEY,
      new Map<SpaceId, Space | null>(),
    ),
    recentSpaces: useStorage<RecentSpaces>(
      RECENT_SPACES_KEY,
      coreCreateRecentSpaces(),
    ),
  }),
  getters: {
    getSpace(state) {
      return (spaceId: string): Space | null =>
        coreGetSpace(state.allSpaces, spaceId)
    },
    getCurrentSpace(state) {
      return (): Space | null =>
        coreGetCurrentSpace(state.allSpaces, state.recentSpaces)
    },
    getSpaces(state) {
      return (): Spaces => coreGetSpaces(state.allSpaces)
    },
    getRecentSpaces(state) {
      return (): Spaces =>
        coreGetRecentSpaces(state.allSpaces, state.recentSpaces)
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
      this.recentSpaces = coreSetMostRecentSpace(
        this.recentSpaces,
        currentSpaceId,
      )
    },
  },
})
