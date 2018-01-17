/* tslint:disable no-any */

import Vue, { ComponentOptions } from 'vue'
import { BlomAsyncData } from './blom-types'

declare global {
  interface Window {
    __INITIAL_STATE__?: {}
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: BlomAsyncData
    $options?: any
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    asyncData?: BlomAsyncData
    $options?: any
  }
}
