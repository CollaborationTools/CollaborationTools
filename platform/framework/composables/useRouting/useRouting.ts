import { ComputedRef, Ref } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

import { CHAT_ID_PARAM, SPACE_ID_PARAM, spaceRoutes } from '@/config'
import { SpaceId } from 'core/space'
import { ChatId } from 'core/tool/chat'

type UseRouting = {
  getRoute: () => Ref<RouteLocationNormalizedLoaded>
  getRouteParameter: (parameter: string) => ComputedRef<string | null>
  goBack: () => void
  hasHistory: ComputedRef<boolean>
  openChat: (spaceId: SpaceId, chatId: ChatId) => void
  openSpace: (spaceId: SpaceId) => void
}

export default function useRouting(): UseRouting {
  const router = useRouter()

  const getRoute = (): Ref<RouteLocationNormalizedLoaded> => router.currentRoute

  const getRouteParameter = (parameter: string): ComputedRef<string | null> => {
    const route = router.currentRoute
    return computed(() => {
      const maybeParameter =
        route.value.params[parameter] instanceof Array
          ? route.value.params[parameter]?.[0]
          : route.value.params[parameter]
      return maybeParameter ? String(maybeParameter) : null
    })
  }

  const goBack = (): void => router.back()

  const hasHistory = computed(() => !!router.options.history.state.back)

  const open = (path: string): void => {
    router.push(path)
  }

  const openChat = (spaceId: SpaceId, chatId: ChatId): void =>
    open(
      spaceRoutes.chat
        .replace(SPACE_ID_PARAM, spaceId)
        .replace(CHAT_ID_PARAM, chatId),
    )

  const openSpace = (spaceId: SpaceId): void =>
    open(spaceRoutes.index.replace(SPACE_ID_PARAM, spaceId))

  return {
    getRoute,
    getRouteParameter,
    goBack,
    hasHistory,
    openChat,
    openSpace,
  }
}
