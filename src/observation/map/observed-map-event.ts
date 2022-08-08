import type { ObservedMap } from './observed-map'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ObservedMapEvent<K, V> {
  readonly target: ObservedMap<K, V>
}
