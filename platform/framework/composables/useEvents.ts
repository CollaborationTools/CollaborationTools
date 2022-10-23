import { Ref } from 'vue'

import { EventManager, createEventManager } from 'core/event'
// import { EventManager, createEventManager, Event } from 'core/event'
// import { Organisation, InviteResponse } from 'core/organisation'
import {
  DeviceId,
  OrganisationMemberId,
  OrganisationMembers,
  // OrganisationMembersInContext,
} from 'core/user'
// import useOrganisationStore from '@/stores/useOrganisationStore'
// import useUserStore from '@/stores/useUserStore'

type UseEvents = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  runEventManager: (
    currentDeviceId: DeviceId,
    currentOrganisationMembers?: OrganisationMembers,
  ) => void
  sendDataTo: (recipient: OrganisationMemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
  setOrganisationMembers: (organisationMembers: OrganisationMembers) => void
}

const eventManager: Ref<EventManager | null> = ref(null)

export default function useEvents(): UseEvents {
  const runEventManager = (
    currentDeviceId: DeviceId,
    currentOrganisationMembers: OrganisationMembers = [],
  ): void => {
    if (eventManager.value) {
      return
    }

    const createReactiveArray = (): string[] => reactive([])

    eventManager.value = createEventManager({
      currentDeviceId,
      currentOrganisationMembers,
      createReactiveArray,
    })

    // if (!eventManager.value) {
    //   return
    // }
    //
    // const dataFeed = eventManager.value.getDataFeed()
    //
    // watch(
    //   dataFeed,
    //   () => {
    //     if (dataFeed.length > 0) {
    //       const event: Event = JSON.parse(String(dataFeed.shift()))
    //       if (event.type === 'invite') {
    //         const inviteResponse: InviteResponse = JSON.parse(event.data)
    //         useInvitations().closeInvite(inviteResponse)
    //       } else if (event.type === 'organisation') {
    //         const organisation: Organisation = JSON.parse(event.data)
    //         useOrganisationStore().setOrganisation(organisation)
    //       } else if (event.type === 'organisationMembers') {
    //         const {
    //           organisationId,
    //           organisationMembers,
    //         }: OrganisationMembersInContext = JSON.parse(event.data)
    //         organisationMembers.forEach((organisationMember) =>
    //           useUserStore().setOrganisationMember(
    //             organisationId,
    //             organisationMember,
    //           ),
    //         )
    //       }
    //     }
    //   },
    //   { deep: true, immediate: true },
    // )
  }

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    if (!eventManager.value) {
      return
    }
    eventManager.value.connectDirectlyTo(remoteDeviceId)
  }

  const sendDataTo = (recipient: OrganisationMemberId, data: string): void => {
    if (!eventManager.value) {
      return
    }
    eventManager.value.sendDataTo(recipient, data)
  }

  const sendDirectlyTo = (remoteDeviceId: DeviceId, data: string): void => {
    if (!eventManager.value) {
      return
    }
    eventManager.value.sendDirectlyTo(remoteDeviceId, data)
  }

  const setOrganisationMembers = (
    organisationMembers: OrganisationMembers,
  ): void => {
    if (!eventManager.value) {
      return
    }
    eventManager.value.setOrganisationMembers(organisationMembers)
  }

  return {
    connectDirectlyTo,
    runEventManager,
    sendDataTo,
    sendDirectlyTo,
    setOrganisationMembers,
  }
}
