import { AvailableIcon } from '@/components/atom/AtomIcon.vue'

import { ORG_ID_PARAM, organisationRoutes } from './routes'

export type NavLink = Readonly<{
  url: string
  icon?: AvailableIcon
  label?: string
}>

const genericOrgNavigation: readonly NavLink[] = [
  { url: organisationRoutes.index, label: 'Home', icon: 'home' },
  { url: organisationRoutes.team, label: 'Team', icon: 'team' },
  { url: organisationRoutes.chat, label: 'Chat', icon: 'chat' },
] as const

export const getOrgNavigationFor = (orgId: string): NavLink[] => {
  return genericOrgNavigation.map(
    (link) =>
      ({
        url: link.url.replace(ORG_ID_PARAM, orgId),
        label: link.label,
        icon: link.icon,
      } as const),
  )
}
