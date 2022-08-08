import type { ObservedSetEvent } from './observed-set-event'

export interface DeletedObservedSetEvent<T> extends ObservedSetEvent<T> {
  readonly value: T
}
