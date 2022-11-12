import { ComputedRef, Ref } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

import { SpaceId } from 'core/space'

import { SPACE_PATH } from './routes'

type UseRouting = {
  getRoute: () => Ref<RouteLocationNormalizedLoaded>
  goBack: () => void
  hasHistory: ComputedRef<boolean>
  openSpace: (spaceId: SpaceId) => void
}

export default function useRouting(): UseRouting {
  const router = useRouter()

  const getRoute = (): Ref<RouteLocationNormalizedLoaded> => router.currentRoute

  const goBack = (): void => router.back()

  const hasHistory = computed(() => !!router.options.history.state.back)

  const openSpace = (spaceId: SpaceId): void => {
    router.push(`${SPACE_PATH}/${spaceId}`)
  }

  return { getRoute, goBack, hasHistory, openSpace }
}
