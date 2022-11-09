import { AvailableIcon } from '@/components/atom/AtomIcon.vue'

import { SPACE_ID_PARAM, spaceRoutes } from './routes'

export type NavLink = Readonly<{
  url: string
  icon?: AvailableIcon
  label?: string
}>

const genericSpaceNavigation: readonly NavLink[] = [
  { url: spaceRoutes.index, label: 'Home', icon: 'home' },
  { url: spaceRoutes.team, label: 'Team', icon: 'team' },
  { url: spaceRoutes.chat, label: 'Chat', icon: 'chat' },
] as const

export const getSpaceNavigationFor = (spaceId: string): NavLink[] => {
  return genericSpaceNavigation.map(
    (link) =>
      ({
        url: link.url.replace(SPACE_ID_PARAM, spaceId),
        label: link.label,
        icon: link.icon,
      } as const),
  )
}
