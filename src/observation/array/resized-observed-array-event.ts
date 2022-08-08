import type { ObservedArrayEvent } from './observed-array-event'

export interface ResizedObservedArrayEvent<T> extends ObservedArrayEvent<T> {
  readonly length: number
}
