import { defineChatTool, ToolTypes } from 'core/tool/Tool'

import ChatItem from './ChatItem.vue'
import ChatList from './ChatList.vue'

export const defaultChat = defineChatTool({
  itemComponent: ChatItem,
  listComponent: ChatList,
  name: 'chat',
  type: ToolTypes.Chat,
})
