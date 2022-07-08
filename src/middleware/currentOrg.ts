import useOrganisation from '@/composable/useOrganisation'
import useRouting from '@/composable/useRouting'

export default defineNuxtRouteMiddleware(() => {
  const org = useOrganisation().getOrganisation()
  if (org?.id) {
    const orgLinks = useRouting().getOrgLinks(org.id)
    const currentOrgPage = orgLinks[0].url
    return navigateTo(currentOrgPage)
  }
})
