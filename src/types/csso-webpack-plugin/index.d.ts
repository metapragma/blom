/* tslint:disable no-any */
import webpack = require('webpack')

declare module 'csso-webpack-plugin' {
  type PluginOptions = any
  type PluginFilterFn = (file: string) => boolean
  type PluginFilter = PluginFilterFn | RegExp

  export default class CssoWebpackPlugin extends webpack.Plugin {
    private options: PluginOptions
    private filter: PluginFilterFn

    public constructor(options?: PluginOptions, filter?: PluginFilter)
  }
}
