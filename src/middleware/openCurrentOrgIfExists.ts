import { getMainOrgPathFor } from '@/composables/useRouting'

export default defineNuxtRouteMiddleware(() => {
  const org = useOrganisations().getCurrentOrganisation()
  if (org.value?.id) {
    const currentOrgPage = getMainOrgPathFor(org.value.id)
    return navigateTo(currentOrgPage)
  }
})
