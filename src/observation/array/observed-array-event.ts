import type { ObservedArray } from './observed-array'

export interface ObservedArrayEvent<T> {
  readonly target: ObservedArray<T>
}
