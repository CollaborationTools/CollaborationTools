import { AvailableIcon, SPACE_ID_PARAM, spaceRoutes } from '@/config'

export type SpaceLink = Readonly<{
  label: string
  url: string
  icon?: AvailableIcon
}>

const genericSpaceLinks: readonly SpaceLink[] = [
  { url: spaceRoutes.index, label: 'Home', icon: 'home' },
  { url: spaceRoutes.team, label: 'Team', icon: 'team' },
  { url: spaceRoutes.chats, label: 'Chat', icon: 'chat' },
  { url: spaceRoutes.decision, label: 'Decisions', icon: 'decision' },
] as const

export const getSpaceLinks = (spaceId: string): SpaceLink[] =>
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
  spaceId: string | undefined,
): string => {
  if (spaceId === undefined) return ''
  const genericPath = path.replace(spaceId, SPACE_ID_PARAM)
  const spaceLinks = Array.from(genericSpaceLinks).reverse()
  return (
    spaceLinks.find((item) => genericPath.includes(item.url))?.label ?? 'Home'
  )
}
