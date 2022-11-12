export const icons = {
  add: import('~icons/fluent/add-square-24-regular'),
  chat: import('~icons/fluent/chat-multiple-20-regular'),
  'chevron-down': import('~icons/fluent/chevron-down-24-filled'),
  home: import('~icons/fluent/home-28-regular'),
  info: import('~icons/fluent/info-28-regular'),
  moon: import('~icons/fluent/weather-moon-28-regular'),
  person: import('~icons/fluent/person-circle-20-regular'),
  plus: import('~icons/fluent/add-24-filled'),
  profile: import('~icons/fluent/person-24-regular'),
  spaces: import('~icons/fluent/align-space-evenly-vertical-20-regular'),
  sun: import('~icons/fluent/weather-sunny-28-regular'),
  team: import('~icons/fluent/people-team-28-regular'),
} as const

export type AvailableIcon = keyof typeof icons
