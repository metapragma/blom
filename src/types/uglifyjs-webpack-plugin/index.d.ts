/* tslint:disable no-any */

import { Condition, Plugin } from 'webpack'

declare class UglifyJsPlugin extends Plugin {
  constructor(options?: UglifyJsPlugin.Options)
}

export = UglifyJsPlugin

declare namespace UglifyJsPlugin {
  export interface MinifyOptions {
    parse?: Object
    compress?: Object
    mangle?: Object
    output?: Object
    sourceMap?: Object
    ecma?: number // specify one of?: 5, 6, 7 or 8
    ie8?: boolean
    keep_classnames?: boolean
    keep_fnames?: boolean
    nameCache?: any // or specify a name cache object
    safari10?: boolean
    toplevel?: boolean
    warnings?: boolean
  }

  export interface Options {
    /** Parallelization can speedup your build significantly and is therefore highly recommended. */
    test?: Condition | Condition[]
    include?: Condition | Condition[]
    exclude?: Condition | Condition[]
    cache?: boolean | string
    parallel?: boolean | string
    sourceMap?: boolean
    uglifyOptions?: MinifyOptions
    extractComments?: any
    warningsFilter?: any
  }
}
