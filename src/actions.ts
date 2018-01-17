import { assign } from 'lodash'

import { ActionCreator, BlomEnvironment, BlomOptions } from './types'

const actionCreatorFactory = <P>(type: string): ActionCreator<P> =>
  assign(
    (payload: P) => ({
      type,
      payload
    }),
    { type }
  )

export const setOptions = actionCreatorFactory<
  Partial<BlomOptions & BlomEnvironment>
>('SET_OPTIONS')
