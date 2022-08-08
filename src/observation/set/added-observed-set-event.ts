import type { ObservedSetEvent } from './observed-set-event'

export interface AddedObservedSetEvent<T> extends ObservedSetEvent<T> {
  readonly value: T
}
