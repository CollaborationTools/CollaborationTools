import { getMainOrgPathFor } from '@/composables/useRouting'
import useOrganisationStore from '@/stores/useOrganisationStore'

export default defineNuxtRouteMiddleware(() => {
  const org = useOrganisationStore().getCurrentOrganisation()
  if (org?.id) {
    const currentOrgPage = getMainOrgPathFor(org.id)
    return navigateTo(currentOrgPage)
  }
})
