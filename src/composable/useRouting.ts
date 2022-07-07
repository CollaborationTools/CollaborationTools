import { ComputedRef } from 'vue'

type UseRouting = {
  goBack: () => void
  hasHistory: ComputedRef<boolean>
  openOrganisation: (orgId: string) => void
}

export default function useRouting(): UseRouting {
  const router = useRouter()

  const goBack = (): void => router.back()

  const hasHistory = computed(() => !!router.options.history.state.back)

  const openOrganisation = (orgId: string): void => {
    router.push('/org/' + orgId)
  }

  return { openOrganisation, hasHistory, goBack }
}
