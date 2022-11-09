import { ComputedRef } from 'vue'

import { SpaceId } from 'core/space'

import { SPACE_PATH } from './routes'

type UseRouting = {
  goBack: () => void
  hasHistory: ComputedRef<boolean>
  openSpace: (spaceId: SpaceId) => void
}

export default function useRouting(): UseRouting {
  const router = useRouter()

  const goBack = (): void => router.back()

  const hasHistory = computed(() => !!router.options.history.state.back)

  const openSpace = (spaceId: SpaceId): void => {
    router.push(`${SPACE_PATH}/${spaceId}`)
  }

  return { goBack, hasHistory, openSpace }
}
