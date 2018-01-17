/* tslint:disable no-invalid-this no-any */

import Vue from 'vue'

import { BlomCreateApp } from './blom-types'

export default (createApp: BlomCreateApp) => {
  const { app, router, store } = createApp()

  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: store,
          route: to
        })
          .then(next)
          .catch(next)
      } else {
        next()
      }
    }
  })

  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  if (typeof window.__INITIAL_STATE__ !== 'undefined') {
    store.replaceState(window.__INITIAL_STATE__)
  }

  router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using `router.beforeResolve()` so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)

      // we only care about non-previously-rendered components,
      // so we compare them until the two matched lists differ
      let diffed = false
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = prevMatched[i] !== c)
      })

      const asyncDataHooks = activated
        .map((c: any) => c.asyncData)
        .filter(_ => _)

      if (!asyncDataHooks.length) {
        return next()
      }

      Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
        .then(() => {
          next()
        })
        .catch(next)
    })

    app.$mount('#app')
  })
}
