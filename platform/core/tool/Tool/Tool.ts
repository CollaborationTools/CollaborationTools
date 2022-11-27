import { Component } from 'vue'

import { ChatTool } from './ChatTool'
import { ToolType } from './ToolType'

export type GenericTool = {
  type: ToolType
  name: string
} & (
  | { defaultComponent: Component }
  | { itemComponent: Component; listComponent?: Component }
  | { listComponent: Component }
)

export type Tool = ChatTool
