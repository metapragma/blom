import * as path from 'path'

import { createSelector } from 'reselect'
import { State } from './types'
import { MinifyOptions } from 'uglifyjs-webpack-plugin'
import { flatten, join, mapValues, values } from 'lodash'

// Simple Selectors

const _path = (state: State) => state.outputPath
export const SSRClientFilename = (state: State) => state.SSRClientFilename
export const SSRServerFilename = (state: State) => state.SSRServerFilename
export const context = (state: State) => state.context
export const devtool = (state: State) =>
  state.devtool === 'false' ? undefined : state.devtool
export const extensions = (state: State) => state.extensions
export const home = (state: State) => state.home
export const host = (state: State) => state.host
export const modeSelector = (state: State) => state.mode
export const nodeEnvSelector = (state: State) => state.nodeEnv
export const port = (state: State) => state.port
export const publicPath = (state: State) => state.outputPublicPath
export const sourceMap = () => true
export const staticAssets = (state: State) => state.staticAssets
export const template = (state: State) => state.indexTemplate
export const typescript = (state: State) => state.typescript
export const uglifyOptions = (state: State): MinifyOptions =>
  state.uglifyOptions
export const entries = (state: State) => state.entries
export const assetsDirectory = (state: State) => state.assetsDirectory

// Booleans Conditions

export const condWatch = (state: State) => state.watch
export const condInteractive = (state: State) => state.interactive

export const condProduction = createSelector(
  nodeEnvSelector,
  nodeEnv => nodeEnv === 'production'
)

export const condDevelopment = createSelector(
  nodeEnvSelector,
  nodeEnv => nodeEnv !== 'production'
)

export const condStart = createSelector(modeSelector, mode => mode === 'start')

export const condBuild = createSelector(
  modeSelector,
  condProduction,
  (mode, env) => env && mode === 'build'
)

export const condHMR = createSelector(
  condWatch,
  condDevelopment,
  (w, d) => w && d
)

// Derivate Selectors

export const outputPath = createSelector(context, _path, path.resolve)

// test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
export const loaderTest = createSelector(extensions, ext =>
  mapValues(
    ext,
    extension => new RegExp(`\\.(${join(extension, '|')})(\\?.*)?$`, 'i')
  )
)

export const compressionTest = createSelector(
  extensions,
  ext =>
    new RegExp(
      `\\.(${join(flatten(values(ext)).concat(['js', 'css']), '|')})(\\?.*)?$`,
      'i'
    )
)

export const externalsWhitelist = createSelector(extensions, ext => [
  new RegExp(
    `\\.(${join(
      flatten(values(ext)).concat(['ts', 'css', 'sass', 'scss', 'vue']),
      '|'
    )})$`,
    'i'
  ),
  '@babel/polyfill'
])

export const statsOption = createSelector(context, ctx => ({
  modulesSort: 'size',
  chunksSort: 'size',
  assetsSort: 'size',
  context: ctx
}))

export const SSRServerPath = createSelector(
  outputPath,
  SSRServerFilename,
  (op, f) => path.join(op, f)
)

export const SSRClientPath = createSelector(
  outputPath,
  SSRClientFilename,
  (op, f) => path.join(op, f)
)
