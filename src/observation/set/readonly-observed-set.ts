import type { EventPool } from '@yellfage/events'

import type { AddedObservedSetEvent } from './added-observed-set-event'

import type { ClearedObservedSetEvent } from './cleared-observed-set-event'

import type { DeletedObservedSetEvent } from './deleted-observed-set-event'

export interface ReadonlyObservedSet<T> extends ReadonlySet<T> {
  readonly added: EventPool<[AddedObservedSetEvent<T>]>
  readonly cleared: EventPool<[ClearedObservedSetEvent<T>]>
  readonly deleted: EventPool<[DeletedObservedSetEvent<T>]>
}
