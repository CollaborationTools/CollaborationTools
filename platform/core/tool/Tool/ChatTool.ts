import { Component } from 'vue'

import { ToolType } from './ToolType'

export type ChatTool = Readonly<{
  itemComponent: Component
  listComponent: Component
  name: string
  type: ToolType
}>

type DefineChatToolProps = Omit<ChatTool, ''>

export const defineChatTool = ({
  itemComponent,
  listComponent,
  name,
  type,
}: DefineChatToolProps): ChatTool => ({
  itemComponent,
  listComponent,
  name,
  type,
})
