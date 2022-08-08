import type { EventPool } from '@yellfage/events'

import type { ClearedObservedMapEvent } from './cleared-observed-map-event'

import type { DeletedObservedMapEvent } from './deleted-observed-map-event'

import type { SettedObservedMapEvent } from './setted-observed-map-event'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ReadonlyObservedMap<K, V> extends ReadonlyMap<K, V> {
  readonly cleared: EventPool<[ClearedObservedMapEvent<K, V>]>
  readonly deleted: EventPool<[DeletedObservedMapEvent<K, V>]>
  readonly setted: EventPool<[SettedObservedMapEvent<K, V>]>
}
