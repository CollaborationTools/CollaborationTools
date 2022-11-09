export type SpaceId = string

export type Space = Readonly<{
  id: SpaceId
  name: string
}>
export type Spaces = Readonly<Space[]>
