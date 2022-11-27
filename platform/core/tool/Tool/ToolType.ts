export const ToolTypes = { Chat: 'chat', Decision: 'decision' } as const

type ValuesOf<Type extends Record<string, string>> = Type[keyof Type]

export type ToolType = ValuesOf<typeof ToolTypes>
