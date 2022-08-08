import type { EventPool } from '@yellfage/events'

import type { InsertedObservedArrayEvent } from './inserted-observed-array-event'

import type { ResizedObservedArrayEvent } from './resized-observed-array-event'

export interface ReadonlyObservedArray<T> extends ReadonlyArray<T> {
  readonly inserted: EventPool<[InsertedObservedArrayEvent<T>]>
  readonly resized: EventPool<[ResizedObservedArrayEvent<T>]>
}
