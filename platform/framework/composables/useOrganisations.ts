import { Organisation } from 'core/organisation'
import { MemberId } from 'core/user'
import { createEvent } from 'services/connectionHub'

type UseOrganisations = {
  createOrganisationEvent: (
    senderId: MemberId,
    organisation: Organisation,
  ) => string
}

export default function useOrganisations(): UseOrganisations {
  const createOrganisationEvent = (
    senderId: MemberId,
    organisation: Organisation,
  ): string => {
    const data = JSON.stringify(organisation)
    const event = createEvent({
      data,
      senderId,
      type: 'organisation',
    })
    return JSON.stringify(event)
  }

  return { createOrganisationEvent }
}
