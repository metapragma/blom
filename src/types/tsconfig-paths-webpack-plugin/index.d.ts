import webpack = require('webpack')

declare namespace TsconfigPathsWebpackPlugin {
  interface PluginOptions {
    configFile: string
    extensions: string[]
    baseUrl: string
    silent: boolean
    logLevel: 'info' | 'warn' | 'error'
    logInfoToStdOut: boolean
  }
}

declare class TsconfigPathsWebpackPlugin extends webpack.ResolvePlugin {
  constructor(options: Partial<TsconfigPathsWebpackPlugin.PluginOptions>)
}

export = TsconfigPathsWebpackPlugin
