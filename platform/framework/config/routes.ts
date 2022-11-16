export const INVITE_LINK_ENCODED_DATA = ':data' as const

export const visitorRoutes = {
  getStarted: '/get-started',
  guide: '/guide',
  guideJoinSpace: '/guide/joining-space',
  invite: `/invite-${INVITE_LINK_ENCODED_DATA}`,
  tools: '/tools',
} as const

export const SPACE_PATH = '/space' as const
export const SPACE_ID_PARAM = ':id' as const
export const MEMBER_ID_PARAM = ':memberId' as const
export const CHAT_ID_PARAM = ':chatId' as const

export const spaceRoutes = {
  all: `${SPACE_PATH}`,
  new: `${SPACE_PATH}/new`,
  index: `${SPACE_PATH}/${SPACE_ID_PARAM}`,
  team: `${SPACE_PATH}/${SPACE_ID_PARAM}/team`,
  member: `${SPACE_PATH}/${SPACE_ID_PARAM}/team/member/${MEMBER_ID_PARAM}`,
  chats: `${SPACE_PATH}/${SPACE_ID_PARAM}/chat`,
  chat: `${SPACE_PATH}/${SPACE_ID_PARAM}/chat/${CHAT_ID_PARAM}`,
  decision: `${SPACE_PATH}/${SPACE_ID_PARAM}/decision`,
} as const

export const privateRoutes = {
  profile: '/profile',
}
