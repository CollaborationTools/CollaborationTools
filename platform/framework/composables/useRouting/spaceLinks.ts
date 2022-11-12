import { SPACE_ID_PARAM, spaceRoutes } from './routes'

import type { AvailableIcon } from '@/config'

export type SpaceLink = Readonly<{
  label: string
  url: string
  icon?: AvailableIcon
}>

const genericSpaceLinks: readonly SpaceLink[] = [
  { url: spaceRoutes.index, label: 'Home', icon: 'home' },
  { url: spaceRoutes.team, label: 'Team', icon: 'team' },
  { url: spaceRoutes.chat, label: 'Chat', icon: 'chat' },
] as const

export const getSpaceLinksFor = (spaceId: string): SpaceLink[] =>
  genericSpaceLinks.map(
    (link) =>
      ({
        url: link.url.replace(SPACE_ID_PARAM, spaceId),
        label: link.label,
        icon: link.icon,
      } as const),
  )
