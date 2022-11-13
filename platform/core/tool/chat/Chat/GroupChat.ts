import { ChatId, ParticipantId, SpaceId } from './Chat'

export type GroupChat = Readonly<{
  id: ChatId
  participants: Readonly<ParticipantId[]>
  name?: string
  spaceId?: SpaceId
  previousParticipants?: Readonly<ParticipantId[]>
}>

type CreateGroupChatProps = Omit<GroupChat, 'participants'> & {
  participant1: ParticipantId
  participant2: ParticipantId
  otherParticipants?: ParticipantId[]
}

export const createGroupChat = ({
  id,
  name,
  otherParticipants,
  participant1,
  participant2,
  previousParticipants,
  spaceId,
}: CreateGroupChatProps): GroupChat => {
  const participants = [participant1, participant2]
  if (otherParticipants && otherParticipants?.length > 0)
    participants.push(...otherParticipants)
  return {
    id,
    name,
    participants,
    previousParticipants,
    spaceId,
  }
}
