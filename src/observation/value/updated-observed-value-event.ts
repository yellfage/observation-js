import type { ObservedValueEvent } from './observed-value-event'

export interface UpdatedObservedValueEvent<
  T extends boolean | number | string | null | undefined,
> extends ObservedValueEvent<T> {
  readonly previousValue: T
  readonly nextValue: T
}
