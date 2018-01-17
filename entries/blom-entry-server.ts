/* tslint:disable promise-function-async no-void-expression */

import { BlomCreateApp } from './blom-types'

export default (createApp: BlomCreateApp) => {
  // TODO: Replace with a type
  // tslint:disable-next-line no-any
  return (context: any) => {
    return new Promise((resolve, reject) => {
      const { app, router, store } = createApp()

      router.push(context.url)

      router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        if (!matchedComponents.length) {
          return reject({
            code: 404
          })
        }

        // call `asyncData()` on all matched route components
        Promise.all(
          // tslint:disable-next-line no-any
          matchedComponents.map((Component: any) => {
            if (Component.asyncData) {
              return Component.asyncData({
                store,
                route: router.currentRoute
              })
            }
          })
        )
          .then(() => {
            // After all preFetch hooks are resolved, our store is now
            // filled with the state needed to render the app.
            // When we attach the state to the context, and the `template` option
            // is used for the renderer, the state will automatically be
            // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
            context.state = store.state

            resolve(app)
          })
          .catch(reject)
      }, reject)
    })
  }
}
