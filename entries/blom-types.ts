/* tslint:disable no-any no-submodule-imports */
import { CombinedVueInstance } from 'vue/types/vue'
import VueRouter, { Route } from 'vue-router'

export interface BlomAsyncDataProps<P = any> {
  store: P
  route: Route
}

export type BlomAsyncData<P = any> = (
  props: BlomAsyncDataProps<P>
) => void | Promise<void>

export interface BlomCreateAppReturn {
  router: VueRouter
  app: CombinedVueInstance<any, any, any, any, any>
  store: any
}

export type BlomCreateApp = () => BlomCreateAppReturn
