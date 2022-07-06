import { createUUID } from '@/services/browser/uuid'

export type Organisation = {
  id: string
  name: string
}

export const createOrganisation = (name: string): Organisation => {
  return {
    id: createUUID(),
    name,
  }
}
