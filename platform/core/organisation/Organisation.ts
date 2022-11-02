export type OrganisationId = string

export type Organisation = Readonly<{
  id: OrganisationId
  name: string
}>
export type Organisations = Readonly<Organisation[]>
