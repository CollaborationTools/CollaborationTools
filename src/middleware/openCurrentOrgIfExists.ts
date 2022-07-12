import { getMainOrgPathFor } from '@/composables/useRouting'
import useOrganisations from '@/stores/useOrganisations'

export default defineNuxtRouteMiddleware(() => {
  const org = useOrganisations().getCurrentOrganisation()
  if (org?.id) {
    const currentOrgPage = getMainOrgPathFor(org.id)
    return navigateTo(currentOrgPage)
  }
})
