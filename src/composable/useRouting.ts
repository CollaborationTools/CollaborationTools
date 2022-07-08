import { ComputedRef } from 'vue'

import { AvailableIcon } from '@/components/atom/AtomIcon.vue'

export type NavLink = {
  url: string
  icon?: AvailableIcon
  label?: string
}

type UseRouting = {
  getOrgLinks: (orgId: string) => NavLink[]
  goBack: () => void
  hasHistory: ComputedRef<boolean>
  openOrganisation: (orgId: string) => void
}

const ORG_PATH = '/org/' as const
const ORG_ID_PARAM = ':id' as const

const orgRoutes: readonly NavLink[] = [
  { url: `${ORG_PATH}${ORG_ID_PARAM}`, label: 'Home', icon: 'home' },
  { url: `${ORG_PATH}${ORG_ID_PARAM}/team`, label: 'Team', icon: 'team' },
  { url: `${ORG_PATH}${ORG_ID_PARAM}/chat`, label: 'Chat', icon: 'chat' },
] as const

export default function useRouting(): UseRouting {
  const router = useRouter()

  const goBack = (): void => router.back()

  const hasHistory = computed(() => !!router.options.history.state.back)

  const openOrganisation = (orgId: string): void => {
    router.push(ORG_PATH + orgId)
  }

  const getOrgLinks = (orgId: string): NavLink[] => {
    return orgRoutes.map((link) => ({
      url: link.url.replace(ORG_ID_PARAM, orgId),
      label: link.label,
      icon: link.icon,
    }))
  }

  return { getOrgLinks, goBack, hasHistory, openOrganisation }
}
