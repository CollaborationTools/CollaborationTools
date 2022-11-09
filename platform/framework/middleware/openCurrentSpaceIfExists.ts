import { getMainSpacePathFor } from '@/composables/useRouting'
import useSpaceStore from '@/stores/useSpaceStore'

export default defineNuxtRouteMiddleware(() => {
  const space = useSpaceStore().getCurrentSpace()
  if (space?.id) {
    const currentSpacePage = getMainSpacePathFor(space.id)
    return navigateTo(currentSpacePage)
  }
})
