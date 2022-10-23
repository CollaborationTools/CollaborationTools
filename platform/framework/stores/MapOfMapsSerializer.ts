type MapOfMaps<ParentKey, ChildKey, ChildValue> = Map<
  ParentKey,
  Map<ChildKey, ChildValue> | null
>

export const MapOfMapsSerializer = {
  read: <ParentKey, ChildKey, ChildValue>(
    jsonString: string,
  ): MapOfMaps<ParentKey, ChildKey, ChildValue> => {
    const mapOfMaps: MapOfMaps<ParentKey, ChildKey, ChildValue> = new Map<
      ParentKey,
      Map<ChildKey, ChildValue>
    >()

    const parentMap: Map<ParentKey, [ChildKey, ChildValue][] | null> = new Map(
      JSON.parse(jsonString),
    )

    parentMap.forEach((value, key) => {
      if (value) {
        const childMap: Map<ChildKey, ChildValue> = new Map(value)
        mapOfMaps.set(key, childMap)
      } else {
        mapOfMaps.set(key, null)
      }
    })
    return mapOfMaps
  },
  write: <ParentKey, ChildKey, ChildValue>(
    mapOfMaps: MapOfMaps<ParentKey, ChildKey, ChildValue>,
  ): string => {
    const parentMap: Map<ParentKey, [ChildKey, ChildValue][] | null> = new Map()

    mapOfMaps.forEach((value, key) => {
      if (value) {
        const arrayValue = Array.from(value.entries())
        parentMap.set(key, arrayValue)
      } else {
        parentMap.set(key, null)
      }
    })

    return JSON.stringify(Array.from(parentMap.entries()))
  },
}
