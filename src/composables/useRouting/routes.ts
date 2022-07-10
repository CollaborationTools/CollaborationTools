export const visitorRoutes = {
  getStarted: 'get-started',
  guide: 'guide',
} as const

export const ORG_PATH = '/org' as const
export const ORG_ID_PARAM = ':id' as const

export const organisationRoutes = {
  index: `${ORG_PATH}/${ORG_ID_PARAM}`,
  team: `${ORG_PATH}/${ORG_ID_PARAM}/team`,
  chat: `${ORG_PATH}/${ORG_ID_PARAM}/chat`,
} as const

export const getMainOrgPathFor = (orgId: string): string =>
  organisationRoutes.index.replace(ORG_ID_PARAM, orgId)
