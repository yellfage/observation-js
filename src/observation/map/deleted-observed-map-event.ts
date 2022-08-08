import type { ObservedMapEvent } from './observed-map-event'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface DeletedObservedMapEvent<K, V> extends ObservedMapEvent<K, V> {
  readonly key: K
}
