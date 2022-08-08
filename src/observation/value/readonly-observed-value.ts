import type { EventPool } from '@yellfage/events'

import type { UpdatedObservedValueEvent } from './updated-observed-value-event'

export interface ReadonlyObservedValue<
  T extends boolean | number | string | null | undefined,
> {
  readonly target: T
  readonly updated: EventPool<[UpdatedObservedValueEvent<T>]>

  valueOf(): T
}
