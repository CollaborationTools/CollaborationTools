import { useMediaQuery } from '@vueuse/core'
import { Ref } from 'vue'

type UseLayout = {
  isAtMostTablet: Ref<boolean>
}

export default function useLayout(): UseLayout {
  const isAtMostTablet = useMediaQuery('(max-width: 767px)')

  return {
    isAtMostTablet,
  }
}
