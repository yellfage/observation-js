import type { ObservedArrayEvent } from './observed-array-event'

export interface InsertedObservedArrayEvent<T> extends ObservedArrayEvent<T> {
  readonly index: number
  readonly item: T
}
