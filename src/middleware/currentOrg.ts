export default defineNuxtRouteMiddleware(() => {
  const org = useOrganisations().getCurrentOrganisation()
  if (org?.id) {
    const orgLinks = useRouting().getOrgLinks(org.id)
    const currentOrgPage = orgLinks[0].url
    return navigateTo(currentOrgPage)
  }
})
