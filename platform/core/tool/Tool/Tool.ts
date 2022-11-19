import { Component } from 'vue'

export type Tool = Readonly<{
  defaultComponent: Readonly<Component>
  name: string
}>

type DefineToolProps = Omit<Tool, ''>

export const defineTool = ({
  defaultComponent,
  name,
}: DefineToolProps): Tool => ({ defaultComponent, name })
