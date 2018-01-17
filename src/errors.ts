import { LogMessages } from './types'

import { Stats } from 'webpack'

export class BlomValidationError extends Error {
  public messages: LogMessages

  constructor(message: string, messages: LogMessages) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.messages = messages
  }
}

export class BlomCompilationError extends Error {
  public stats: Stats

  constructor(message: string, stats: Stats) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.stats = stats
  }
}
