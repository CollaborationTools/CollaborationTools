import { DirectChat } from './DirectChat'
import { GroupChat } from './GroupChat'

export type ChatId = string
export type ParticipantId = string
export type SpaceId = string

export type Chat = DirectChat | GroupChat
