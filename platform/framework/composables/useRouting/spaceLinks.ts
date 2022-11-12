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

export const getSpaceLinkLabelForPath = (
  path: string,
  spaceId: string,
): string => {
  const genericPath = path.replace(spaceId, SPACE_ID_PARAM)
  // eslint-disable-next-line total-functions/no-unsafe-readonly-mutable-assignment
  const spaceLinks = Array.from(genericSpaceLinks).reverse()
  return (
    spaceLinks.find((item) => genericPath.includes(item.url))?.label ?? 'Home'
  )
}
