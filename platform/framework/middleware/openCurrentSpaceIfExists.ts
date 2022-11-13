import useSpaces from '@/composables/useSpaces'
import useSpaceStore from '@/stores/useSpaceStore'

export default defineNuxtRouteMiddleware(() => {
  const space = useSpaceStore().getCurrentSpace()
  if (space?.id) {
    const currentSpacePage = useSpaces().getMainSpacePathFor(space.id)
    return navigateTo(currentSpacePage)
  }
})
