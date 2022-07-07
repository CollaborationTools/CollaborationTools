import { StorageSerializers, useStorage } from '@vueuse/core'

import useRouting from '@/composable/useRouting'
import { createOrganisation, Organisation } from '@/features/organisation'

type UseOrganisation = {
  getOrganisation: () => Readonly<Organisation> | null
  addOrganisation: (orgName: string) => Readonly<Organisation>
  redirectToOrgIfExists: (orgId?: string) => void
}

export default function useOrganisation(): UseOrganisation {
  const orgRef = useStorage<Organisation | null>(
    'organisation',
    null,
    undefined,
    {
      serializer: StorageSerializers.object,
    },
  )

  const getOrganisation = (): Readonly<Organisation> | null => {
    const org = unref(orgRef)
    return org === null ? null : readonly(org)
  }

  const addOrganisation = (orgName: string): Readonly<Organisation> => {
    orgRef.value = createOrganisation(orgName)
    return readonly(orgRef.value)
  }

  const redirectToOrgIfExists = (orgId?: string): void => {
    let maybeOrgId = orgId

    if (!maybeOrgId && orgRef.value?.id) {
      maybeOrgId = orgRef.value.id
    }

    if (maybeOrgId) {
      useRouting().openOrganisation(maybeOrgId)
    }
  }

  return {
    getOrganisation,
    addOrganisation,
    redirectToOrgIfExists,
  }
}
