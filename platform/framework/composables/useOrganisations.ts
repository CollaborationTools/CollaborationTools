import { Organisation } from 'core/organisation'
import { OrganisationMemberId } from 'core/user'
import { createEvent } from 'services/connectionHub'

type UseOrganisations = {
  createOrganisationEvent: (
    senderId: OrganisationMemberId,
    organisation: Organisation,
  ) => string
}

export default function useOrganisations(): UseOrganisations {
  const createOrganisationEvent = (
    senderId: OrganisationMemberId,
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
