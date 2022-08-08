import type { ObservedSet } from './observed-set'

export interface ObservedSetEvent<T> {
  readonly target: ObservedSet<T>
}
